import { useEffect, useRef, useCallback } from 'react'
import { useAuth } from './useAuth'
import { toast } from 'sonner'

interface PerformanceMetrics {
  lastFrameTime: number
  frameCount: number
  freezeCount: number
  bufferCount: number
  lastActivityTime: number
}

const FREEZE_THRESHOLD = 5000 // 5 seconds
const BUFFER_THRESHOLD = 10000 // 10 seconds
const MAX_FREEZE_COUNT = 3
const MAX_BUFFER_COUNT = 2

export const usePerformanceMonitor = () => {
  const { logout } = useAuth()
  const metricsRef = useRef<PerformanceMetrics>({
    lastFrameTime: performance.now(),
    frameCount: 0,
    freezeCount: 0,
    bufferCount: 0,
    lastActivityTime: Date.now()
  })
  
  const animationFrameRef = useRef<number>()

  const handleLogout = useCallback(async (reason: string) => {
    console.warn(`Performance issue detected: ${reason}. Logging out user.`)
    
    try {
      // Clear animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Log to backend session monitor
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/session-monitor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            user_id: 'current_user', // Will be replaced with actual user ID
            session_id: `session_${Date.now()}`,
            performance_issues: {
              freeze_count: metricsRef.current.freezeCount,
              buffer_count: metricsRef.current.bufferCount,
              last_activity: new Date(metricsRef.current.lastActivityTime).toISOString()
            },
            reason: reason.includes('freeze') ? 'freeze' : 
                   reason.includes('buffer') ? 'buffer' : 
                   reason.includes('memory') ? 'memory' : 'timeout'
          })
        })
        
        if (response.ok) {
          console.log('Session issue logged to backend')
        }
      } catch (backendError) {
        console.error('Failed to log to backend:', backendError)
      }

      // Show user-friendly message
      toast.error(`Session ended due to ${reason}. Please sign in again.`, {
        duration: 5000
      })

      // Force logout
      await logout()
      
      // Force page reload to clear any stuck state
      setTimeout(() => {
        window.location.reload()
      }, 1000)
      
    } catch (error) {
      console.error('Error during performance-triggered logout:', error)
      // Force reload as fallback
      window.location.reload()
    }
  }, [logout])

  const checkPerformance = useCallback(() => {
    const now = performance.now()
    const metrics = metricsRef.current
    const timeDiff = now - metrics.lastFrameTime

    // Check for freeze (frame took too long)
    if (timeDiff > FREEZE_THRESHOLD) {
      metrics.freezeCount++
      console.warn(`Freeze detected: ${timeDiff}ms (count: ${metrics.freezeCount})`)
      
      if (metrics.freezeCount >= MAX_FREEZE_COUNT) {
        handleLogout('performance issues (freezing)')
        return
      }
    }

    // Check for buffer/hang (no frames for extended period)
    if (timeDiff > BUFFER_THRESHOLD) {
      metrics.bufferCount++
      console.warn(`Buffer/hang detected: ${timeDiff}ms (count: ${metrics.bufferCount})`)
      
      if (metrics.bufferCount >= MAX_BUFFER_COUNT) {
        handleLogout('connection issues (buffering)')
        return
      }
    }

    // Update metrics
    metrics.lastFrameTime = now
    metrics.frameCount++

    // Reset counters periodically if performance improves
    if (metrics.frameCount % 60 === 0) { // Every ~1 second at 60fps
      if (timeDiff < 100) { // Good performance
        metrics.freezeCount = Math.max(0, metrics.freezeCount - 1)
        metrics.bufferCount = Math.max(0, metrics.bufferCount - 1)
      }
    }

    // Continue monitoring
    animationFrameRef.current = requestAnimationFrame(checkPerformance)
  }, [handleLogout])

  const updateActivity = useCallback(() => {
    metricsRef.current.lastActivityTime = Date.now()
  }, [])

  // Monitor user activity
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity)
      })
    }
  }, [updateActivity])

  // Start performance monitoring
  useEffect(() => {
    // Initial activity update
    updateActivity()
    
    // Start frame monitoring
    animationFrameRef.current = requestAnimationFrame(checkPerformance)

    // Monitor for unresponsive script errors
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('script') || event.message?.includes('unresponsive')) {
        console.error('Script error detected:', event.message)
        handleLogout('script errors')
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      // Don't logout for all promise rejections, but log them
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Monitor for memory issues
    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn('High memory usage detected')
          handleLogout('memory issues')
        }
      }
    }

    const memoryInterval = setInterval(checkMemory, 30000) // Check every 30 seconds

    return () => {
      // Cleanup - capture refs to avoid stale closure warnings
      const animationFrame = animationFrameRef.current
      
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      
      clearInterval(memoryInterval)
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [checkPerformance, updateActivity, handleLogout])

  return {
    metrics: metricsRef.current,
    forceLogout: () => handleLogout('manual trigger')
  }
}