import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Circle, Calendar, Target, TrendingUp, Award, Clock, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import { toast } from 'sonner'
import blink from '../lib/blink'

interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
}

interface UserProgress {
  id: string
  userId: string
  journeyType: string
  currentWeek: number
  completedTasks: string[]
  totalScore: number
}

interface JourneyPageProps {
  user: User
}

const JourneyPage: React.FC<JourneyPageProps> = ({ user }) => {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([])

  useEffect(() => {
    loadUserProgress()
    loadUpcomingBookings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadUserProgress = async () => {
    try {
      setLoading(true)
      const progressData = await blink.db.userProgress.list({
        where: { 
          userId: user.id,
          journeyType: '8-week-journey'
        }
      })
      
      if (progressData.length > 0) {
        const progress = progressData[0]
        setUserProgress({
          id: progress.id,
          userId: progress.userId,
          journeyType: progress.journeyType,
          currentWeek: Number(progress.currentWeek),
          completedTasks: JSON.parse(progress.completedTasks || '[]'),
          totalScore: Number(progress.totalScore)
        })
      } else {
        // Create initial progress record
        const newProgress = await blink.db.userProgress.create({
          id: `progress_${Date.now()}`,
          userId: user.id,
          journeyType: '8-week-journey',
          currentWeek: 1,
          completedTasks: '[]',
          totalScore: 0
        })
        
        setUserProgress({
          id: newProgress.id,
          userId: user.id,
          journeyType: '8-week-journey',
          currentWeek: 1,
          completedTasks: [],
          totalScore: 0
        })
      }
    } catch (error) {
      console.error('Error loading user progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUpcomingBookings = async () => {
    try {
      const bookings = await blink.db.bookings.list({
        where: { 
          userId: user.id,
          status: 'scheduled'
        },
        orderBy: { sessionDate: 'asc' },
        limit: 3
      })
      setUpcomingBookings(bookings)
    } catch (error) {
      console.error('Error loading bookings:', error)
    }
  }

  const markTaskComplete = async (taskId: string, points: number) => {
    if (!userProgress) return

    try {
      const updatedTasks = [...userProgress.completedTasks, taskId]
      const newScore = userProgress.totalScore + points
      
      await blink.db.userProgress.update(userProgress.id, {
        completedTasks: JSON.stringify(updatedTasks),
        totalScore: newScore
      })
      
      setUserProgress({
        ...userProgress,
        completedTasks: updatedTasks,
        totalScore: newScore
      })
      
      toast.success(`Task completed! +${points} points`)
    } catch (error) {
      console.error('Error updating progress:', error)
      toast.error('Failed to update progress')
    }
  }

  const weeklyTasks = [
    {
      week: 1,
      title: 'Foundation & Assessment',
      tasks: [
        { id: 'w1_resume', title: 'Complete Resume Review', points: 100, href: '/resume-review' },
        { id: 'w1_linkedin', title: 'Optimize LinkedIn Profile', points: 75, href: '/linkedin-strategy' },
        { id: 'w1_goals', title: 'Set Career Goals', points: 50, href: '/week1' },
        { id: 'w1_mentor', title: 'Book First Mentor Session', points: 150, href: '/mentors' }
      ]
    },
    {
      week: 2,
      title: 'Interview Preparation',
      tasks: [
        { id: 'w2_behavioral', title: 'Practice Behavioral Questions', points: 100, href: '/behavioral-interview' },
        { id: 'w2_elevator', title: 'Perfect Your Elevator Pitch', points: 75, href: '/elevator-pitch' },
        { id: 'w2_mock', title: 'Complete Mock Interview', points: 150, href: '/mock-interview' },
        { id: 'w2_cheatsheet', title: 'Create Interview Cheatsheet', points: 50, href: '/interview-cheatsheet' }
      ]
    },
    {
      week: 3,
      title: 'Technical Skills',
      tasks: [
        { id: 'w3_technical', title: 'Technical Interview Practice', points: 150, href: '/technical-interview' },
        { id: 'w3_portfolio', title: 'Build Portfolio', points: 100, href: '/portfolio-templates' },
        { id: 'w3_competency', title: 'Competency Assessment', points: 75, href: '/competency-interview' },
        { id: 'w3_ai', title: 'Use AI Assistant for Prep', points: 50, href: '/ai-assistant' }
      ]
    },
    {
      week: 4,
      title: 'Job Search Strategy',
      tasks: [
        { id: 'w4_prospecting', title: 'Use Prospecting Tool', points: 100, href: '/prospecting-tool' },
        { id: 'w4_applications', title: 'Submit 10 Applications', points: 150, href: '/prospecting-tool' },
        { id: 'w4_networking', title: 'Connect with 5 Professionals', points: 75, href: '/linkedin-strategy' },
        { id: 'w4_mentor2', title: 'Second Mentor Session', points: 100, href: '/mentors' }
      ]
    },
    {
      week: 5,
      title: 'Interview Execution',
      tasks: [
        { id: 'w5_interviews', title: 'Complete 3 Real Interviews', points: 200, href: '/interview-prep' },
        { id: 'w5_followup', title: 'Master Follow-up Strategy', points: 75, href: '/interview-prep' },
        { id: 'w5_feedback', title: 'Collect Interview Feedback', points: 50, href: '/ai-assistant' },
        { id: 'w5_adjust', title: 'Adjust Strategy Based on Results', points: 100, href: '/journey' }
      ]
    },
    {
      week: 6,
      title: 'Negotiation & Offers',
      tasks: [
        { id: 'w6_negotiation', title: 'Learn Salary Negotiation', points: 100, href: '/interview-prep' },
        { id: 'w6_offers', title: 'Evaluate Job Offers', points: 75, href: '/ai-assistant' },
        { id: 'w6_mentor3', title: 'Negotiation Mentor Session', points: 150, href: '/mentors' },
        { id: 'w6_decision', title: 'Make Final Decision', points: 50, href: '/journey' }
      ]
    },
    {
      week: 7,
      title: 'Final Preparations',
      tasks: [
        { id: 'w7_final_prep', title: 'Final Interview Preparation', points: 100, href: '/interview-prep' },
        { id: 'w7_references', title: 'Prepare References', points: 50, href: '/ai-assistant' },
        { id: 'w7_onboarding', title: 'Plan Onboarding Strategy', points: 75, href: '/journey' },
        { id: 'w7_celebration', title: 'Celebrate Your Success!', points: 200, href: '/leaderboard' }
      ]
    },
    {
      week: 8,
      title: 'Success & Beyond',
      tasks: [
        { id: 'w8_start', title: 'Start Your New Role', points: 300, href: '/journey' },
        { id: 'w8_mentor_others', title: 'Become a Mentor', points: 100, href: '/mentors' },
        { id: 'w8_review', title: 'Share Your Success Story', points: 75, href: '/leaderboard' },
        { id: 'w8_continue', title: 'Plan Continued Growth', points: 50, href: '/journey' }
      ]
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your journey...</p>
        </div>
      </div>
    )
  }

  const currentWeek = userProgress?.currentWeek || 1
  const completedTasks = userProgress?.completedTasks || []
  const totalScore = userProgress?.totalScore || 0
  const progressPercentage = (currentWeek / 8) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your 8-Week Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our proven step-by-step program to land your dream job faster.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Week {currentWeek}</div>
              <p className="text-xs text-muted-foreground">
                {weeklyTasks[currentWeek - 1]?.title}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalScore}</div>
              <p className="text-xs text-muted-foreground">
                Points earned
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressPercentage.toFixed(0)}%</div>
              <Progress value={progressPercentage} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Bookings */}
        {upcomingBookings.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingBookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Mentor Session</p>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.sessionDate).toLocaleDateString()} at {booking.sessionTime}
                      </p>
                    </div>
                    <Badge variant="secondary">Scheduled</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weekly Tasks */}
        <div className="space-y-8">
          {weeklyTasks.map((week, weekIndex) => {
            const isCurrentWeek = weekIndex + 1 === currentWeek
            const isCompleted = weekIndex + 1 < currentWeek
            const isLocked = weekIndex + 1 > currentWeek

            return (
              <Card key={week.week} className={`${isCurrentWeek ? 'ring-2 ring-indigo-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        {isCompleted ? (
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        ) : isCurrentWeek ? (
                          <Target className="mr-2 h-5 w-5 text-indigo-500" />
                        ) : (
                          <Circle className="mr-2 h-5 w-5 text-gray-400" />
                        )}
                        Week {week.week}: {week.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isCurrentWeek && <Badge>Current</Badge>}
                      {isCompleted && <Badge variant="secondary">Completed</Badge>}
                      {isLocked && <Badge variant="outline">Locked</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {week.tasks.map((task) => {
                      const isTaskCompleted = completedTasks.includes(task.id)
                      const isTaskLocked = isLocked

                      return (
                        <div
                          key={task.id}
                          className={`p-4 rounded-lg border ${
                            isTaskCompleted 
                              ? 'bg-green-50 border-green-200' 
                              : isTaskLocked 
                                ? 'bg-gray-50 border-gray-200 opacity-50'
                                : 'bg-white border-gray-200 hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{task.title}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                +{task.points}
                              </Badge>
                              {isTaskCompleted && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          </div>
                          {!isTaskLocked && (
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                disabled={isTaskCompleted}
                              >
                                <Link to={task.href}>
                                  {isTaskCompleted ? 'Completed' : 'Start Task'}
                                  {!isTaskCompleted && <ArrowRight className="ml-1 h-3 w-3" />}
                                </Link>
                              </Button>
                              {!isTaskCompleted && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markTaskComplete(task.id, task.points)}
                                >
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Extra Help?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Book a session with one of our expert mentors for personalized guidance.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/mentors">Book Mentor Session</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default JourneyPage