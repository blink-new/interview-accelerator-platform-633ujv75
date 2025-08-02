import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from './useAuth'
import { useCircuitBreaker } from './useEmergencySystem'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

interface ProgressData {
  completedWeeks: number[]
  overallProgress: number
  isLoading: boolean
}

export const useProgress = () => {
  const { user } = useAuth()
  const { wrapApiCall } = useCircuitBreaker()
  const [progressData, setProgressData] = useState<ProgressData>({
    completedWeeks: [],
    overallProgress: 0,
    isLoading: true
  })
  
  // Use ref to prevent infinite loops and track state
  const loadingRef = useRef(false)
  const subscriptionRef = useRef<any>(null)
  const userIdRef = useRef<string | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Create circuit breaker protected database call
  const protectedLoadProgress = useCallback(async (userId: string) => {
    const dbCall = async () => {
      const { data: completions, error } = await supabase
        .from('week_completions')
        .select('week_number')
        .eq('user_id', userId)
        .eq('completed', true)

      if (error) throw error
      return completions || []
    }

    if (wrapApiCall) {
      const wrappedCall = wrapApiCall(dbCall, { 
        name: 'loadProgress', 
        threshold: 3, 
        timeout: 30000 
      })
      return wrappedCall()
    }
    
    return dbCall()
  }, [wrapApiCall])

  const loadProgress = useCallback(async () => {
    const currentUserId = user?.id
    if (!currentUserId || loadingRef.current) {
      if (!currentUserId) {
        setProgressData({
          completedWeeks: [],
          overallProgress: 0,
          isLoading: false
        })
      }
      return
    }

    loadingRef.current = true

    try {
      const completions = await protectedLoadProgress(currentUserId)
      const completed = completions.map(c => c.week_number)
      const progress = (completed.length / 8) * 100

      setProgressData({
        completedWeeks: completed,
        overallProgress: progress,
        isLoading: false
      })
    } catch (error) {
      console.error('Error loading progress:', error)
      setProgressData({
        completedWeeks: [],
        overallProgress: 0,
        isLoading: false
      })
    } finally {
      loadingRef.current = false
    }
  }, [user, protectedLoadProgress])

  const markWeekComplete = useCallback(async (weekNumber: number) => {
    const currentUserId = user?.id
    if (!currentUserId) return false

    try {
      const { error } = await supabase
        .from('week_completions')
        .upsert({
          user_id: currentUserId,
          week_number: weekNumber,
          completed: true,
          completed_at: new Date().toISOString()
        })

      if (error) throw error

      // Reload progress after marking complete
      await loadProgress()
      toast.success(`Week ${weekNumber} marked as complete!`)
      return true
    } catch (error) {
      console.error('Error marking week complete:', error)
      toast.error('Failed to update progress')
      return false
    }
  }, [user, loadProgress])

  // Set up real-time subscription for progress changes
  useEffect(() => {
    const currentUserId = user?.id
    
    // Clean up existing subscription if user changed
    if (subscriptionRef.current && userIdRef.current !== currentUserId) {
      subscriptionRef.current.unsubscribe()
      subscriptionRef.current = null
    }

    if (!currentUserId) {
      userIdRef.current = null
      return
    }

    // Only create new subscription if we don't have one for this user
    if (!subscriptionRef.current) {
      userIdRef.current = currentUserId
      
      subscriptionRef.current = supabase
        .channel(`week_completions_${currentUserId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'week_completions',
            filter: `user_id=eq.${currentUserId}`
          },
          () => {
            // Clear existing debounce timeout
            if (debounceTimeoutRef.current) {
              clearTimeout(debounceTimeoutRef.current)
            }
            
            // Debounce the reload to prevent excessive calls
            debounceTimeoutRef.current = setTimeout(() => {
              if (!loadingRef.current && userIdRef.current === currentUserId) {
                loadProgress()
              }
            }, 1000) // Increased debounce time
          }
        )
        .subscribe()
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
        subscriptionRef.current = null
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
        debounceTimeoutRef.current = null
      }
      userIdRef.current = null
    }
  }, [user?.id, loadProgress])

  // Initial load - only when user changes
  useEffect(() => {
    if (user?.id !== userIdRef.current) {
      loadProgress()
    }
  }, [user?.id, loadProgress])

  return {
    ...progressData,
    markWeekComplete,
    refreshProgress: loadProgress
  }
}