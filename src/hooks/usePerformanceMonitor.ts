import { useCallback, useRef, useEffect } from 'react'

// Simplified performance monitoring without heavy operations
export const useSlowOperationDetector = () => {
  const detectSlowOperation = useCallback((operation: () => Promise<any>, name: string, threshold = 2000) => {
    return async (...args: any[]) => {
      const start = performance.now()
      try {
        const result = await operation(...args)
        const duration = performance.now() - start
        
        if (duration > threshold) {
          console.warn(`Slow operation: ${name} took ${duration.toFixed(2)}ms`)
        }
        
        return result
      } catch (error) {
        const duration = performance.now() - start
        console.error(`Operation failed: ${name} took ${duration.toFixed(2)}ms`, error)
        throw error
      }
    }
  }, [])

  return { detectSlowOperation }
}

// Simple debounce hook with proper ref handling
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>()

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay]) as T

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}