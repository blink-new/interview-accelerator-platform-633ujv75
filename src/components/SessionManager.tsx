import React, { useEffect, useRef, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export const SessionManager: React.FC = () => {
  const { user, signOut } = useAuth()
  const sessionCheckIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastValidationRef = useRef<number>(Date.now())
  const isValidatingRef = useRef<boolean>(false)

  const validateSession = useCallback(async () => {
    if (!user || isValidatingRef.current) return

    try {
      isValidatingRef.current = true
      
      // Check if session is still valid by making a simple authenticated request
      const { data, error } = await supabase.auth.getSession()
      
      if (error || !data.session) {
        console.log('Session validation failed, logging out:', error?.message)
        toast.error('Your session has expired. Please sign in again.')
        await signOut()
        return
      }

      // Check if the session is about to expire (within 5 minutes)
      const expiresAt = data.session.expires_at
      if (expiresAt) {
        const expirationTime = expiresAt * 1000 // Convert to milliseconds
        const timeUntilExpiry = expirationTime - Date.now()
        const fiveMinutes = 5 * 60 * 1000

        if (timeUntilExpiry < fiveMinutes && timeUntilExpiry > 0) {
          // Try to refresh the session
          const { error: refreshError } = await supabase.auth.refreshSession()
          if (refreshError) {
            console.log('Session refresh failed, logging out:', refreshError.message)
            toast.error('Unable to refresh your session. Please sign in again.')
            await signOut()
            return
          }
        } else if (timeUntilExpiry <= 0) {
          // Session has already expired
          console.log('Session has expired, logging out')
          toast.error('Your session has expired. Please sign in again.')
          await signOut()
          return
        }
      }

      lastValidationRef.current = Date.now()
    } catch (error) {
      console.error('Session validation error:', error)
      // Don't logout on network errors, just log them
      if (error instanceof Error && error.message.includes('fetch')) {
        console.log('Network error during session validation, will retry')
        return
      }
      
      // For other errors, logout after multiple failures
      const timeSinceLastValidation = Date.now() - lastValidationRef.current
      if (timeSinceLastValidation > 10 * 60 * 1000) { // 10 minutes without successful validation
        console.log('Too long without successful session validation, logging out')
        toast.error('Session validation failed. Please sign in again.')
        await signOut()
      }
    } finally {
      isValidatingRef.current = false
    }
  }, [user, signOut])

  useEffect(() => {
    if (!user) {
      // Clear interval if user is not logged in
      if (sessionCheckIntervalRef.current) {
        clearInterval(sessionCheckIntervalRef.current)
        sessionCheckIntervalRef.current = null
      }
      return
    }

    // Validate session immediately
    validateSession()

    // Set up periodic session validation (every 2 minutes)
    sessionCheckIntervalRef.current = setInterval(() => {
      validateSession()
    }, 2 * 60 * 1000) // 2 minutes

    return () => {
      if (sessionCheckIntervalRef.current) {
        clearInterval(sessionCheckIntervalRef.current)
        sessionCheckIntervalRef.current = null
      }
    }
  }, [user, validateSession])

  // Handle page visibility changes - only validate if page was hidden for more than 5 minutes
  useEffect(() => {
    let pageHiddenTime: number | null = null
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pageHiddenTime = Date.now()
      } else if (pageHiddenTime && user) {
        const hiddenDuration = Date.now() - pageHiddenTime
        // Only validate session if page was hidden for more than 5 minutes
        if (hiddenDuration > 5 * 60 * 1000) {
          setTimeout(() => {
            validateSession()
          }, 2000) // Longer delay to ensure page is fully loaded
        }
        pageHiddenTime = null
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [user, validateSession])

  // Handle online/offline events
  useEffect(() => {
    const handleOnline = () => {
      if (user) {
        // When coming back online, validate session
        setTimeout(() => {
          validateSession()
        }, 2000) // Give some time for connection to stabilize
      }
    }

    window.addEventListener('online', handleOnline)
    return () => {
      window.removeEventListener('online', handleOnline)
    }
  }, [user, validateSession])

  return null // This component doesn't render anything
}