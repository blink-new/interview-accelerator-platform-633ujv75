import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Plus, Briefcase, Calendar, MapPin, DollarSign, Trophy, TrendingUp, Users, Target, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { memoryManager, requestManager, useMemoryCleanup } from "@/lib/memoryManager"

interface JobApplication {
  id: string
  user_id: string
  company_name: string
  job_title: string
  job_url?: string
  location?: string
  salary_range?: string
  application_date: string
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
  notes?: string
  created_at: string
  updated_at: string
}

interface LeaderboardEntry {
  user_id: string
  user_email: string
  total_applications: number
  interviews: number
  offers: number
  success_rate: number
  rank: number
}

export default function JobTrackerPage() {
  const { user } = useAuth()
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const componentMountedRef = useRef(true)
  const cleanup = useMemoryCleanup()

  const [formData, setFormData] = useState({
    company_name: '',
    job_title: '',
    job_url: '',
    location: '',
    salary_range: '',
    status: 'applied' as const,
    notes: ''
  })

  const statusColors = {
    applied: 'bg-blue-100 text-blue-800',
    screening: 'bg-yellow-100 text-yellow-800',
    interview: 'bg-purple-100 text-purple-800',
    offer: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    withdrawn: 'bg-gray-100 text-gray-800'
  }

  const statusLabels = {
    applied: 'Applied',
    screening: 'Screening',
    interview: 'Interview',
    offer: 'Offer',
    rejected: 'Rejected',
    withdrawn: 'Withdrawn'
  }

  const fetchApplications = useCallback(async () => {
    if (!user || !componentMountedRef.current) return
    
    const cacheKey = `job-applications-${user.id}`
    
    // Check cache first
    const cachedData = memoryManager.get(cacheKey)
    if (cachedData && componentMountedRef.current) {
      setApplications(cachedData)
      setLoading(false)
      return
    }
    
    try {
      // Get abort controller for this request
      const controller = requestManager.getController('job-applications')
      
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .abortSignal(controller.signal)

      // Clean up the request
      requestManager.cleanup('job-applications')
      
      if (!componentMountedRef.current) return
      
      if (error) throw error
      
      const applications = data || []
      
      // Cache the result
      memoryManager.set(cacheKey, applications, 3 * 60 * 1000) // Cache for 3 minutes
      
      if (componentMountedRef.current) {
        setApplications(applications)
      }
    } catch (error) {
      if (!componentMountedRef.current) return
      
      // Ignore aborted requests
      if (error instanceof Error && error.name === 'AbortError') {
        return
      }
      
      console.error('Error fetching applications:', error)
      toast.error('Failed to load applications')
    } finally {
      if (componentMountedRef.current) {
        setLoading(false)
      }
    }
  }, [user])

  const fetchLeaderboard = async () => {
    if (!componentMountedRef.current) return
    
    const cacheKey = 'job-applications-leaderboard'
    
    // Check cache first
    const cachedData = memoryManager.get(cacheKey)
    if (cachedData && componentMountedRef.current) {
      setLeaderboard(cachedData)
      return
    }
    
    try {
      // Get abort controller for this request
      const controller = requestManager.getController('leaderboard')
      
      const { data, error } = await supabase
        .from('job_applications_leaderboard')
        .select('*')
        .order('total_applications', { ascending: false })
        .limit(10)
        .abortSignal(controller.signal)

      // Clean up the request
      requestManager.cleanup('leaderboard')
      
      if (!componentMountedRef.current) return
      
      if (error) throw error
      
      const leaderboard = data || []
      
      // Cache the result
      memoryManager.set(cacheKey, leaderboard, 5 * 60 * 1000) // Cache for 5 minutes
      
      if (componentMountedRef.current) {
        setLeaderboard(leaderboard)
      }
    } catch (error) {
      if (!componentMountedRef.current) return
      
      // Ignore aborted requests
      if (error instanceof Error && error.name === 'AbortError') {
        return
      }
      
      console.error('Error fetching leaderboard:', error)
    }
  }

  useEffect(() => {
    if (user && componentMountedRef.current) {
      fetchApplications()
      fetchLeaderboard()
    }
  }, [user, fetchApplications])

  // Component cleanup
  useEffect(() => {
    return () => {
      componentMountedRef.current = false
      requestManager.cancel('job-applications')
      requestManager.cancel('leaderboard')
      cleanup()
    }
  }, [cleanup])

  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Cancel pending requests when page is hidden
        requestManager.cancel('job-applications')
        requestManager.cancel('leaderboard')
      } else if (user && componentMountedRef.current) {
        // Check if we need to refresh data when page becomes visible
        const appCacheKey = `job-applications-${user.id}`
        const leaderboardCacheKey = 'job-applications-leaderboard'
        
        const cachedApps = memoryManager.get(appCacheKey)
        const cachedLeaderboard = memoryManager.get(leaderboardCacheKey)
        
        if (!cachedApps || !cachedLeaderboard) {
          // Only reload if we don't have cached data
          setTimeout(() => {
            if (componentMountedRef.current) {
              if (!cachedApps) fetchApplications()
              if (!cachedLeaderboard) fetchLeaderboard()
            }
          }, 1000)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [user, fetchApplications])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const applicationData = {
        ...formData,
        user_id: user.id,
        application_date: new Date().toISOString().split('T')[0]
      }

      if (editingApplication) {
        const { error } = await supabase
          .from('job_applications')
          .update(applicationData)
          .eq('id', editingApplication.id)

        if (error) throw error
        toast.success('Application updated successfully!')
      } else {
        const { error } = await supabase
          .from('job_applications')
          .insert([applicationData])

        if (error) throw error
        toast.success('Application added successfully!')
      }

      setFormData({
        company_name: '',
        job_title: '',
        job_url: '',
        location: '',
        salary_range: '',
        status: 'applied',
        notes: ''
      })
      setIsAddDialogOpen(false)
      setEditingApplication(null)
      fetchApplications()
      fetchLeaderboard()
    } catch (error) {
      console.error('Error saving application:', error)
      toast.error('Failed to save application')
    }
  }

  const handleEdit = (application: JobApplication) => {
    setEditingApplication(application)
    setFormData({
      company_name: application.company_name,
      job_title: application.job_title,
      job_url: application.job_url || '',
      location: application.location || '',
      salary_range: application.salary_range || '',
      status: application.status,
      notes: application.notes || ''
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return

    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast.success('Application deleted successfully!')
      fetchApplications()
      fetchLeaderboard()
    } catch (error) {
      console.error('Error deleting application:', error)
      toast.error('Failed to delete application')
    }
  }

  const getStats = () => {
    const total = applications.length
    const interviews = applications.filter(app => ['interview', 'offer'].includes(app.status)).length
    const offers = applications.filter(app => app.status === 'offer').length
    const successRate = total > 0 ? Math.round((offers / total) * 100) : 0

    return { total, interviews, offers, successRate }
  }

  const stats = getStats()
  const userRank = leaderboard.findIndex(entry => entry.user_id === user?.id) + 1

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your job applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Application Tracker</h1>
              <p className="text-gray-600">Track your applications and compete with other job seekers</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Application
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingApplication ? 'Edit Application' : 'Add New Application'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingApplication ? 'Update your job application details' : 'Add a new job application to track your progress'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company_name">Company Name *</Label>
                      <Input
                        id="company_name"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        placeholder="e.g. Google"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="job_title">Job Title *</Label>
                      <Input
                        id="job_title"
                        value={formData.job_title}
                        onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                        placeholder="e.g. Software Engineer"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="job_url">Job URL</Label>
                    <Input
                      id="job_url"
                      type="url"
                      value={formData.job_url}
                      onChange={(e) => setFormData({ ...formData, job_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. San Francisco, CA"
                      />
                    </div>
                    <div>
                      <Label htmlFor="salary_range">Salary Range</Label>
                      <Input
                        id="salary_range"
                        value={formData.salary_range}
                        onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                        placeholder="e.g. $120k - $150k"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="screening">Screening</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="withdrawn">Withdrawn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any additional notes..."
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => {
                      setIsAddDialogOpen(false)
                      setEditingApplication(null)
                      setFormData({
                        company_name: '',
                        job_title: '',
                        job_url: '',
                        location: '',
                        salary_range: '',
                        status: 'applied',
                        notes: ''
                      })
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingApplication ? 'Update' : 'Add'} Application
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Applications submitted
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.interviews}</div>
              <p className="text-xs text-muted-foreground">
                Interview opportunities
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offers</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.offers}</div>
              <p className="text-xs text-muted-foreground">
                Job offers received
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                Offer conversion rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Your Job Applications</CardTitle>
                <CardDescription>
                  Track and manage all your job applications in one place
                </CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600 mb-4">Start tracking your job applications to see your progress</p>
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Application
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.company_name}</TableCell>
                            <TableCell>{app.job_title}</TableCell>
                            <TableCell>{app.location || '-'}</TableCell>
                            <TableCell>
                              <Badge className={statusColors[app.status]}>
                                {statusLabels[app.status]}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(app.application_date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(app)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(app.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Job Search Leaderboard
                </CardTitle>
                <CardDescription>
                  See how you rank against other job seekers on the platform
                  {userRank > 0 && (
                    <span className="block mt-1 font-medium text-blue-600">
                      Your current rank: #{userRank}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {leaderboard.length === 0 ? (
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No data yet</h3>
                    <p className="text-gray-600">Be the first to add applications and claim the top spot!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={entry.user_id}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          entry.user_id === user?.id ? 'bg-blue-50 border-blue-200' : 'bg-white'
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
                              {entry.user_id === user?.id ? 'You' : entry.user_email.split('@')[0]}
                            </p>
                            <p className="text-sm text-gray-600">
                              {entry.total_applications} applications • {entry.interviews} interviews • {entry.offers} offers
                            </p>
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
}