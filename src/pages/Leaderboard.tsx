import React, { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Target, TrendingUp, Loader2, RefreshCw, Award, Briefcase } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface LeaderboardEntry {
  user_id: string
  user_email: string
  full_name: string
  total_applications: number
  interviews: number
  offers: number
  success_rate: number
}

interface ProgressEntry {
  user_id: string
  user_email: string
  full_name: string
  completed_weeks: number
  journey_completion: number
  is_active: boolean
}

const Leaderboard = React.memo(() => {
  const { user } = useAuth()
  const [jobLeaderboard, setJobLeaderboard] = useState<LeaderboardEntry[]>([])
  const [progressLeaderboard, setProgressLeaderboard] = useState<ProgressEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  
  const mountedRef = useRef(true)
  const loadingRef = useRef(false)

  const fetchJobLeaderboard = useCallback(async () => {
    if (loadingRef.current || !mountedRef.current) return
    
    try {
      const { data, error } = await supabase
        .from('job_applications_leaderboard')
        .select('*')
        .limit(20)

      if (error) throw error
      
      if (mountedRef.current) {
        setJobLeaderboard(data || [])
      }
    } catch (error) {
      console.error('Error fetching job leaderboard:', error)
      if (mountedRef.current) {
        toast.error('Failed to load job leaderboard')
      }
    }
  }, [])

  const fetchProgressLeaderboard = useCallback(async () => {
    if (loadingRef.current || !mountedRef.current) return
    
    try {
      // Get users with their progress
      const { data: usersData, error: usersError } = await supabase
        .from('user_profiles')
        .select('id, full_name, email')
        .neq('role', 'deactivated')
        .order('created_at', { ascending: false })
        .limit(50)

      if (usersError) throw usersError

      // Since we removed week completions, show users with 0 progress
      const progressData = (usersData || []).map(user => {
        return {
          user_id: user.id,
          user_email: user.email || 'Anonymous',
          full_name: user.full_name || 'Anonymous',
          completed_weeks: 0,
          journey_completion: 0,
          is_active: true
        }
      }).sort((a, b) => b.journey_completion - a.journey_completion || b.completed_weeks - a.completed_weeks)

      if (mountedRef.current) {
        setProgressLeaderboard(progressData)
      }
    } catch (error) {
      console.error('Error fetching progress leaderboard:', error)
      if (mountedRef.current) {
        toast.error('Failed to load progress leaderboard')
      }
    }
  }, [])

  const handleRefresh = useCallback(async () => {
    if (refreshing || loadingRef.current) return
    
    setRefreshing(true)
    loadingRef.current = true
    
    try {
      await Promise.all([fetchJobLeaderboard(), fetchProgressLeaderboard()])
      if (mountedRef.current) {
        toast.success('Leaderboards refreshed!')
      }
    } finally {
      if (mountedRef.current) {
        setRefreshing(false)
      }
      loadingRef.current = false
    }
  }, [fetchJobLeaderboard, fetchProgressLeaderboard, refreshing])

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      if (!mountedRef.current) return
      
      loadingRef.current = true
      setLoading(true)
      
      try {
        await Promise.all([fetchJobLeaderboard(), fetchProgressLeaderboard()])
      } finally {
        if (mountedRef.current) {
          setLoading(false)
        }
        loadingRef.current = false
      }
    }

    loadInitialData()
  }, [fetchJobLeaderboard, fetchProgressLeaderboard])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const userJobRank = jobLeaderboard.findIndex(entry => entry.user_id === user?.id) + 1
  const userProgressRank = progressLeaderboard.findIndex(entry => entry.user_id === user?.id) + 1

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading leaderboards...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Trophy className="h-8 w-8 text-yellow-500" />
                Community Leaderboards
              </h1>
              <p className="text-gray-600">See how you rank against other users on the platform</p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressLeaderboard.length}</div>
              <p className="text-xs text-muted-foreground">
                Active community members
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Seekers</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobLeaderboard.length}</div>
              <p className="text-xs text-muted-foreground">
                Users tracking applications
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Job Rank</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userJobRank > 0 ? `#${userJobRank}` : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                {userJobRank > 0 ? 'Job search ranking' : 'Add applications to rank'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Progress Rank</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userProgressRank > 0 ? `#${userProgressRank}` : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                Journey completion ranking
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboards */}
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="progress">Journey Progress</TabsTrigger>
            <TabsTrigger value="job-search">Job Search</TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Journey Progress Leaderboard
                </CardTitle>
                <CardDescription>
                  Rankings based on 8-week journey completion progress
                  {userProgressRank > 0 && (
                    <span className="block mt-1 font-medium text-purple-600">
                      Your current rank: #{userProgressRank}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {progressLeaderboard.length === 0 ? (
                  <div className="text-center py-12">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No progress data yet</h3>
                    <p className="text-gray-600">Start your journey to appear on the leaderboard!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {progressLeaderboard.slice(0, 20).map((entry, index) => (
                      <div
                        key={entry.user_id}
                        className={`p-4 rounded-lg border transition-colors ${
                          entry.user_id === user?.id ? 'bg-purple-50 border-purple-200' : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              index === 0 ? 'bg-yellow-100 text-yellow-800' :
                              index === 1 ? 'bg-gray-100 text-gray-800' :
                              index === 2 ? 'bg-orange-100 text-orange-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">
                                {entry.user_id === user?.id ? 'You' : (entry.full_name !== 'Anonymous' ? entry.full_name : entry.user_email?.split('@')[0] || 'Anonymous')}
                              </p>
                              <p className="text-sm text-gray-600">
                                {entry.completed_weeks}/8 weeks completed
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{entry.journey_completion}%</p>
                            <Badge variant={
                              entry.journey_completion >= 100 ? 'default' :
                              entry.journey_completion >= 75 ? 'secondary' :
                              entry.journey_completion >= 50 ? 'outline' :
                              'secondary'
                            }>
                              {entry.journey_completion >= 100 ? 'Graduate' :
                               entry.journey_completion >= 75 ? 'Expert' :
                               entry.journey_completion >= 50 ? 'Advanced' :
                               entry.journey_completion >= 25 ? 'Intermediate' : 'Beginner'}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={entry.journey_completion} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="job-search">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Job Search Leaderboard
                </CardTitle>
                <CardDescription>
                  Rankings based on job applications, interviews, and success rates
                  {userJobRank > 0 && (
                    <span className="block mt-1 font-medium text-blue-600">
                      Your current rank: #{userJobRank}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {jobLeaderboard.length === 0 ? (
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No job applications yet</h3>
                    <p className="text-gray-600">Be the first to add applications and claim the top spot!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobLeaderboard.slice(0, 20).map((entry, index) => (
                      <div
                        key={entry.user_id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                          entry.user_id === user?.id ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            index === 0 ? 'bg-yellow-100 text-yellow-800' :
                            index === 1 ? 'bg-gray-100 text-gray-800' :
                            index === 2 ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">
                              {entry.user_id === user?.id ? 'You' : (entry.full_name !== 'Anonymous' ? entry.full_name : entry.user_email?.split('@')[0] || 'Anonymous')}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{entry.total_applications} applications</span>
                              <span>{entry.interviews} interviews</span>
                              <span>{entry.offers} offers</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{entry.success_rate}%</p>
                          <p className="text-sm text-gray-600">Success Rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
})

Leaderboard.displayName = 'Leaderboard'

export default Leaderboard