import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Target, Loader2, CheckCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [recoveryMessage, setRecoveryMessage] = useState('')
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Handle emergency recovery reasons
  useEffect(() => {
    const reason = searchParams.get('reason')
    if (reason) {
      const messages = {
        freeze_recovery: '🧊 System freeze detected. You have been safely logged out for recovery.',
        memory_cleanup: '🧹 High memory usage detected. Session cleared for optimal performance.',
        inactivity: '⏰ You were automatically logged out due to inactivity.',
        emergency_restart: '🚨 Emergency restart completed. Please sign in again.',
        multiple_errors: '❌ Multiple errors detected. System has been reset for stability.',
        circuit_breaker: '🔌 Too many failed requests. Please try again after a moment.',
        error_recovery: '🔧 Recovered from application error. Please sign in to continue.',
        emergency_reset: '🚨 Emergency reset completed. All cached data has been cleared.'
      }
      
      const message = messages[reason as keyof typeof messages]
      if (message) {
        setRecoveryMessage(message)
        // Clear the URL parameter
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('reason')
        window.history.replaceState({}, '', newUrl.toString())
      }
    }
  }, [searchParams])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSigningIn(true)

    if (!email || !password) {
      setError('Please enter both email and password')
      setIsSigningIn(false)
      return
    }

    try {
      const { error } = await signIn(email, password)
      
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          setError('Please check your email and click the verification link before signing in.')
        } else if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.')
        } else {
          setError(error.message)
        }
        setIsSigningIn(false)
      } else {
        // Success - navigation will be handled by auth state change
        navigate('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setIsSigningIn(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSigningUp(true)

    if (!email || !password || !fullName) {
      setError('Please fill in all fields')
      setIsSigningUp(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsSigningUp(false)
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setIsSigningUp(false)
      return
    }

    try {
      const { error } = await signUp(email, password, fullName)
      
      if (error) {
        if (error.message.includes('already registered')) {
          setError('An account with this email already exists. Please sign in instead.')
        } else if (error.message.includes('rate limit')) {
          setError('Too many signup attempts. Please wait a moment and try again.')
        } else {
          setError(error.message)
        }
        setIsSigningUp(false)
      } else {
        setSuccess('Account created successfully! Please check your email to verify your account before signing in.')
        // Clear form
        setEmail('')
        setPassword('')
        setFullName('')
        setIsSigningUp(false)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setIsSigningUp(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Mentorque</span>
          </div>
          <p className="text-gray-600">Land Interviews Faster</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Mentorque</CardTitle>
            <CardDescription>
              Access your personalized interview acceleration program
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recoveryMessage && (
              <Alert className="mb-4 border-orange-200 bg-orange-50">
                <AlertDescription className="text-orange-800">
                  {recoveryMessage}
                </AlertDescription>
              </Alert>
            )}
            
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={isSigningIn}
                      autoComplete="email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={isSigningIn}
                      autoComplete="current-password"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isSigningIn}
                  >
                    {isSigningIn ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      disabled={isSigningUp}
                      autoComplete="name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={isSigningUp}
                      autoComplete="email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password (min 6 characters)"
                      disabled={isSigningUp}
                      autoComplete="new-password"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-sm text-blue-900 mb-2">Getting Started:</h4>
              <div className="space-y-1 text-xs text-blue-700">
                <p>1. Create your account with email verification</p>
                <p>2. Access your personalized 8-week program</p>
                <p>3. Track progress and book mentor sessions</p>
                <p>4. Land interviews faster with expert guidance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}