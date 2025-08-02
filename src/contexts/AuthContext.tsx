import React, { useEffect, useState, useCallback, useRef } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, UserProfile } from '../lib/supabase'
import { AuthContext } from '../lib/auth-context'
import { toast } from 'sonner'
import { memoryManager, requestManager } from '../lib/memoryManager'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())
  const authErrorCountRef = useRef<number>(0)
  const lastAuthErrorRef = useRef<number>(0)

  const signOut = async () => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current)
    }
    
    // Reset error counters
    authErrorCountRef.current = 0
    lastAuthErrorRef.current = 0
    
    // Clear all local state
    setUser(null)
    setUserProfile(null)
    setSession(null)
    
    // Cancel all pending requests
    requestManager.cancelAll()
    
    // Clear memory cache
    memoryManager.clear()
    
    // Only clear auth-related data, not all cached data
    try {
      localStorage.removeItem('supabase.auth.token')
      sessionStorage.removeItem('supabase.auth.token')
    } catch (error) {
      // Ignore storage errors
    }
    
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error during signOut:', error)
      // Even if signOut fails, we've cleared local state
    }
  }

  const fetchUserProfile = useCallback(async (userId: string) => {
    const cacheKey = `user-profile-${userId}`
    
    // Check cache first
    const cachedProfile = memoryManager.get(cacheKey)
    if (cachedProfile) {
      setUserProfile(cachedProfile)
      return
    }
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error)
        
        // If it's an auth error, increment error count
        if (error.message?.includes('JWT') || error.message?.includes('expired') || error.message?.includes('invalid')) {
          authErrorCountRef.current += 1
          lastAuthErrorRef.current = Date.now()
          
          // If we have multiple auth errors in a short time, force logout
          if (authErrorCountRef.current >= 3) {
            console.log('Multiple auth errors detected, forcing logout')
            toast.error('Authentication error. Please sign in again.')
            await signOut()
            return
          }
        }
        return
      }

      // Reset error count on successful request
      authErrorCountRef.current = 0
      
      // Cache the profile
      if (data) {
        memoryManager.set(cacheKey, data, 10 * 60 * 1000) // Cache for 10 minutes
      }
      
      setUserProfile(data)
    } catch (error) {
      // Ignore aborted requests
      if (error instanceof Error && error.name === 'AbortError') {
        return
      }
      
      console.error('Error fetching user profile:', error)
      
      // Handle network errors vs auth errors
      if (error instanceof Error) {
        if (error.message?.includes('JWT') || error.message?.includes('expired') || error.message?.includes('invalid')) {
          authErrorCountRef.current += 1
          lastAuthErrorRef.current = Date.now()
          
          if (authErrorCountRef.current >= 3) {
            console.log('Multiple auth errors detected, forcing logout')
            toast.error('Authentication error. Please sign in again.')
            await signOut()
          }
        }
      }
    }
  }, [])

  // Session timeout management
  const resetSessionTimeout = useCallback(() => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current)
    }
    
    lastActivityRef.current = Date.now()
    
    // Set timeout for 30 minutes of inactivity
    sessionTimeoutRef.current = setTimeout(() => {
      console.log('Session timeout due to inactivity')
      toast.info('You have been logged out due to inactivity.')
      signOut()
    }, 30 * 60 * 1000) // 30 minutes
  }, [])

  // Track user activity - debounced to prevent excessive calls
  const handleUserActivity = useCallback(() => {
    const now = Date.now()
    const timeSinceLastActivity = now - lastActivityRef.current
    
    // Only reset timeout if more than 5 minutes has passed since last activity
    if (timeSinceLastActivity > 5 * 60 * 1000) {
      resetSessionTimeout()
    }
  }, [resetSessionTimeout])

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting initial session:', error)
        setIsLoading(false)
        return
      }
      
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
        resetSessionTimeout()
      }
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id)
        
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUserProfile(session.user.id)
          resetSessionTimeout()
          // Reset error count on successful auth
          authErrorCountRef.current = 0
        } else {
          setUserProfile(null)
          if (sessionTimeoutRef.current) {
            clearTimeout(sessionTimeoutRef.current)
          }
        }
        
        setIsLoading(false)
      }
    )

    // Add activity listeners - only essential events to reduce overhead
    const events = ['click', 'keypress', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true })
    })

    return () => {
      subscription.unsubscribe()
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current)
      }
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity)
      })
    }
  }, [fetchUserProfile, resetSessionTimeout, handleUserActivity])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) return { error }

      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            full_name: fullName
          })

        if (profileError) {
          console.error('Error creating user profile:', profileError)
        }
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const value = {
    user,
    userProfile,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}