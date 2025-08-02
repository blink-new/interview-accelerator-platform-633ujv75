/**
 * Memory Management Utilities
 * Handles cache cleanup, memory optimization, and prevents memory leaks
 */

interface CacheEntry {
  data: any
  timestamp: number
  ttl: number
}

class MemoryManager {
  private cache = new Map<string, CacheEntry>()
  private cleanupInterval: NodeJS.Timeout | null = null
  private maxCacheSize = 50 // Maximum number of cache entries
  private defaultTTL = 5 * 60 * 1000 // 5 minutes default TTL

  constructor() {
    this.startCleanupInterval()
    this.setupVisibilityHandlers()
  }

  // Set cache with TTL
  set(key: string, data: any, ttl: number = this.defaultTTL): void {
    // If cache is full, remove oldest entries
    if (this.cache.size >= this.maxCacheSize) {
      this.evictOldest()
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  // Get cache entry if not expired
  get(key: string): any | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  // Remove specific cache entry
  delete(key: string): void {
    this.cache.delete(key)
  }

  // Clear all cache
  clear(): void {
    this.cache.clear()
  }

  // Clear expired entries
  clearExpired(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
      }
    }
  }

  // Evict oldest entries when cache is full
  private evictOldest(): void {
    let oldestKey: string | null = null
    let oldestTime = Date.now()

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp
        oldestKey = key
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey)
    }
  }

  // Start periodic cleanup
  private startCleanupInterval(): void {
    this.cleanupInterval = setInterval(() => {
      this.clearExpired()
    }, 2 * 60 * 1000) // Clean every 2 minutes
  }

  // Setup visibility change handlers for aggressive cleanup
  private setupVisibilityHandlers(): void {
    let hiddenTime: number | null = null

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hiddenTime = Date.now()
      } else if (hiddenTime) {
        const hiddenDuration = Date.now() - hiddenTime
        
        // If page was hidden for more than 2 minutes, clear cache
        if (hiddenDuration > 2 * 60 * 1000) {
          this.clearExpired()
        }
        
        // If page was hidden for more than 10 minutes, clear all cache
        if (hiddenDuration > 10 * 60 * 1000) {
          this.clear()
        }
        
        hiddenTime = null
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
  }

  // Cleanup on destroy
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.clear()
  }

  // Get cache stats for debugging
  getStats(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    }
  }
}

// Global memory manager instance
export const memoryManager = new MemoryManager()

// Memory-aware fetch wrapper
export const memoryAwareFetch = async <T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 5 * 60 * 1000
): Promise<T> => {
  // Check cache first
  const cached = memoryManager.get(key)
  if (cached) {
    return cached
  }

  // Fetch and cache
  const data = await fetchFn()
  memoryManager.set(key, data, ttl)
  return data
}

// Debounced function creator with memory cleanup
export const createMemoryAwareDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastArgs: Parameters<T> | null = null

  const debouncedFn = ((...args: Parameters<T>) => {
    lastArgs = args

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      if (lastArgs) {
        fn(...lastArgs)
        lastArgs = null
      }
      timeoutId = null
    }, delay)
  }) as T

  // Cleanup function
  ;(debouncedFn as any).cleanup = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    lastArgs = null
  }

  return debouncedFn
}

// Request cancellation manager
export class RequestManager {
  private controllers = new Map<string, AbortController>()

  // Create or get abort controller for a request
  getController(key: string): AbortController {
    // Cancel existing request if any
    this.cancel(key)
    
    const controller = new AbortController()
    this.controllers.set(key, controller)
    return controller
  }

  // Cancel specific request
  cancel(key: string): void {
    const controller = this.controllers.get(key)
    if (controller) {
      controller.abort()
      this.controllers.delete(key)
    }
  }

  // Cancel all requests
  cancelAll(): void {
    for (const [key, controller] of this.controllers.entries()) {
      controller.abort()
    }
    this.controllers.clear()
  }

  // Cleanup completed request
  cleanup(key: string): void {
    this.controllers.delete(key)
  }
}

// Global request manager
export const requestManager = new RequestManager()

// Memory-aware component cleanup hook
export const useMemoryCleanup = () => {
  const cleanup = () => {
    // Clear any component-specific cache
    memoryManager.clearExpired()
    
    // Cancel any pending requests
    requestManager.cancelAll()
  }

  return cleanup
}

// Performance monitoring with memory awareness
export const performanceMonitor = {
  measureMemory: (): number => {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize
    }
    return 0
  },

  logMemoryUsage: (label: string): void => {
    const memory = performanceMonitor.measureMemory()
    if (memory > 0) {
      console.log(`Memory usage (${label}): ${(memory / 1024 / 1024).toFixed(2)} MB`)
    }
  },

  checkMemoryPressure: (): boolean => {
    const memory = performanceMonitor.measureMemory()
    const limit = 100 * 1024 * 1024 // 100MB threshold
    return memory > limit
  }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  memoryManager.destroy()
  requestManager.cancelAll()
})