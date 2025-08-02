// Emergency System for Freeze Detection and Recovery
export class EmergencySystem {
  private static instance: EmergencySystem
  private heartbeatInterval: NodeJS.Timeout | null = null
  private freezeCheckInterval: NodeJS.Timeout | null = null
  private memoryCheckInterval: NodeJS.Timeout | null = null
  private inactivityTimer: NodeJS.Timeout | null = null
  private lastHeartbeat: number = Date.now()
  private errorCount: number = 0
  private isInitialized: boolean = false

  private readonly FREEZE_THRESHOLD = 8000 // 8 seconds
  private readonly MEMORY_CHECK_INTERVAL = 30000 // 30 seconds
  private readonly INACTIVITY_TIMEOUT = 30 * 60 * 1000 // 30 minutes
  private readonly MAX_ERRORS = 3

  static getInstance(): EmergencySystem {
    if (!EmergencySystem.instance) {
      EmergencySystem.instance = new EmergencySystem()
    }
    return EmergencySystem.instance
  }

  initialize(): void {
    if (this.isInitialized) return
    
    console.log('🚨 Emergency System: Initializing freeze detection and recovery')
    
    this.setupFreezeDetection()
    this.setupMemoryMonitoring()
    this.setupInactivityTimer()
    this.setupBeforeUnloadHandler()
    this.checkForPreviousEmergency()
    
    this.isInitialized = true
  }

  private setupFreezeDetection(): void {
    // Update heartbeat every second
    this.heartbeatInterval = setInterval(() => {
      this.lastHeartbeat = Date.now()
    }, 1000)

    // Check for freeze every 5 seconds
    this.freezeCheckInterval = setInterval(() => {
      const timeSinceHeartbeat = Date.now() - this.lastHeartbeat
      
      if (timeSinceHeartbeat > this.FREEZE_THRESHOLD) {
        console.error('🚨 FREEZE DETECTED - Initiating emergency restart')
        this.handleFreeze()
      }
    }, 5000)
  }

  private setupMemoryMonitoring(): void {
    this.memoryCheckInterval = setInterval(() => {
      this.checkMemoryUsage()
    }, this.MEMORY_CHECK_INTERVAL)
  }

  private checkMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      const used = memory.usedJSHeapSize / 1048576 // MB
      const limit = memory.jsHeapSizeLimit / 1048576 // MB
      const percentage = (used / limit) * 100

      console.log(`📊 Memory usage: ${used.toFixed(2)}MB / ${limit.toFixed(2)}MB (${percentage.toFixed(1)}%)`)

      if (percentage > 90) {
        console.warn('⚠️ HIGH MEMORY USAGE - Forcing cleanup')
        this.handleHighMemoryUsage()
      }
    }
  }

  private setupInactivityTimer(): void {
    const resetTimer = () => {
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer)
      }
      
      this.inactivityTimer = setTimeout(() => {
        console.log('⏰ User inactive for 30 minutes - Auto logout')
        this.handleInactivity()
      }, this.INACTIVITY_TIMEOUT)
    }

    // Reset timer on user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    events.forEach(event => {
      document.addEventListener(event, resetTimer, { passive: true })
    })

    resetTimer()
  }

  private setupBeforeUnloadHandler(): void {
    window.addEventListener('beforeunload', () => {
      if (performance.now() > 30000) { // If page has been active for 30+ seconds
        localStorage.setItem('emergency_reload', Date.now().toString())
      }
    })
  }

  private checkForPreviousEmergency(): void {
    const emergencyReload = localStorage.getItem('emergency_reload')
    const freezeDetected = localStorage.getItem('freeze_detected')
    const autoLogout = localStorage.getItem('auto_logout')
    const emergencyErrors = localStorage.getItem('emergency_errors')

    if (emergencyReload) {
      const lastReload = parseInt(emergencyReload)
      if (Date.now() - lastReload < 60000) { // Less than 1 minute ago
        console.log('🔄 Previous emergency reload detected')
        localStorage.removeItem('emergency_reload')
        this.redirectToLogin('emergency_restart')
        return
      }
      localStorage.removeItem('emergency_reload')
    }

    if (freezeDetected) {
      console.log('🧊 Previous freeze detected')
      localStorage.removeItem('freeze_detected')
    }

    if (autoLogout) {
      console.log('⏰ Previous auto logout:', autoLogout)
      localStorage.removeItem('auto_logout')
    }

    if (emergencyErrors) {
      console.log('❌ Previous emergency errors detected')
      localStorage.removeItem('emergency_errors')
    }
  }

  private handleFreeze(): void {
    localStorage.setItem('freeze_detected', 'true')
    this.redirectToLogin('freeze_recovery')
  }

  private handleHighMemoryUsage(): void {
    // Force garbage collection if available
    if ('gc' in window) {
      (window as any).gc()
    }

    // Clear any cached data
    this.clearCaches()

    setTimeout(() => {
      this.redirectToLogin('memory_cleanup')
    }, 2000)
  }

  private handleInactivity(): void {
    localStorage.setItem('auto_logout', 'inactivity')
    this.redirectToLogin('inactivity')
  }

  private clearCaches(): void {
    try {
      // Clear session storage
      sessionStorage.clear()
      
      // Clear specific localStorage items but keep auth
      const keysToKeep = ['supabase.auth.token', 'auth-storage-key']
      const allKeys = Object.keys(localStorage)
      
      allKeys.forEach(key => {
        if (!keysToKeep.some(keepKey => key.includes(keepKey))) {
          localStorage.removeItem(key)
        }
      })
      
      console.log('🧹 Caches cleared')
    } catch (error) {
      console.error('Failed to clear caches:', error)
    }
  }

  private redirectToLogin(reason: string): void {
    const url = `/signin?reason=${reason}&timestamp=${Date.now()}`
    console.log(`🔄 Redirecting to login: ${reason}`)
    
    // Use replace to avoid back button issues
    window.location.replace(url)
  }

  recordError(error: Error): void {
    this.errorCount++
    console.error(`❌ Error recorded (${this.errorCount}/${this.MAX_ERRORS}):`, error)

    if (this.errorCount >= this.MAX_ERRORS) {
      localStorage.setItem('emergency_errors', 'true')
      this.redirectToLogin('multiple_errors')
    }
  }

  // Circuit breaker for API calls
  createCircuitBreaker<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    threshold: number = 5,
    timeout: number = 60000
  ): T {
    let failureCount = 0
    let state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED'
    let nextAttempt = Date.now()

    const circuitBreaker = async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      if (state === 'OPEN') {
        if (Date.now() < nextAttempt) {
          throw new Error('Circuit breaker is OPEN')
        }
        state = 'HALF_OPEN'
      }

      try {
        const result = await Promise.race([
          fn(...args),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), 10000)
          )
        ])

        // Success
        failureCount = 0
        state = 'CLOSED'
        return result
      } catch (error) {
        failureCount++
        
        if (failureCount >= threshold) {
          state = 'OPEN'
          nextAttempt = Date.now() + timeout
          console.error('🔌 Circuit breaker OPEN - Too many failures')
          
          setTimeout(() => {
            this.redirectToLogin('circuit_breaker')
          }, 2000)
        }
        
        throw error
      }
    }

    return circuitBreaker as T
  }

  // Emergency reset function
  emergencyReset(): void {
    console.log('🚨 EMERGENCY RESET INITIATED')
    
    // Clear all timers
    this.cleanup()
    
    // Clear all storage
    this.clearCaches()
    
    // Redirect to login
    this.redirectToLogin('emergency_reset')
  }

  cleanup(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
    
    if (this.freezeCheckInterval) {
      clearInterval(this.freezeCheckInterval)
      this.freezeCheckInterval = null
    }
    
    if (this.memoryCheckInterval) {
      clearInterval(this.memoryCheckInterval)
      this.memoryCheckInterval = null
    }
    
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer)
      this.inactivityTimer = null
    }
    
    this.isInitialized = false
  }
}

// Global emergency reset function
declare global {
  interface Window {
    emergencyReset: () => void
  }
}

// Make emergency reset available globally
window.emergencyReset = () => {
  EmergencySystem.getInstance().emergencyReset()
}

export default EmergencySystem