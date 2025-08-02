import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home, Zap } from 'lucide-react'
import EmergencySystem from '@/utils/emergencySystem'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorCount: number
  errorInfo?: ErrorInfo
}

class EmergencyErrorBoundary extends Component<Props, State> {
  private emergencySystem: EmergencySystem

  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      errorCount: 0
    }
    this.emergencySystem = EmergencySystem.getInstance()
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 Emergency Error Boundary caught error:', error, errorInfo)
    
    this.setState(prevState => ({
      errorCount: prevState.errorCount + 1,
      errorInfo
    }))

    // Record error in emergency system
    this.emergencySystem.recordError(error)

    // If too many errors, force emergency reset
    if (this.state.errorCount >= 2) {
      console.error('🚨 Too many errors - Initiating emergency reset')
      setTimeout(() => {
        this.emergencySystem.emergencyReset()
      }, 3000)
    }
  }

  private handleReload = () => {
    console.log('🔄 User initiated page reload')
    window.location.reload()
  }

  private handleReset = () => {
    console.log('🔄 User initiated error boundary reset')
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined 
    })
  }

  private handleEmergencyReset = () => {
    console.log('🚨 User initiated emergency reset')
    this.emergencySystem.emergencyReset()
  }

  private handleGoHome = () => {
    console.log('🏠 User navigating to home')
    window.location.href = '/signin?reason=error_recovery'
  }

  public render() {
    if (this.state.hasError) {
      const isMultipleErrors = this.state.errorCount > 1
      
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isMultipleErrors ? 'bg-red-100' : 'bg-orange-100'}`}>
                {isMultipleErrors ? (
                  <Zap className="w-6 h-6 text-red-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                )}
              </div>
              <CardTitle className={isMultipleErrors ? 'text-red-600' : 'text-orange-600'}>
                {isMultipleErrors ? 'Critical Error Detected' : 'Something went wrong'}
              </CardTitle>
              <CardDescription>
                {isMultipleErrors 
                  ? 'Multiple errors detected. The system will automatically reset in a few seconds to prevent further issues.'
                  : 'We encountered an unexpected error. Please try one of the recovery options below.'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <div className="p-3 bg-gray-100 rounded-md max-h-32 overflow-y-auto">
                  <p className="text-sm text-gray-600 font-mono break-all">
                    {this.state.error.message}
                  </p>
                  {this.state.errorInfo?.componentStack && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-500 cursor-pointer">
                        Component Stack
                      </summary>
                      <pre className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack.slice(0, 500)}
                      </pre>
                    </details>
                  )}
                </div>
              )}
              
              {this.state.errorCount > 1 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-700 font-medium">
                    ⚠️ Multiple errors detected ({this.state.errorCount})
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Automatic emergency reset will occur shortly...
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={this.handleReset} 
                  variant="outline"
                  className="flex-1"
                  disabled={isMultipleErrors}
                >
                  Try Again
                </Button>
                <Button 
                  onClick={this.handleReload} 
                  className="flex-1"
                  disabled={isMultipleErrors}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={this.handleGoHome} 
                  variant="secondary"
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
                <Button 
                  onClick={this.handleEmergencyReset} 
                  variant="destructive"
                  className="flex-1"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Emergency Reset
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  If problems persist, try the Emergency Reset to clear all cached data.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default EmergencyErrorBoundary