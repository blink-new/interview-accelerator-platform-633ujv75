import React, { useEffect, useState, useCallback } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, UserProfile } from '../lib/supabase'
import { AuthContext } from '../lib/auth-context'
import { toast } from 'sonner'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const signOut = async () => {
    // Clear all local state first
    setUser(null)
    setUserProfile(null)
    setSession(null)
    
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error during signOut:', error)
    }
  }

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error)
        return
      }

      setUserProfile(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }, [])

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting initial session:', error)
          if (mounted) setIsLoading(false)
          return
        }
        
        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          
          if (session?.user) {
            await fetchUserProfile(session.user.id)
          }
          
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error)
        if (mounted) setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        console.log('Auth state change:', event, session?.user?.id)
        
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setUserProfile(null)
        }
        
        setIsLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchUserProfile])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setIsLoading(true)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) {
        setIsLoading(false)
        return { error }
      }

      // Create user profile immediately after signup
      if (data.user) {
        try {
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
              id: data.user.id,
              full_name: fullName,
              email: email,
              role: 'user'
            })

          if (profileError) {
            console.error('Error creating user profile:', profileError)
            // Don't fail the signup if profile creation fails
          }
        } catch (profileError) {
          console.error('Error creating user profile:', profileError)
        }
      }

      setIsLoading(false)
      return { error: null }
    } catch (error) {
      setIsLoading(false)
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setIsLoading(false)
        return { error }
      }

      // Don't set loading to false here - let the auth state change handle it
      return { error: null }
    } catch (error) {
      setIsLoading(false)
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