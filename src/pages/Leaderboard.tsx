import React, { useState, useEffect } from 'react'
import { Trophy, Medal, Award, Star, TrendingUp, Users, Target, Calendar, Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Switch } from '../components/ui/switch'
import { toast } from 'sonner'
import blink from '../lib/blink'

interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
}

interface LeaderboardUser {
  id: string
  displayName: string
  totalApplications: number
  totalInterviews: number
  totalOffers: number
  successRate: number
  interviewRate: number
  offerRate: number
  rank: number
}

interface LeaderboardProps {
  user: User | null
}

const Leaderboard: React.FC<LeaderboardProps> = ({ user }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null)
  const [isPublic, setIsPublic] = useState(false)

  useEffect(() => {
    loadLeaderboard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadLeaderboard = async () => {
    try {
      setLoading(true)
      
      if (!user) {
        setLoading(false)
        return
      }
      
      // Get leaderboard data from backend
      const token = await blink.auth.getToken()
      const response = await fetch(
        `https://xzhzyevxktpnzriysvmg.supabase.co/functions/v1/user-management?action=get-leaderboard`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      
      const data = await response.json()
      
      if (data.success) {
        // Format leaderboard data
        const formattedData = data.leaderboard.map((stats: any, index: number) => ({
          id: stats.user_id,
          displayName: stats.display_name || 'Anonymous',
          totalApplications: Number(stats.total_applications),
          totalInterviews: Number(stats.total_interviews),
          totalOffers: Number(stats.total_offers),
          successRate: Number(stats.success_rate),
          interviewRate: Number(stats.interview_rate),
          offerRate: Number(stats.offer_rate),
          rank: index + 1
        }))
        
        setLeaderboardData(formattedData)
        
        // Find current user's rank
        if (user) {
          const userRank = formattedData.findIndex(u => u.id === user.id)
          setCurrentUserRank(userRank >= 0 ? userRank + 1 : null)
        }
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePrivacy = async () => {
    try {
      const token = await blink.auth.getToken()
      const response = await fetch(
        `https://xzhzyevxktpnzriysvmg.supabase.co/functions/v1/user-management?action=toggle-privacy`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isPublic: !isPublic })
        }
      )
      
      if (response.ok) {
        setIsPublic(!isPublic)
        toast.success(`Leaderboard visibility ${!isPublic ? 'enabled' : 'disabled'}`)
        loadLeaderboard() // Refresh leaderboard
      }
    } catch (error) {
      console.error('Error toggling privacy:', error)
      toast.error('Failed to update privacy settings')
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-800'
    if (rank === 2) return 'bg-gray-100 text-gray-800'
    if (rank === 3) return 'bg-amber-100 text-amber-800'
    if (rank <= 10) return 'bg-blue-100 text-blue-800'
    return 'bg-gray-50 text-gray-600'
  }

  const stats = {
    totalUsers: leaderboardData.length,
    averageApplications: Math.round(leaderboardData.reduce((acc, user) => acc + user.totalApplications, 0) / leaderboardData.length || 0),
    topOffers: leaderboardData[0]?.totalOffers || 0,
    averageSuccessRate: Math.round(leaderboardData.reduce((acc, user) => acc + user.successRate, 0) / leaderboardData.length || 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Leaderboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how you rank against other job seekers on their journey to success.
          </p>
          
          {/* Privacy Toggle */}
          {user && (
            <div className="mt-6 flex items-center justify-center space-x-3">
              <EyeOff className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Private</span>
              <Switch
                checked={isPublic}
                onCheckedChange={togglePrivacy}
              />
              <span className="text-sm text-gray-600">Public</span>
              <Eye className="h-4 w-4 text-gray-500" />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Active participants</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Applications</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageApplications}</div>
              <p className="text-xs text-muted-foreground">Per user</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Offers</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.topOffers}</div>
              <p className="text-xs text-muted-foreground">Most offers received</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageSuccessRate}%</div>
              <p className="text-xs text-muted-foreground">Offers from interviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Current User Rank */}
        {user && currentUserRank && (
          <Card className="mb-8 border-indigo-200 bg-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-indigo-600" />
                Your Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full">
                    {getRankIcon(currentUserRank)}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Rank #{currentUserRank}</p>
                    <p className="text-gray-600">Keep going to climb higher!</p>
                  </div>
                </div>
                <Badge className={getRankBadge(currentUserRank)}>
                  {currentUserRank <= 10 ? 'Top 10' : 'Participant'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top 3 Podium */}
        {leaderboardData.length >= 3 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Top Performers</h2>
            <div className="flex justify-center items-end space-x-4">
              {/* 2nd Place */}
              <Card className="w-48 bg-gray-50">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Medal className="h-12 w-12 text-gray-400" />
                  </div>
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarFallback>{leaderboardData[1].displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{leaderboardData[1].displayName}</h3>
                  <p className="text-2xl font-bold text-gray-600">{leaderboardData[1].totalOffers}</p>
                  <p className="text-sm text-gray-500">offers</p>
                </CardContent>
              </Card>

              {/* 1st Place */}
              <Card className="w-52 bg-yellow-50 transform scale-110">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Trophy className="h-16 w-16 text-yellow-500" />
                  </div>
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarFallback>{leaderboardData[0].displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{leaderboardData[0].displayName}</h3>
                  <p className="text-3xl font-bold text-yellow-600">{leaderboardData[0].totalOffers}</p>
                  <p className="text-sm text-gray-500">offers</p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">Champion</Badge>
                </CardContent>
              </Card>

              {/* 3rd Place */}
              <Card className="w-48 bg-amber-50">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Award className="h-12 w-12 text-amber-600" />
                  </div>
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarFallback>{leaderboardData[2].displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{leaderboardData[2].displayName}</h3>
                  <p className="text-2xl font-bold text-amber-600">{leaderboardData[2].totalOffers}</p>
                  <p className="text-sm text-gray-500">offers</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Full Rankings</CardTitle>
            <CardDescription>Complete leaderboard of all participants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((leaderUser) => (
                <div
                  key={leaderUser.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    user && leaderUser.id === user.id ? 'bg-indigo-50 border-indigo-200' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10">
                      {getRankIcon(leaderUser.rank)}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{leaderUser.displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{leaderUser.displayName}</p>
                      <p className="text-sm text-gray-600">{leaderUser.totalApplications} apps • {leaderUser.totalInterviews} interviews • {leaderUser.successRate}% success</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold">{leaderUser.totalOffers}</p>
                      <p className="text-sm text-gray-500">offers</p>
                    </div>
                    <Badge className={getRankBadge(leaderUser.rank)}>
                      #{leaderUser.rank}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {leaderboardData.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No rankings yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Be the first to start your journey and claim the top spot!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard