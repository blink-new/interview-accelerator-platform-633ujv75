import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from './useAuth'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

interface ProgressData {
  completedWeeks: number[]
  overallProgress: number
  isLoading: boolean
}

export const useProgress = () => {
  const { user } = useAuth()
  const [progressData, setProgressData] = useState<ProgressData>({
    completedWeeks: [],
    overallProgress: 0,
    isLoading: true
  })
  
  // Simple refs to prevent memory leaks
  const mountedRef = useRef(true)
  const loadingRef = useRef(false)

  // Simple database call without circuit breaker complexity
  const loadProgress = useCallback(async () => {
    const currentUserId = user?.id
    if (!currentUserId || loadingRef.current || !mountedRef.current) {
      if (!currentUserId && mountedRef.current) {
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
      const { data: completions, error } = await supabase
        .from('week_completions')
        .select('week_number')
        .eq('user_id', currentUserId)
        .eq('completed', true)

      if (error) throw error

      const completed = (completions || []).map(c => c.week_number).sort((a, b) => a - b)
      const progress = (completed.length / 8) * 100

      if (mountedRef.current) {
        setProgressData({
          completedWeeks: completed,
          overallProgress: progress,
          isLoading: false
        })
      }
    } catch (error) {
      console.error('Error loading progress:', error)
      
      if (mountedRef.current) {
        setProgressData({
          completedWeeks: [],
          overallProgress: 0,
          isLoading: false
        })
        toast.error('Failed to load progress data')
      }
    } finally {
      loadingRef.current = false
    }
  }, [user?.id])

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

  // Initial load when user changes
  useEffect(() => {
    if (user?.id && mountedRef.current) {
      loadProgress()
    }
  }, [user?.id, loadProgress])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  return {
    ...progressData,
    markWeekComplete,
    refreshProgress: loadProgress
  }
}