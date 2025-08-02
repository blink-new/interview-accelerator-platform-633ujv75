import { useState, useEffect, useCallback, useMemo, useRef } from "react"
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
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { SessionStatus } from "@/components/SessionStatus"

interface WeekProgram {
  week: number
  title: string
  description: string
  completed: boolean
  current: boolean
  activities: string[]
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, userProfile } = useAuth()
  const [overallProgress, setOverallProgress] = useState(0)
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasInitialized, setHasInitialized] = useState(false)
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isLoadingRef = useRef(false)

  const weeklyProgram: WeekProgram[] = useMemo(() => [
    { 
      week: 1, 
      title: "Foundation & Self-Assessment", 
      description: "Introduction to interview preparation, skills assessment, goal setting",
      completed: false, 
      current: false,
      activities: [
        "Complete skills assessment quiz",
        "Set interview goals and timeline", 
        "Review current resume",
        "Identify target companies",
        "Create action plan"
      ]
    },
    { 
      week: 2, 
      title: "Portfolio Development", 
      description: "Build a stunning portfolio that showcases your skills and projects",
      completed: false, 
      current: false,
      activities: [
        "Choose portfolio template",
        "Customize design and branding",
        "Add project showcases",
        "Optimize for mobile and desktop",
        "Deploy and test portfolio"
      ]
    },
    { 
      week: 3, 
      title: "AI Assistants & Final Resume Review", 
      description: "Get your personal AI assistant and complete final resume optimization",
      completed: false, 
      current: false,
      activities: [
        "Install AI assistant Chrome extension",
        "Configure AI settings and preferences",
        "Complete final resume review",
        "Optimize resume with AI suggestions",
        "Test AI assistant on job boards"
      ]
    },
    { 
      week: 4, 
      title: "Interview Cheat Sheet", 
      description: "Create personalized cheatsheets with mentor guidance for interview success",
      completed: false, 
      current: false,
      activities: [
        "Identify interview question categories",
        "Prepare STAR method responses",
        "Create technical question cheatsheet",
        "Develop company-specific talking points",
        "Practice with cheatsheet materials"
      ]
    },
    { 
      week: 5, 
      title: "LinkedIn Outreach & Networking", 
      description: "Master LinkedIn optimization and professional networking strategies",
      completed: false, 
      current: false,
      activities: [
        "Optimize LinkedIn profile for visibility",
        "Develop content strategy and posting schedule",
        "Build strategic connections with industry professionals",
        "Create personalized outreach message templates",
        "Practice networking and relationship building"
      ]
    },
    { 
      week: 6, 
      title: "Prospecting Tool & HR Connections", 
      description: "Use advanced tools to extract HR details and get more referrals",
      completed: false, 
      current: false,
      activities: [
        "Set up HR prospecting tool for target companies",
        "Extract HR manager and recruiter contact information",
        "Create referral request templates and strategies",
        "Practice outreach to HR professionals and employees",
        "Track response rates and optimize approach"
      ]
    },
    { 
      week: 7, 
      title: "Mock Interview Practice", 
      description: "Video practice sessions, peer review system, feedback integration",
      completed: false, 
      current: false,
      activities: [
        "Complete mock technical interview",
        "Practice behavioral interviews",
        "Get feedback from mentors",
        "Improve weak areas",
        "Record progress videos"
      ]
    },
    { 
      week: 8, 
      title: "Final Preparations & Follow-up", 
      description: "Interview day preparation, post-interview strategies, offer evaluation",
      completed: false, 
      current: false,
      activities: [
        "Final practice sessions and confidence building",
        "Prepare interview day checklist",
        "Send thank you notes and follow up appropriately",
        "Evaluate offers and negotiate terms"
      ]
    }
  ], [])

  const loadUserProgress = useCallback(async () => {
    if (!user || isLoadingRef.current) {
      if (!user) setIsLoading(false)
      return
    }
    
    try {
      isLoadingRef.current = true
      
      // Don't set loading state if page is hidden (tab switching)
      if (!document.hidden) {
        setIsLoading(true)
      }
      
      // Clear any existing timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
      
      // Clear any cached data first
      setCompletedWeeks([])
      setOverallProgress(0)
      
      // Add timeout to prevent hanging requests
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )
      
      const dataPromise = supabase
        .from('week_completions')
        .select('week_number')
        .eq('user_id', user.id)
        .eq('completed', true)
      
      const { data: completions, error } = await Promise.race([dataPromise, timeoutPromise]) as any
      
      if (error) {
        console.error('Database error loading progress:', error)
        
        // Check if it's an auth error
        if (error.message?.includes('JWT') || error.message?.includes('expired') || error.message?.includes('invalid')) {
          toast.error('Session expired. Please sign in again.')
          // Don't set default values, let auth handle logout
          return
        }
        
        // For other errors, set defaults and continue
        setCompletedWeeks([])
        setOverallProgress(0)
        setHasInitialized(true)
        return
      }
      
      const completed = completions ? completions.map(c => c.week_number) : []
      setCompletedWeeks(completed)
      
      // Calculate progress based on completed weeks
      const progress = (completed.length / 8) * 100
      setOverallProgress(progress)
      
      setHasInitialized(true)
      
    } catch (error) {
      console.error('Error loading user progress:', error)
      
      // Handle different types of errors
      if (error instanceof Error) {
        if (error.message === 'Request timeout') {
          toast.error('Loading took too long. Please refresh the page.')
        } else if (error.message?.includes('JWT') || error.message?.includes('expired')) {
          toast.error('Session expired. Please sign in again.')
          return // Don't set defaults, let auth handle logout
        }
      }
      
      // Set default values on error
      setCompletedWeeks([])
      setOverallProgress(0)
      setHasInitialized(true)
    } finally {
      isLoadingRef.current = false
      // Always clear loading state regardless of visibility
      setIsLoading(false)
    }
  }, [user])

  // Reset state when component mounts or user changes
  useEffect(() => {
    // Clear any stale state immediately
    setIsLoading(true)
    setHasInitialized(false)
    setCompletedWeeks([])
    setOverallProgress(0)
    
    if (user) {
      loadUserProgress()
    } else {
      setIsLoading(false)
    }
  }, [user, loadUserProgress])

  // Handle visibility changes to prevent loading during tab switches
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is being hidden, don't trigger any loading states
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    const currentTimeoutRef = loadingTimeoutRef.current
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (currentTimeoutRef) {
        clearTimeout(currentTimeoutRef)
      }
      isLoadingRef.current = false
    }
  }, [])

  const handleMarkWeekComplete = useCallback(async (weekNumber: number) => {
    if (!user) return
    
    try {
      await supabase
        .from('week_completions')
        .upsert({
          user_id: user.id,
          week_number: weekNumber,
          completed: true,
          completed_at: new Date().toISOString()
        })
      
      // Refresh progress
      await loadUserProgress()
    } catch (error) {
      console.error('Error marking week complete:', error)
    }
  }, [user, loadUserProgress])

  // Update weekly program with completion status
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

  if (isLoading || !hasInitialized) {
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
      <SessionStatus onRefresh={loadUserProgress} />
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
                  {updatedWeeklyProgram.slice(0, 4).map((week) => (
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
                    <Button variant="outline" onClick={() => navigate('/journey')}>
                      View All Weeks
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
                      
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium text-sm">Activities:</h4>
                        <ul className="space-y-1">
                          {week.activities.map((activity, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                week.completed ? 'bg-green-500' : 'bg-gray-300'
                              }`} />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        {week.current && !week.completed && (
                          <Button 
                            size="sm" 
                            onClick={() => handleMarkWeekComplete(week.week)}
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

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/mentors')}>
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
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')
                    }}
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