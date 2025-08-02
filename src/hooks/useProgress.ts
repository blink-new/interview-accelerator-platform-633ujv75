import { useState, useEffect, useCallback } from 'react'
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

  const loadProgress = useCallback(async () => {
    if (!user) {
      setProgressData({
        completedWeeks: [],
        overallProgress: 0,
        isLoading: false
      })
      return
    }

    try {
      const { data: completions, error } = await supabase
        .from('week_completions')
        .select('week_number')
        .eq('user_id', user.id)
        .eq('completed', true)

      if (error) {
        console.error('Error loading progress:', error)
        return
      }

      const completed = completions ? completions.map(c => c.week_number) : []
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
    }
  }, [user])

  const markWeekComplete = useCallback(async (weekNumber: number) => {
    if (!user) return false

    try {
      const { error } = await supabase
        .from('week_completions')
        .upsert({
          user_id: user.id,
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
    if (!user) return

    const subscription = supabase
      .channel('week_completions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'week_completions',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          // Reload progress when changes occur
          loadProgress()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user, loadProgress])

  // Initial load
  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  return {
    ...progressData,
    markWeekComplete,
    refreshProgress: loadProgress
  }
}