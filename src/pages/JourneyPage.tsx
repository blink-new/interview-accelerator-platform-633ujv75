import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Calendar, 
  Users, 
  Target,
  BookOpen,
  Video,
  FileText,
  Award,
  Clock
} from 'lucide-react'

const JourneyPage = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1)

  const journeyWeeks = [
    {
      week: 1,
      title: 'Foundation & Goal Setting',
      description: 'Define your career objectives and create a roadmap',
      status: 'completed',
      activities: [
        { type: 'assessment', title: 'Career Assessment', duration: '30 min', completed: true },
        { type: 'call', title: 'Initial Mentor Call', duration: '60 min', completed: true },
        { type: 'assignment', title: 'Goal Setting Worksheet', duration: '45 min', completed: true }
      ]
    },
    {
      week: 2,
      title: 'Industry Deep Dive',
      description: 'Understand your target industry and market trends',
      status: 'completed',
      activities: [
        { type: 'research', title: 'Market Research', duration: '90 min', completed: true },
        { type: 'call', title: 'Industry Expert Call', duration: '45 min', completed: true },
        { type: 'assignment', title: 'Competitive Analysis', duration: '60 min', completed: true }
      ]
    },
    {
      week: 3,
      title: 'Skill Gap Analysis',
      description: 'Identify and prioritize skills you need to develop',
      status: 'current',
      activities: [
        { type: 'assessment', title: 'Skills Assessment', duration: '45 min', completed: true },
        { type: 'call', title: 'Mentor Strategy Session', duration: '60 min', completed: false },
        { type: 'assignment', title: 'Learning Plan Creation', duration: '30 min', completed: false }
      ]
    },
    {
      week: 4,
      title: 'Network Building',
      description: 'Expand your professional network strategically',
      status: 'upcoming',
      activities: [
        { type: 'workshop', title: 'Networking Workshop', duration: '90 min', completed: false },
        { type: 'call', title: 'Network Strategy Call', duration: '45 min', completed: false },
        { type: 'assignment', title: 'LinkedIn Optimization', duration: '60 min', completed: false }
      ]
    },
    {
      week: 5,
      title: 'Personal Branding',
      description: 'Build and refine your professional brand',
      status: 'upcoming',
      activities: [
        { type: 'workshop', title: 'Personal Branding Workshop', duration: '120 min', completed: false },
        { type: 'call', title: 'Brand Review Session', duration: '45 min', completed: false },
        { type: 'assignment', title: 'Portfolio Development', duration: '180 min', completed: false }
      ]
    },
    {
      week: 6,
      title: 'Interview Preparation',
      description: 'Master the interview process and practice scenarios',
      status: 'upcoming',
      activities: [
        { type: 'workshop', title: 'Interview Techniques', duration: '90 min', completed: false },
        { type: 'call', title: 'Mock Interview Session', duration: '60 min', completed: false },
        { type: 'assignment', title: 'Interview Prep Kit', duration: '120 min', completed: false }
      ]
    },
    {
      week: 7,
      title: 'Job Search Strategy',
      description: 'Execute your job search with targeted applications',
      status: 'upcoming',
      activities: [
        { type: 'workshop', title: 'Job Search Strategy', duration: '90 min', completed: false },
        { type: 'call', title: 'Application Review', duration: '45 min', completed: false },
        { type: 'assignment', title: 'Application Tracking', duration: '60 min', completed: false }
      ]
    },
    {
      week: 8,
      title: 'Negotiation & Next Steps',
      description: 'Negotiate offers and plan your continued growth',
      status: 'upcoming',
      activities: [
        { type: 'workshop', title: 'Negotiation Workshop', duration: '90 min', completed: false },
        { type: 'call', title: 'Final Strategy Session', duration: '60 min', completed: false },
        { type: 'assignment', title: 'Growth Plan Creation', duration: '45 min', completed: false }
      ]
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return Video
      case 'workshop': return Users
      case 'assignment': return FileText
      case 'assessment': return Target
      case 'research': return BookOpen
      default: return Circle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'current': return 'bg-primary'
      case 'upcoming': return 'bg-muted'
      default: return 'bg-muted'
    }
  }

  const completedWeeks = journeyWeeks.filter(week => week.status === 'completed').length
  const progressPercentage = (completedWeeks / journeyWeeks.length) * 100

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your 8-Week Journey</h1>
              <p className="text-muted-foreground">Career Transition Program</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              Week {completedWeeks + 1} of 8
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Journey Timeline */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {journeyWeeks.map((week, index) => (
                <Card 
                  key={week.week}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedWeek === week.week ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedWeek(week.week)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(week.status)}`}>
                        {week.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white font-medium">{week.week}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Week {week.week}: {week.title}</CardTitle>
                          <Badge 
                            variant={week.status === 'completed' ? 'default' : week.status === 'current' ? 'secondary' : 'outline'}
                            className="capitalize"
                          >
                            {week.status}
                          </Badge>
                        </div>
                        <CardDescription>{week.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {selectedWeek === week.week && (
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {week.activities.map((activity, activityIndex) => {
                          const ActivityIcon = getActivityIcon(activity.type)
                          return (
                            <div key={activityIndex} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                activity.completed ? 'bg-green-500' : 'bg-muted'
                              }`}>
                                {activity.completed ? (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                ) : (
                                  <ActivityIcon className="w-4 h-4 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className={`font-medium ${activity.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {activity.title}
                                  </span>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {activity.duration}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Week Focus */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  This Week's Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Skill Gap Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Identify the key skills you need to develop for your target role and create a learning plan.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">1 of 3 completed</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Video className="w-4 h-4 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Mentor Strategy Session</div>
                      <div className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Users className="w-4 h-4 text-accent" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Networking Workshop</div>
                      <div className="text-xs text-muted-foreground">Next Week, 10:00 AM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/mentors">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Browse Mentors
                  </Button>
                </Link>
                <Link to="/booking/mentor-1">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Session
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="w-4 h-4 mr-2" />
                    View Progress
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Award className="w-5 h-5 mr-2" />
                  Achievement Unlocked!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-medium text-sm">Goal Setter</div>
                  <div className="text-xs text-muted-foreground">
                    Completed your career assessment and goal setting
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JourneyPage