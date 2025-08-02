import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  Users, 
  Target,
  Award,
  HeartHandshake
} from 'lucide-react'

const JourneyPage = () => {
  const roadmapWeeks = [
    {
      week: 1,
      title: 'Resume',
      description: 'Professional resume optimization and ATS-friendly formatting',
      icon: '📄'
    },
    {
      week: 2,
      title: 'Portfolio',
      description: 'Build a stunning portfolio that showcases your skills and projects',
      icon: '💼'
    },
    {
      week: 3,
      title: 'CheatSheet and AI Tool Setup',
      description: 'Create personalized interview cheatsheets and set up AI assistants',
      icon: '🤖'
    },
    {
      week: 4,
      title: 'HR Extension and Prospecting',
      description: 'Master networking strategies and direct outreach to hiring managers',
      icon: '🎯'
    },
    {
      week: 5,
      title: 'Elevator Pitch and "Tell Me About Yourself"',
      description: 'Perfect your personal brand story and compelling self-introduction',
      icon: '🗣️'
    },
    {
      week: 6,
      title: 'Competency Interview',
      description: 'Master behavioral questions using STAR method and competency frameworks',
      icon: '💪'
    },
    {
      week: 7,
      title: 'Technical Interview',
      description: 'Prepare for technical assessments, coding challenges, and system design',
      icon: '⚡'
    },
    {
      week: 8,
      title: 'Final Review and Interview',
      description: 'Complete preparation review and final mock interview sessions',
      icon: '🎓'
    }
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Your 8-Week Journey</h1>
          <p className="text-xl text-muted-foreground mb-6">
            A structured path to interview success and career acceleration
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Complete Program Roadmap
          </Badge>
        </div>

        {/* Roadmap */}
        <div className="space-y-6 mb-12">
          {roadmapWeeks.map((week, index) => (
            <div key={week.week} className="relative">
              {/* Connecting Line */}
              {index < roadmapWeeks.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-primary/50 to-primary/20 z-0" />
              )}
              
              <Card className="relative z-10 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/30 hover:border-l-primary">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {week.week}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{week.icon}</span>
                        <CardTitle className="text-xl text-foreground">
                          Week {week.week}: {week.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        {week.description}
                      </CardDescription>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>

        {/* Ongoing Support Section */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <HeartHandshake className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-green-800 mb-2">
              Ongoing Mentor Support
            </CardTitle>
            <CardDescription className="text-lg text-green-700">
              Your journey doesn't end at Week 8
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-white/60 rounded-lg p-6 mb-6">
              <p className="text-lg text-green-800 font-medium mb-4">
                🎯 <strong>Continuous Support Until You Land Your Dream Job</strong>
              </p>
              <p className="text-green-700 leading-relaxed">
                After completing the 8-week program, you'll continue to receive personalized mentor support, 
                interview coaching, and career guidance until you successfully secure your ideal position. 
                We're committed to your success every step of the way.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/40 rounded-lg p-4">
                <div className="text-2xl mb-2">📞</div>
                <div className="font-medium text-green-800">Regular Check-ins</div>
                <div className="text-green-600">Weekly progress calls</div>
              </div>
              <div className="bg-white/40 rounded-lg p-4">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-medium text-green-800">Interview Prep</div>
                <div className="text-green-600">Mock interviews & feedback</div>
              </div>
              <div className="bg-white/40 rounded-lg p-4">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-medium text-green-800">Job Search Support</div>
                <div className="text-green-600">Application reviews & strategy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-12 text-center space-y-4">
          <h3 className="text-xl font-semibold text-foreground mb-6">Ready to Start Your Journey?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/mentors">
              <Button size="lg" className="w-full sm:w-auto">
                <Users className="w-5 h-5 mr-2" />
                Meet Your Mentors
              </Button>
            </Link>
            <Link to="/booking/mentor-1">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule First Session
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Award className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JourneyPage