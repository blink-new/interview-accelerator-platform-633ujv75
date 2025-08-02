import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from './useAuth'
import { getCompletedWeeks, markWeekComplete as markWeekCompleteDB } from '../lib/supabase'

export const useProgress = () => {
  const { user } = useAuth()
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const mountedRef = useRef(true)

  // Calculate overall progress
  const overallProgress = (completedWeeks.length / 8) * 100

  const fetchCompletedWeeks = useCallback(async () => {
    if (!user?.id || !mountedRef.current) return
    
    try {
      setIsLoading(true)
      const weeks = await getCompletedWeeks(user.id)
      
      if (mountedRef.current) {
        setCompletedWeeks(weeks)
      }
    } catch (error) {
      console.error('Error fetching completed weeks:', error)
    } finally {
      if (mountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [user?.id])

  const markWeekComplete = useCallback(async (weekNumber: number) => {
    if (!user?.id || !mountedRef.current) return
    
    try {
      await markWeekCompleteDB(weekNumber, user.id)
      
      if (mountedRef.current) {
        setCompletedWeeks(prev => {
          if (!prev.includes(weekNumber)) {
            return [...prev, weekNumber].sort((a, b) => a - b)
          }
          return prev
        })
      }
    } catch (error) {
      console.error('Error marking week complete:', error)
    }
  }, [user?.id])

  useEffect(() => {
    mountedRef.current = true
    
    if (user?.id) {
      fetchCompletedWeeks()
    } else {
      setCompletedWeeks([])
      setIsLoading(false)
    }

    return () => {
      mountedRef.current = false
    }
  }, [user?.id, fetchCompletedWeeks])

  return {
    completedWeeks,
    overallProgress,
    isLoading,
    markWeekComplete,
    refetch: fetchCompletedWeeks
  }
}