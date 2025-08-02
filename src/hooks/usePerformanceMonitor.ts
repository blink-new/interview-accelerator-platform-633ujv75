import { useCallback, useRef, useEffect } from 'react'

// Simple debounce hook with proper cleanup
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

// Simple throttle hook
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now())

  const throttledCallback = useCallback((...args: Parameters<T>) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args)
      lastRun.current = Date.now()
    }
  }, [callback, delay]) as T

  return throttledCallback
}

// Simple performance wrapper without aggressive monitoring
export const usePerformanceWrapper = () => {
  const wrapAsyncOperation = useCallback((operation: () => Promise<any>, name: string) => {
    return async (...args: any[]) => {
      try {
        const result = await operation(...args)
        return result
      } catch (error) {
        console.error(`Operation failed: ${name}`, error)
        throw error
      }
    }
  }, [])

  return { wrapAsyncOperation }
}