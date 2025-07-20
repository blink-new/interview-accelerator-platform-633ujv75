import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Award, 
  Users, 
  Video, 
  CheckCircle,
  Target,
  BookOpen,
  Star,
  ArrowRight,
  BarChart3,
  MessageCircle
} from 'lucide-react'

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Sarah Chen',
      mentorAvatar: '/api/placeholder/40/40',
      title: 'Mentor Strategy Session',
      date: 'Tomorrow',
      time: '2:00 PM',
      duration: '60 min',
      type: 'Video Call',
      status: 'confirmed'
    },
    {
      id: 2,
      mentor: 'Marcus Johnson',
      mentorAvatar: '/api/placeholder/40/40',
      title: 'Technical Leadership Review',
      date: 'Friday',
      time: '10:00 AM',
      duration: '45 min',
      type: 'Video Call',
      status: 'pending'
    }
  ]

  const recentSessions = [
    {
      id: 1,
      mentor: 'Emily Rodriguez',
      mentorAvatar: '/api/placeholder/40/40',
      title: 'Career Assessment',
      date: 'Last Monday',
      duration: '60 min',
      rating: 5,
      feedback: 'Excellent session! Emily provided clear guidance on my career transition strategy.'
    },
    {
      id: 2,
      mentor: 'David Kim',
      mentorAvatar: '/api/placeholder/40/40',
      title: 'Goal Setting Workshop',
      date: 'Last Wednesday',
      duration: '90 min',
      rating: 5,
      feedback: 'Very insightful. David helped me create a concrete 8-week action plan.'
    }
  ]

  const achievements = [
    {
      id: 1,
      title: 'Goal Setter',
      description: 'Completed career assessment and goal setting',
      icon: '🎯',
      earned: true,
      date: 'Week 1'
    },
    {
      id: 2,
      title: 'Industry Explorer',
      description: 'Completed industry deep dive research',
      icon: '🔍',
      earned: true,
      date: 'Week 2'
    },
    {
      id: 3,
      title: 'Skill Mapper',
      description: 'Identified key skills for development',
      icon: '🗺️',
      earned: false,
      date: 'Week 3'
    },
    {
      id: 4,
      title: 'Network Builder',
      description: 'Expanded professional network',
      icon: '🤝',
      earned: false,
      date: 'Week 4'
    }
  ]

  const weeklyProgress = [
    { week: 1, completed: 100, activities: 3 },
    { week: 2, completed: 100, activities: 3 },
    { week: 3, completed: 33, activities: 1 },
    { week: 4, completed: 0, activities: 0 },
    { week: 5, completed: 0, activities: 0 },
    { week: 6, completed: 0, activities: 0 },
    { week: 7, completed: 0, activities: 0 },
    { week: 8, completed: 0, activities: 0 }
  ]

  const overallProgress = 25 // 2 weeks completed out of 8

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and manage your mentorship journey</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Journey Progress</p>
                  <p className="text-2xl font-bold text-foreground">{overallProgress}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sessions Completed</p>
                  <p className="text-2xl font-bold text-foreground">4</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Week</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold text-foreground">2/8</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Journey Progress */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      8-Week Journey Progress
                    </CardTitle>
                    <CardDescription>Career Transition Program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-muted-foreground">{overallProgress}% Complete</span>
                      </div>
                      <Progress value={overallProgress} className="h-3" />
                      
                      <div className="grid grid-cols-8 gap-2 mt-6">
                        {weeklyProgress.map((week) => (
                          <div key={week.week} className="text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                              week.completed === 100 ? 'bg-green-500 text-white' :
                              week.completed > 0 ? 'bg-primary text-white' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {week.week}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {week.completed}%
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4">
                        <Link to="/journey">
                          <Button className="w-full">
                            Continue Journey
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Sessions */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Upcoming Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={session.mentorAvatar} alt={session.mentor} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm">
                              {session.mentor.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{session.title}</div>
                            <div className="text-xs text-muted-foreground">{session.mentor}</div>
                            <div className="text-xs text-muted-foreground">
                              {session.date} at {session.time}
                            </div>
                          </div>
                          <Badge variant={session.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                            {session.status}
                          </Badge>
                        </div>
                      ))}
                      <Link to="/mentors">
                        <Button variant="outline" size="sm" className="w-full">
                          Book New Session
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={session.mentorAvatar} alt={session.mentor} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                          {session.mentor.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{session.title}</div>
                            <div className="text-sm text-muted-foreground">with {session.mentor}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">{session.date}</div>
                            <div className="flex items-center">
                              {[...Array(session.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{session.feedback}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={session.mentorAvatar} alt={session.mentor} />
                              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                                {session.mentor.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{session.title}</div>
                              <div className="text-sm text-muted-foreground">{session.mentor}</div>
                            </div>
                          </div>
                          <Badge variant={session.status === 'confirmed' ? 'default' : 'secondary'}>
                            {session.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                            {session.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            {session.time}
                          </div>
                          <div className="flex items-center">
                            <Video className="w-4 h-4 mr-2 text-muted-foreground" />
                            {session.duration}
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" className="flex-1">Join Call</Button>
                          <Button size="sm" variant="outline">Reschedule</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={session.mentorAvatar} alt={session.mentor} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                              {session.mentor.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{session.title}</div>
                            <div className="text-sm text-muted-foreground">{session.mentor}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">{session.date}</div>
                            <div className="flex items-center">
                              {[...Array(session.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{session.feedback}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Weekly Progress Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {weeklyProgress.map((week) => (
                    <div key={week.week} className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                        week.completed === 100 ? 'bg-green-500 text-white' :
                        week.completed > 0 ? 'bg-primary text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {week.week}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">Week {week.week}</span>
                          <span className="text-sm text-muted-foreground">
                            {week.activities} activities • {week.completed}% complete
                          </span>
                        </div>
                        <Progress value={week.completed} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`text-center ${
                  achievement.earned ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20' : 'opacity-60'
                }`}>
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-medium text-foreground mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <Badge variant={achievement.earned ? 'default' : 'secondary'} className="text-xs">
                      {achievement.earned ? 'Earned' : achievement.date}
                    </Badge>
                    {achievement.earned && (
                      <div className="mt-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default DashboardPage