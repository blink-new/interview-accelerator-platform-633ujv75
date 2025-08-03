import React, { useState } from 'react'
import { CheckCircle, Target, Calendar, Star, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
}

interface Week1PageProps {
  user: User
}

const Week1Page: React.FC<Week1PageProps> = () => {
  const [goals, setGoals] = useState({
    shortTerm: '',
    longTerm: '',
    targetCompanies: '',
    targetRole: '',
    timeline: ''
  })
  const [completed, setCompleted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Save goals (in a real app, this would save to database)
    console.log('Career goals saved:', goals)
    setCompleted(true)
    toast.success('Career goals saved successfully!')
  }

  const tasks = [
    {
      id: 'resume',
      title: 'Complete Resume Review',
      description: 'Get AI-powered feedback on your resume',
      completed: false,
      href: '/resume-review'
    },
    {
      id: 'linkedin',
      title: 'Optimize LinkedIn Profile',
      description: 'Enhance your LinkedIn presence to attract recruiters',
      completed: false,
      href: '/linkedin-strategy'
    },
    {
      id: 'goals',
      title: 'Set Career Goals',
      description: 'Define your career objectives and timeline',
      completed: completed,
      href: '#goals'
    },
    {
      id: 'mentor',
      title: 'Book First Mentor Session',
      description: 'Connect with an expert mentor for guidance',
      completed: false,
      href: '/mentors'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Week 1: Foundation & Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your journey by building a strong foundation and setting clear career goals.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Week 1 Progress
            </CardTitle>
            <CardDescription>
              Complete these tasks to finish Week 1 of your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    task.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{task.title}</h3>
                    {task.completed && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  {!task.completed && task.href !== '#goals' && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={task.href}>
                        Start Task
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Goals Form */}
        <Card id="goals">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Set Your Career Goals
            </CardTitle>
            <CardDescription>
              Define your career objectives to create a focused job search strategy
            </CardDescription>
          </CardHeader>
          <CardContent>
            {completed ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Goals Set Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Your career goals have been saved. You can update them anytime as your priorities evolve.
                </p>
                <Button onClick={() => setCompleted(false)} variant="outline">
                  Edit Goals
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="targetRole">Target Role/Position</Label>
                  <Input
                    id="targetRole"
                    value={goals.targetRole}
                    onChange={(e) => setGoals(prev => ({ ...prev, targetRole: e.target.value }))}
                    placeholder="e.g., Senior Software Engineer, Product Manager"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="targetCompanies">Target Companies</Label>
                  <Input
                    id="targetCompanies"
                    value={goals.targetCompanies}
                    onChange={(e) => setGoals(prev => ({ ...prev, targetCompanies: e.target.value }))}
                    placeholder="e.g., Google, Meta, Apple, or startup in fintech"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="shortTerm">Short-term Goals (3-6 months)</Label>
                  <Textarea
                    id="shortTerm"
                    value={goals.shortTerm}
                    onChange={(e) => setGoals(prev => ({ ...prev, shortTerm: e.target.value }))}
                    placeholder="What do you want to achieve in the next 3-6 months?"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="longTerm">Long-term Goals (1-3 years)</Label>
                  <Textarea
                    id="longTerm"
                    value={goals.longTerm}
                    onChange={(e) => setGoals(prev => ({ ...prev, longTerm: e.target.value }))}
                    placeholder="Where do you see yourself in 1-3 years?"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="timeline">Job Search Timeline</Label>
                  <Input
                    id="timeline"
                    value={goals.timeline}
                    onChange={(e) => setGoals(prev => ({ ...prev, timeline: e.target.value }))}
                    placeholder="e.g., 2-3 months, ASAP, flexible"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Save Career Goals
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              What's Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-indigo-600 text-sm font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">Complete Week 1 Tasks</h4>
                  <p className="text-gray-600 text-sm">Finish all remaining tasks above to unlock Week 2</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gray-600 text-sm font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">Week 2: Interview Preparation</h4>
                  <p className="text-gray-600 text-sm">Focus on behavioral questions and elevator pitch</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gray-600 text-sm font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">Week 3: Technical Skills</h4>
                  <p className="text-gray-600 text-sm">Technical interviews and portfolio building</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild>
                <a href="/journey">
                  Back to Journey Overview
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Week1Page