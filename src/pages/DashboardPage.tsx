import { useState, useMemo, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Target,
  CheckCircle,
  Clock,
  BookOpen,
  Award,
  Loader2
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { useProgress } from "@/hooks/useProgress"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface WeekProgram {
  week: number
  title: string
  description: string
  completed: boolean
  current: boolean
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, userProfile } = useAuth()
  const { completedWeeks, overallProgress, isLoading, markWeekComplete } = useProgress()
  const [showAllWeeks, setShowAllWeeks] = useState(false)

  const weeklyProgram: WeekProgram[] = useMemo(() => [
    { 
      week: 1, 
      title: "Foundation & Self-Assessment", 
      description: "Introduction to interview preparation, skills assessment, goal setting",
      completed: false, 
      current: false
    },
    { 
      week: 2, 
      title: "Portfolio Development", 
      description: "Build a stunning portfolio that showcases your skills and projects",
      completed: false, 
      current: false
    },
    { 
      week: 3, 
      title: "AI Assistants & Final Resume Review", 
      description: "Get your personal AI assistant and complete final resume optimization",
      completed: false, 
      current: false
    },
    { 
      week: 4, 
      title: "Interview Cheat Sheet", 
      description: "Create personalized cheatsheets with mentor guidance for interview success",
      completed: false, 
      current: false
    },
    { 
      week: 5, 
      title: "LinkedIn Outreach & Networking", 
      description: "Master LinkedIn optimization and professional networking strategies",
      completed: false, 
      current: false
    },
    { 
      week: 6, 
      title: "Prospecting Tool & HR Connections", 
      description: "Use advanced tools to extract HR details and get more referrals",
      completed: false, 
      current: false
    },
    { 
      week: 7, 
      title: "Mock Interview Practice", 
      description: "Video practice sessions, peer review system, feedback integration",
      completed: false, 
      current: false
    },
    { 
      week: 8, 
      title: "Final Preparations & Follow-up", 
      description: "Interview day preparation, post-interview strategies, offer evaluation",
      completed: false, 
      current: false
    }
  ], [])



  const updatedWeeklyProgram = useMemo(() => {
    return weeklyProgram.map(week => {
      const isCompleted = completedWeeks.includes(week.week)
      const currentWeek = completedWeeks.length + 1
      
      return {
        ...week,
        completed: isCompleted,
        current: week.week === currentWeek && !isCompleted
      }
    })
  }, [weeklyProgram, completedWeeks])

  const currentWeek = useMemo(() => completedWeeks.length + 1, [completedWeeks])
  const totalWeeks = useMemo(() => weeklyProgram.length, [weeklyProgram])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile?.full_name || user?.email?.split('@')[0] || 'there'}! 👋
          </h1>
          <p className="text-gray-600">Track your progress through the 8-week interview acceleration program</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Weekly Progress</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Program Progress</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
                  <p className="text-xs text-muted-foreground">
                    Week {currentWeek} of {totalWeeks}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Weeks</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedWeeks.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalWeeks - completedWeeks.length} weeks remaining
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Focus</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    {currentWeek <= totalWeeks ? `Week ${currentWeek}` : 'Complete!'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {currentWeek <= totalWeeks 
                      ? weeklyProgram[currentWeek - 1]?.title 
                      : 'Program finished'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Achievement</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    {overallProgress >= 100 ? 'Graduate!' : 
                     overallProgress >= 75 ? 'Expert' :
                     overallProgress >= 50 ? 'Advanced' :
                     overallProgress >= 25 ? 'Intermediate' : 'Beginner'}
                  </div>
                  <p className="text-xs text-muted-foreground">Current level</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>8-Week Program Overview</CardTitle>
                <CardDescription>Your journey through our interview acceleration program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">
                      {completedWeeks.length} of {totalWeeks} weeks completed
                    </span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                </div>
                
                <div className="grid gap-3 mt-8">
                  {(showAllWeeks ? updatedWeeklyProgram : updatedWeeklyProgram.slice(0, 4)).map((week) => (
                    <div 
                      key={week.week} 
                      className={`p-4 border rounded-lg transition-colors ${
                        week.current ? 'border-blue-500 bg-blue-50' : 
                        week.completed ? 'border-green-500 bg-green-50' : 
                        'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            week.completed ? 'bg-green-500 text-white' : 
                            week.current ? 'bg-blue-500 text-white' : 
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {week.completed ? <CheckCircle className="h-4 w-4" /> : week.week}
                          </div>
                          <div>
                            <h4 className="font-medium">Week {week.week}: {week.title}</h4>
                            <p className="text-sm text-gray-600">{week.description}</p>
                            {week.current && (
                              <Badge variant="outline" className="mt-1 text-blue-600 border-blue-600">
                                Current Week
                              </Badge>
                            )}
                          </div>
                        </div>
                        {week.current && (
                          <Button size="sm" onClick={() => navigate('/journey')}>
                            Continue
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {updatedWeeklyProgram.length > 4 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" onClick={() => setShowAllWeeks(!showAllWeeks)}>
                      {showAllWeeks ? 'Show Less' : 'Show All Weeks'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Weekly Progress</CardTitle>
                <CardDescription>Complete each week to unlock the next phase of your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {updatedWeeklyProgram.map((week) => (
                    <div 
                      key={week.week} 
                      className={`p-6 border rounded-lg ${
                        week.current ? 'border-blue-500 bg-blue-50' : 
                        week.completed ? 'border-green-500 bg-green-50' : 
                        'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            week.completed ? 'bg-green-500 text-white' : 
                            week.current ? 'bg-blue-500 text-white' : 
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {week.completed ? <CheckCircle className="h-5 w-5" /> : week.week}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Week {week.week}: {week.title}</h3>
                            <p className="text-gray-600">{week.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {week.completed && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          {week.current && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <Clock className="h-3 w-3 mr-1" />
                              In Progress
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        {week.current && !week.completed && (
                          <Button 
                            size="sm" 
                            onClick={() => markWeekComplete(week.week)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Mark Week Complete
                          </Button>
                        )}
                        {week.completed && (
                          <span className="text-sm text-green-600 font-medium">
                            ✓ Completed
                          </span>
                        )}
                        {!week.current && !week.completed && (
                          <span className="text-sm text-gray-500">
                            Complete previous weeks to unlock
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/resume-review')}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span>Resume Review</span>
                  </CardTitle>
                  <CardDescription>Get expert feedback on your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Start Review
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/mock-interviews')}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span>Mock Interviews</span>
                  </CardTitle>
                  <CardDescription>Practice with industry experts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Book Session
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span>Find Mentors</span>
                  </CardTitle>
                  <CardDescription>Connect with experienced professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
                  >
                    Book a Call with Mentor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}