import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, Target, BookOpen } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
// import { supabase } from '@/lib/supabase' // Not used in this simplified version

const activities = [
  {
    id: 'skills-assessment',
    title: 'Complete Skills Assessment Quiz',
    description: 'Evaluate your current technical and soft skills to identify areas for improvement',
    estimatedTime: '30 minutes'
  },
  {
    id: 'goal-setting',
    title: 'Set Interview Goals and Timeline',
    description: 'Define specific, measurable goals for your interview preparation journey',
    estimatedTime: '20 minutes'
  },
  {
    id: 'resume-review',
    title: 'Review Current Resume',
    description: 'Analyze your existing resume for strengths and areas that need improvement',
    estimatedTime: '45 minutes',
    serviceId: 'resume-review'
  },
  {
    id: 'target-companies',
    title: 'Identify Target Companies',
    description: 'Research and create a list of companies you want to work for',
    estimatedTime: '60 minutes'
  },
  {
    id: 'action-plan',
    title: 'Create Action Plan',
    description: 'Develop a detailed plan for the next 8 weeks of interview preparation',
    estimatedTime: '40 minutes'
  }
]

export default function Week1Page() {
  const { user } = useAuth()
  const [completedActivities, setCompletedActivities] = useState<string[]>([])
  const [isWeekComplete, setIsWeekComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const loadProgress = useCallback(async () => {
    if (!user) return
    
    try {
      // Load completed activities from localStorage for now
      const saved = localStorage.getItem(`week1-progress-${user.id}`)
      if (saved) {
        const progress = JSON.parse(saved)
        setCompletedActivities(progress.completedActivities || [])
        setIsWeekComplete(progress.isWeekComplete || false)
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      loadProgress()
    }
  }, [user, loadProgress])

  const saveProgress = useCallback((activities: string[], weekComplete: boolean) => {
    if (!user) return
    
    const progress = {
      completedActivities: activities,
      isWeekComplete: weekComplete
    }
    localStorage.setItem(`week1-progress-${user.id}`, JSON.stringify(progress))
  }, [user])

  const handleActivityToggle = async (activityId: string, completed: boolean) => {
    if (!user) return
    
    try {
      let newCompleted: string[]
      if (completed) {
        newCompleted = [...completedActivities, activityId]
      } else {
        newCompleted = completedActivities.filter(id => id !== activityId)
      }
      
      setCompletedActivities(newCompleted)
      saveProgress(newCompleted, isWeekComplete)
    } catch (error) {
      console.error('Error updating activity:', error)
    }
  }

  const handleMarkWeekComplete = async () => {
    if (!user) return
    
    try {
      setIsWeekComplete(true)
      saveProgress(completedActivities, true)
    } catch (error) {
      console.error('Error marking week complete:', error)
    }
  }

  const getActivityProgress = (activityId: string) => {
    return completedActivities.includes(activityId)
  }

  const isServiceCompleted = (serviceId: string) => {
    const completedServices = JSON.parse(localStorage.getItem('completedServices') || '[]')
    return completedServices.includes(serviceId)
  }

  const completedCount = activities.filter(activity => 
    getActivityProgress(activity.id)
  ).length

  const progressPercentage = (completedCount / activities.length) * 100
  const canCompleteWeek = completedCount === activities.length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading week content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Week 1: Foundation & Self-Assessment</h1>
              <p className="text-gray-600">Build a strong foundation for your interview preparation journey</p>
            </div>
          </div>
          
          {isWeekComplete && (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-1" />
              Week Completed
            </Badge>
          )}
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Week Progress</span>
            </CardTitle>
            <CardDescription>
              Complete all activities to unlock the next week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {completedCount} of {activities.length} activities completed
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              
              {canCompleteWeek && !isWeekComplete && (
                <Button 
                  onClick={handleMarkWeekComplete}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Week 1 Complete
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Activities */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Activities</h2>
          
          {activities.map((activity, index) => {
            const isCompleted = getActivityProgress(activity.id)
            const hasServiceId = 'serviceId' in activity
            const serviceCompleted = hasServiceId ? isServiceCompleted((activity as any).serviceId) : false
            
            return (
              <Card key={activity.id} className={`${isCompleted ? 'border-green-200 bg-green-50' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={(checked) => 
                          handleActivityToggle(activity.id, checked as boolean)
                        }
                        className="w-5 h-5"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-semibold ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                          {index + 1}. {activity.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.estimatedTime}
                          </Badge>
                          {serviceCompleted && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Service Booked
                            </Badge>
                          )}
                          {isCompleted && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complete
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className={`${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                        {activity.description}
                      </p>
                      
                      {hasServiceId && !serviceCompleted && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3 mr-2"
                          onClick={() => window.location.href = '/mentors?service=' + (activity as any).serviceId}
                        >
                          Book Service
                        </Button>
                      )}
                      
                      {!isCompleted && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3"
                          onClick={() => handleActivityToggle(activity.id, true)}
                        >
                          Mark as Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Week Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Week 1 Summary</CardTitle>
            <CardDescription>What you'll accomplish this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Learning Objectives:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Understand your current skill level and areas for improvement</li>
                  <li>• Set clear, achievable goals for your interview preparation</li>
                  <li>• Identify target companies and roles that align with your career goals</li>
                  <li>• Create a structured action plan for the next 7 weeks</li>
                  <li>• Build momentum and confidence for your interview journey</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Next Week Preview:</h4>
                <p className="text-sm text-gray-600">
                  Week 2 focuses on Resume & Application Strategy. You'll optimize your resume for ATS systems, 
                  learn to write compelling cover letters, and set up an application tracking system.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}