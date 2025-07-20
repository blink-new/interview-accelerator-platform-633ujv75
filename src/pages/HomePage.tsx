import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Target, 
  Users, 
  Calendar, 
  TrendingUp, 
  Star,
  CheckCircle,
  Clock,
  Award,
  Zap
} from 'lucide-react'

const HomePage = () => {
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null)

  const journeyTypes = [
    {
      id: 'career-transition',
      title: 'Career Transition',
      description: 'Switch careers with confidence',
      duration: '8 weeks',
      mentors: 24,
      color: 'from-blue-500 to-purple-600',
      icon: TrendingUp
    },
    {
      id: 'leadership',
      title: 'Leadership Development',
      description: 'Build executive presence',
      duration: '8 weeks',
      mentors: 18,
      color: 'from-purple-500 to-pink-600',
      icon: Award
    },
    {
      id: 'entrepreneurship',
      title: 'Startup Founder',
      description: 'Launch your business idea',
      duration: '8 weeks',
      mentors: 32,
      color: 'from-orange-500 to-red-600',
      icon: Zap
    }
  ]

  const features = [
    {
      icon: Target,
      title: '8-Week Structured Journey',
      description: 'Follow a proven path with weekly milestones and clear objectives'
    },
    {
      icon: Users,
      title: 'Expert Mentor Matching',
      description: 'Connect with industry leaders who align with your goals'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule with real-time availability'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your growth with detailed analytics and milestone tracking'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager at Google',
      content: 'MentorPath helped me transition from engineering to product management in just 8 weeks.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Marcus Johnson',
      role: 'Startup Founder',
      content: 'The structured approach and mentor quality exceeded my expectations.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'VP of Engineering',
      content: 'Best investment I made in my career. The mentors are world-class.',
      rating: 5,
      avatar: '👩‍🔬'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              🚀 Launch Your 8-Week Journey
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Accelerate Your Career with
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {' '}Expert Mentors
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who've transformed their careers through our 
              structured 8-week mentorship journeys with industry leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/journey">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-white">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/mentors">
                <Button size="lg" variant="outline">
                  Browse Mentors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select from our curated 8-week programs designed for specific career goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {journeyTypes.map((journey) => {
              const Icon = journey.icon
              return (
                <Card 
                  key={journey.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedJourney === journey.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedJourney(journey.id)}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${journey.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{journey.title}</CardTitle>
                    <CardDescription>{journey.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {journey.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {journey.mentors} mentors
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why MentorPath Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our proven methodology combines structure, expertise, and flexibility
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how our mentorship journeys have transformed careers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-2">{testimonial.avatar}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of professionals who've accelerated their growth with MentorPath
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/journey">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Start Your 8-Week Journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/mentors">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Meet Our Mentors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage