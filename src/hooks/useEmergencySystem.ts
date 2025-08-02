import { useEffect, useRef } from 'react'
import EmergencySystem from '@/utils/emergencySystem'

export const useEmergencySystem = () => {
  const emergencySystemRef = useRef<EmergencySystem>()
  const isInitializedRef = useRef(false)

  useEffect(() => {
    if (!isInitializedRef.current) {
      emergencySystemRef.current = EmergencySystem.getInstance()
      emergencySystemRef.current.initialize()
      isInitializedRef.current = true

      console.log('🚨 Emergency System: Initialized in component')
    }

    // Cleanup on unmount
    return () => {
      if (emergencySystemRef.current && isInitializedRef.current) {
        emergencySystemRef.current.cleanup()
        isInitializedRef.current = false
        console.log('🚨 Emergency System: Cleaned up')
      }
    }
  }, [])

  return {
    emergencySystem: emergencySystemRef.current,
    createCircuitBreaker: emergencySystemRef.current?.createCircuitBreaker.bind(emergencySystemRef.current),
    emergencyReset: () => emergencySystemRef.current?.emergencyReset()
  }
}

// Hook for creating circuit breaker wrapped API calls
export const useCircuitBreaker = () => {
  const { createCircuitBreaker } = useEmergencySystem()

  const wrapApiCall = <T extends (...args: any[]) => Promise<any>>(
    apiCall: T,
    options?: {
      threshold?: number
      timeout?: number
      name?: string
    }
  ): T => {
    if (!createCircuitBreaker) {
      console.warn('Circuit breaker not available, returning original function')
      return apiCall
    }

    const wrappedCall = createCircuitBreaker(apiCall, options?.threshold, options?.timeout)
    
    // Add logging for debugging
    return ((...args: Parameters<T>) => {
      const start = performance.now()
      return wrappedCall(...args)
        .then((result) => {
          const duration = performance.now() - start
          if (options?.name && duration > 2000) {
            console.warn(`⚠️ Slow API call: ${options.name} took ${duration.toFixed(2)}ms`)
          }
          return result
        })
        .catch((error) => {
          const duration = performance.now() - start
          console.error(`❌ API call failed: ${options?.name || 'unknown'} (${duration.toFixed(2)}ms)`, error)
          throw error
        })
    }) as T
  }

  return { wrapApiCall }
}