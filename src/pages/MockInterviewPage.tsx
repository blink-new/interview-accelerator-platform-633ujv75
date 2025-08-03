import React, { useState, useEffect } from 'react'
import { Play, Pause, Square, RotateCcw, Star, Clock, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Textarea } from '../components/ui/textarea'
import { toast } from 'sonner'
import blink from '../lib/blink'

interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
}

interface MockInterviewPageProps {
  user: User
}

const MockInterviewPage: React.FC<MockInterviewPageProps> = ({ user }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [responses, setResponses] = useState<string[]>([])
  const [currentResponse, setCurrentResponse] = useState('')
  const [timer, setTimer] = useState(0)
  const [sessionScore, setSessionScore] = useState(0)

  const questions = [
    {
      id: 1,
      category: 'Introduction',
      question: 'Tell me about yourself and why you\'re interested in this position.',
      timeLimit: 120,
      tips: 'Keep it concise, focus on relevant experience, and connect to the role.'
    },
    {
      id: 2,
      category: 'Experience',
      question: 'Describe a challenging project you worked on and how you overcame obstacles.',
      timeLimit: 180,
      tips: 'Use the STAR method: Situation, Task, Action, Result.'
    },
    {
      id: 3,
      category: 'Problem Solving',
      question: 'How do you handle working under pressure and tight deadlines?',
      timeLimit: 120,
      tips: 'Provide specific examples and mention stress management techniques.'
    },
    {
      id: 4,
      category: 'Teamwork',
      question: 'Tell me about a time when you had to work with a difficult team member.',
      timeLimit: 150,
      tips: 'Focus on your communication skills and conflict resolution abilities.'
    },
    {
      id: 5,
      category: 'Goals',
      question: 'Where do you see yourself in 5 years, and how does this role fit into your career goals?',
      timeLimit: 120,
      tips: 'Show ambition while demonstrating commitment to the company.'
    }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording, isPaused])

  const startSession = () => {
    setSessionStarted(true)
    setCurrentQuestion(0)
    setResponses([])
    setTimer(0)
    setSessionScore(0)
  }

  const startRecording = () => {
    setIsRecording(true)
    setIsPaused(false)
    setTimer(0)
  }

  const pauseRecording = () => {
    setIsPaused(!isPaused)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    
    // Save current response
    const newResponses = [...responses]
    newResponses[currentQuestion] = currentResponse
    setResponses(newResponses)
    setCurrentResponse('')
    
    // Move to next question or complete session
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setTimer(0)
    } else {
      completeSession(newResponses)
    }
  }

  const completeSession = async (finalResponses: string[]) => {
    try {
      // Calculate score based on response length and time
      const score = Math.min(100, Math.round(
        finalResponses.reduce((acc, response, index) => {
          const wordCount = response.split(' ').length
          const timeBonus = timer <= questions[index].timeLimit ? 10 : 0
          return acc + Math.min(20, wordCount / 5) + timeBonus
        }, 0)
      ))

      // Save session to database
      await blink.db.interviewSessions.create({
        id: `session_${Date.now()}`,
        userId: user.id,
        sessionType: 'mock',
        questions: JSON.stringify(questions.map(q => q.question)),
        responses: JSON.stringify(finalResponses),
        score: score,
        feedback: 'Great job! Keep practicing to improve your responses.',
        duration: timer
      })

      setSessionScore(score)
      setSessionCompleted(true)
      toast.success('Mock interview completed!')
    } catch (error) {
      console.error('Error saving session:', error)
      toast.error('Failed to save session')
    }
  }

  const resetSession = () => {
    setSessionStarted(false)
    setSessionCompleted(false)
    setCurrentQuestion(0)
    setIsRecording(false)
    setIsPaused(false)
    setResponses([])
    setCurrentResponse('')
    setTimer(0)
    setSessionScore(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mock Interview Practice
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practice with realistic interview scenarios and get detailed feedback to improve your performance.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to Start?</CardTitle>
              <CardDescription>
                This mock interview includes {questions.length} questions covering different aspects of a typical interview.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">{questions.length}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">15-20</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">AI</div>
                  <div className="text-sm text-gray-600">Feedback</div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">What to expect:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Behavioral and situational questions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Time limits for each response
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Detailed feedback and scoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Progress tracking and improvement tips
                  </li>
                </ul>
              </div>

              <Button onClick={startSession} size="lg" className="w-full">
                <Play className="mr-2 h-5 w-5" />
                Start Mock Interview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (sessionCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Interview Complete!
            </h1>
            <p className="text-xl text-gray-600">
              Great job! Here's your performance summary.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Your Score: {sessionScore}/100</CardTitle>
              <CardDescription>
                {sessionScore >= 80 ? 'Excellent performance!' : 
                 sessionScore >= 60 ? 'Good job! Keep practicing.' : 
                 'Keep practicing to improve your responses.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Performance Breakdown:</h3>
                {questions.map((question, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{question.category}</p>
                      <p className="text-xs text-gray-600 truncate max-w-xs">
                        {question.question}
                      </p>
                    </div>
                    <Badge variant={responses[index] ? 'default' : 'secondary'}>
                      {responses[index] ? 'Completed' : 'Skipped'}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Next Steps:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Review your responses and identify areas for improvement</li>
                  <li>• Practice the STAR method for behavioral questions</li>
                  <li>• Book a session with a mentor for personalized feedback</li>
                  <li>• Try more mock interviews to build confidence</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <Button onClick={resetSession} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button className="flex-1" asChild>
                  <a href="/mentors">Book Mentor</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const timeRemaining = Math.max(0, currentQ.timeLimit - timer)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Question {currentQuestion + 1} of {questions.length}
            </h1>
            <Badge variant="outline">{currentQ.category}</Badge>
          </div>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-gray-600">
            {Math.round(progress)}% complete
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{currentQ.question}</CardTitle>
                <CardDescription>
                  <strong>Tip:</strong> {currentQ.tips}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className={`font-mono text-lg ${timeRemaining <= 30 ? 'text-red-600' : 'text-gray-900'}`}>
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Time remaining
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!isRecording ? (
                      <Button onClick={startRecording} size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Start
                      </Button>
                    ) : (
                      <>
                        <Button onClick={pauseRecording} variant="outline" size="sm">
                          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                        </Button>
                        <Button onClick={stopRecording} variant="destructive" size="sm">
                          <Square className="mr-2 h-4 w-4" />
                          Next
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <Textarea
                  placeholder="Type your response here or speak out loud while recording..."
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  rows={8}
                  disabled={!isRecording || isPaused}
                />

                {isRecording && (
                  <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-red-600">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="font-medium">Recording in progress...</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timer Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Timer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-indigo-600 mb-2">
                    {formatTime(timer)}
                  </div>
                  <p className="text-sm text-gray-600">Current question</p>
                </div>
              </CardContent>
            </Card>

            {/* Questions Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {questions.map((q, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-sm ${
                        index === currentQuestion
                          ? 'bg-indigo-100 text-indigo-800'
                          : index < currentQuestion
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{q.category}</span>
                        {index < currentQuestion && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MockInterviewPage