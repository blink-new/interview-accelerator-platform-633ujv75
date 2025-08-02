import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

interface SessionStatusProps {
  onRefresh?: () => void
}

export const SessionStatus: React.FC<SessionStatusProps> = ({ onRefresh }) => {
  const { user, isLoading } = useAuth()
  const [showRefreshPrompt, setShowRefreshPrompt] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())

  useEffect(() => {
    // Track user activity
    const updateActivity = () => setLastActivity(Date.now())
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true })
    })

    // Check for long inactivity
    const checkInactivity = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity
      const twentyMinutes = 20 * 60 * 1000
      
      if (timeSinceActivity > twentyMinutes && user && !isLoading) {
        setShowRefreshPrompt(true)
      }
    }, 60 * 1000) // Check every minute

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity)
      })
      clearInterval(checkInactivity)
    }
  }, [lastActivity, user, isLoading])

  const handleRefresh = () => {
    setShowRefreshPrompt(false)
    setLastActivity(Date.now())
    
    if (onRefresh) {
      onRefresh()
    } else {
      // Force page refresh as fallback
      window.location.reload()
    }
    
    toast.success('Page refreshed successfully!')
  }

  const handleDismiss = () => {
    setShowRefreshPrompt(false)
    setLastActivity(Date.now())
  }

  if (!showRefreshPrompt || !user) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Long Session Detected</span>
          </CardTitle>
          <CardDescription className="text-orange-700">
            You've been on this page for a while. Refreshing can help prevent any loading issues.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              onClick={handleRefresh}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleDismiss}
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}