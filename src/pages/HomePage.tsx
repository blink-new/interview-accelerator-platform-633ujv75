import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Users, Calendar, Target, CheckCircle, Play, BookOpen, MessageSquare, TrendingUp } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import blink from '../lib/blink'

interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
}

interface HomePageProps {
  user: User | null
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
  const handleGetStarted = () => {
    if (user) {
      // User is logged in, redirect to journey
      window.location.href = '/journey'
    } else {
      // User not logged in, trigger sign in
      blink.auth.login()
    }
  }

  const features = [
    {
      icon: Target,
      title: '8-Week Structured Journey',
      description: 'Follow our proven step-by-step program designed to land interviews faster',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Connect with industry professionals from top companies like Google, Meta, Apple',
      color: 'text-green-600'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Book 1-on-1 sessions that fit your schedule with real-time availability',
      color: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics and milestone tracking',
      color: 'text-orange-600'
    }
  ]

  const tools = [
    {
      title: 'AI-Powered Resume Review',
      description: 'Get instant feedback on your resume with AI analysis and optimization suggestions',
      icon: CheckCircle,
      href: '/resume-review',
      badge: 'AI Powered'
    },
    {
      title: 'Mock Interview Practice',
      description: 'Practice with realistic interview scenarios and get detailed feedback',
      icon: Play,
      href: '/mock-interview',
      badge: 'Interactive'
    },
    {
      title: 'Interview Preparation Hub',
      description: 'Access comprehensive guides for behavioral, technical, and competency interviews',
      icon: BookOpen,
      href: '/interview-prep',
      badge: 'Complete Guide'
    },
    {
      title: 'LinkedIn Strategy Optimizer',
      description: 'Optimize your LinkedIn profile to attract recruiters and hiring managers',
      icon: MessageSquare,
      href: '/linkedin-strategy',
      badge: 'Strategy'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      content: 'MentorPath helped me land my dream job at Google. The 8-week journey was exactly what I needed!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Product Manager at Meta',
      content: 'The mentorship sessions were invaluable. My mentor helped me prepare for every aspect of the interview process.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'UX Designer at Apple',
      content: 'From resume review to portfolio optimization, MentorPath covered everything I needed to succeed.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      rating: 5
    }
  ]

  const stats = [
    { label: 'Success Rate', value: '94%' },
    { label: 'Average Time to Interview', value: '3.2 weeks' },
    { label: 'Mentor Sessions Completed', value: '10,000+' },
    { label: 'Companies Hiring Our Users', value: '500+' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Land Your Dream Job
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                3x Faster
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who've accelerated their careers with our proven 8-week journey. 
              Get personalized mentorship, AI-powered tools, and land interviews at top companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3" asChild>
                <Link to="/mentors">Meet Our Mentors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MentorPath?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines expert mentorship with cutting-edge AI tools 
              to accelerate your job search and interview success.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Tools at Your Fingertips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access our suite of AI-powered tools designed to optimize every aspect of your job search.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <tool.icon className="h-8 w-8 text-indigo-600" />
                    <Badge variant="secondary">{tool.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">
                    {tool.description}
                  </CardDescription>
                  <Button variant="outline" asChild>
                    <Link to={tool.href}>
                      Try Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from professionals who've transformed their careers with MentorPath.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who've landed their dream jobs with MentorPath. 
            Start your 8-week journey today.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 py-3"
          >
            Start Your Journey Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default HomePage