import React from 'react'
import { Link } from 'react-router-dom'
import { Play, BookOpen, MessageSquare, Code, Target, Clock } from 'lucide-react'
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

interface InterviewPrepPageProps {
  user: User | null
}

const InterviewPrepPage: React.FC<InterviewPrepPageProps> = ({ user }) => {
  const handleSignIn = () => {
    blink.auth.login()
  }

  const interviewTypes = [
    {
      title: 'Behavioral Interviews',
      description: 'Master the STAR method and common behavioral questions',
      icon: MessageSquare,
      href: '/behavioral-interview',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      difficulty: 'Beginner',
      duration: '30 min',
      topics: ['STAR Method', 'Leadership', 'Teamwork', 'Problem Solving']
    },
    {
      title: 'Technical Interviews',
      description: 'Practice coding problems and system design questions',
      icon: Code,
      href: '/technical-interview',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      difficulty: 'Advanced',
      duration: '60 min',
      topics: ['Data Structures', 'Algorithms', 'System Design', 'Coding']
    },
    {
      title: 'Competency Interviews',
      description: 'Demonstrate your skills and experience effectively',
      icon: Target,
      href: '/competency-interview',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      difficulty: 'Intermediate',
      duration: '45 min',
      topics: ['Skills Assessment', 'Experience', 'Achievements', 'Goals']
    },
    {
      title: 'Mock Interviews',
      description: 'Practice with realistic interview scenarios',
      icon: Play,
      href: '/mock-interview',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      difficulty: 'All Levels',
      duration: '45 min',
      topics: ['Real Practice', 'Feedback', 'Recording', 'Improvement']
    }
  ]

  const tools = [
    {
      title: 'Interview Cheatsheet',
      description: 'Quick reference guide for common interview questions',
      icon: BookOpen,
      href: '/interview-cheatsheet',
      badge: 'Reference'
    },
    {
      title: 'Elevator Pitch Builder',
      description: 'Craft the perfect 30-second introduction',
      icon: MessageSquare,
      href: '/elevator-pitch',
      badge: 'Builder'
    },
    {
      title: 'AI Interview Assistant',
      description: 'Get personalized interview preparation with AI',
      icon: Target,
      href: '/ai-assistant',
      badge: 'AI Powered'
    }
  ]

  const tips = [
    {
      title: 'Research the Company',
      description: 'Understand their mission, values, and recent news',
      icon: '🔍'
    },
    {
      title: 'Prepare Questions',
      description: 'Have thoughtful questions ready about the role and company',
      icon: '❓'
    },
    {
      title: 'Practice Out Loud',
      description: 'Rehearse your answers verbally, not just in your head',
      icon: '🗣️'
    },
    {
      title: 'Dress Appropriately',
      description: 'Choose professional attire that fits the company culture',
      icon: '👔'
    },
    {
      title: 'Arrive Early',
      description: 'Plan to arrive 10-15 minutes before your scheduled time',
      icon: '⏰'
    },
    {
      title: 'Follow Up',
      description: 'Send a thank-you email within 24 hours',
      icon: '📧'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Interview Preparation Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master every type of interview with our comprehensive preparation tools and practice sessions.
          </p>
        </div>

        {/* Interview Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Interview Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interviewTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 ${type.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <type.icon className={`h-6 w-6 ${type.color}`} />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <Badge variant="outline">{type.difficulty}</Badge>
                  </div>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-2 h-4 w-4" />
                      {type.duration}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Topics Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        {type.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {user ? (
                      <Button className="w-full" asChild>
                        <Link to={type.href}>Start Practice</Link>
                      </Button>
                    ) : (
                      <Button onClick={handleSignIn} className="w-full">
                        Sign In to Start
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Preparation Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <tool.icon className="h-8 w-8 text-indigo-600" />
                    <Badge variant="secondary">{tool.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {tool.description}
                  </CardDescription>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={tool.href}>Use Tool</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Interview Success Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{tip.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16 bg-white rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Success Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">94%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">3.2x</div>
              <div className="text-gray-600">Faster Interviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">10k+</div>
              <div className="text-gray-600">Practice Sessions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Companies</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Ace Your Interviews?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Start with our comprehensive interview preparation program and land your dream job.
          </p>
          {user ? (
            <Button variant="secondary" size="lg" asChild>
              <Link to="/journey">Start Your Journey</Link>
            </Button>
          ) : (
            <Button onClick={handleSignIn} variant="secondary" size="lg">
              Get Started Now
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InterviewPrepPage