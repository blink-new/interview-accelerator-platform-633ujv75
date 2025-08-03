import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import blink from '../lib/blink'

const SignInPage: React.FC = () => {
  const handleSignIn = () => {
    blink.auth.login()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <CardTitle className="text-2xl">Welcome to MentorPath</CardTitle>
          <CardDescription>
            Sign in to start your 8-week journey to landing your dream job
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignIn} className="w-full" size="lg">
            Sign In to Continue
          </Button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Secure authentication powered by Blink
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignInPage