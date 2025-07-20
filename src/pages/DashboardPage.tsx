import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Calendar, 
  Target,
  Building2,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Application {
  id: string
  company: string
  position: string
  location: string
  status: 'applied' | 'interview' | 'rejected' | 'offer'
  appliedDate: string
  salary?: string
  notes?: string
}

interface CommunityStats {
  totalApplications: number
  averageResponseRate: number
  topCompanies: { name: string; applications: number }[]
  successRate: number
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      company: 'Google',
      position: 'Software Engineer',
      location: 'Mountain View, CA',
      status: 'interview',
      appliedDate: '2024-01-15',
      salary: '$180,000',
      notes: 'Phone screening scheduled for next week'
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'Frontend Developer',
      location: 'Seattle, WA',
      status: 'applied',
      appliedDate: '2024-01-18',
      salary: '$160,000'
    },
    {
      id: '3',
      company: 'Meta',
      position: 'Product Manager',
      location: 'Menlo Park, CA',
      status: 'rejected',
      appliedDate: '2024-01-10',
      salary: '$200,000',
      notes: 'Not a good fit for the role'
    }
  ])

  const [communityStats] = useState<CommunityStats>({
    totalApplications: 15847,
    averageResponseRate: 23.4,
    topCompanies: [
      { name: 'Google', applications: 2341 },
      { name: 'Microsoft', applications: 1987 },
      { name: 'Amazon', applications: 1756 },
      { name: 'Meta', applications: 1432 },
      { name: 'Apple', applications: 1298 }
    ],
    successRate: 18.7
  })

  const [isAddingApplication, setIsAddingApplication] = useState(false)
  const [newApplication, setNewApplication] = useState({
    company: '',
    position: '',
    location: '',
    status: 'applied' as const,
    salary: '',
    notes: ''
  })

  const weeklyProgram = [
    { week: 1, title: "Resume Review", completed: true, current: false },
    { week: 2, title: "Resume Rebuild", completed: true, current: false },
    { week: 3, title: "Portfolio Development", completed: false, current: true },
    { week: 4, title: "AI Assistant Setup", completed: false, current: false },
    { week: 5, title: "Interview Preparation", completed: false, current: false },
    { week: 6, title: "Mock Interviews", completed: false, current: false },
    { week: 7, title: "Networking & Outreach", completed: false, current: false },
    { week: 8, title: "Final Preparation", completed: false, current: false }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800'
      case 'interview': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'offer': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <Clock className="h-4 w-4" />
      case 'interview': return <AlertCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      case 'offer': return <CheckCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const addApplication = () => {
    if (newApplication.company && newApplication.position) {
      const application: Application = {
        id: Date.now().toString(),
        ...newApplication,
        appliedDate: new Date().toISOString().split('T')[0]
      }
      setApplications([...applications, application])
      setNewApplication({
        company: '',
        position: '',
        location: '',
        status: 'applied',
        salary: '',
        notes: ''
      })
      setIsAddingApplication(false)
    }
  }

  const applicationStats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'applied').length,
    interviews: applications.filter(app => app.status === 'interview').length,
    offers: applications.filter(app => app.status === 'offer').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  }

  const completedWeeks = weeklyProgram.filter(week => week.completed).length
  const progressPercentage = (completedWeeks / weeklyProgram.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Interview Journey Dashboard</h1>
          <p className="text-gray-600">Track your progress and manage your job applications</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="progress">Weekly Progress</TabsTrigger>
            <TabsTrigger value="community">Community Stats</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{applicationStats.total}</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Interviews</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{applicationStats.interviews}</div>
                  <p className="text-xs text-muted-foreground">+1 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {applicationStats.total > 0 ? Math.round(((applicationStats.interviews + applicationStats.offers) / applicationStats.total) * 100) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">Above average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Program Progress</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
                  <p className="text-xs text-muted-foreground">Week {completedWeeks + 1} of 8</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Your latest job applications and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Building2 className="h-8 w-8 text-gray-400" />
                        <div>
                          <h4 className="font-medium">{app.position}</h4>
                          <p className="text-sm text-gray-600">{app.company} • {app.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(app.status)}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1 capitalize">{app.status}</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setIsAddingApplication(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Application
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Application Tracker</h2>
              <Dialog open={isAddingApplication} onOpenChange={setIsAddingApplication}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Application
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Application</DialogTitle>
                    <DialogDescription>
                      Track a new job application you've submitted
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={newApplication.company}
                        onChange={(e) => setNewApplication({...newApplication, company: e.target.value})}
                        placeholder="e.g. Google"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={newApplication.position}
                        onChange={(e) => setNewApplication({...newApplication, position: e.target.value})}
                        placeholder="e.g. Software Engineer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newApplication.location}
                        onChange={(e) => setNewApplication({...newApplication, location: e.target.value})}
                        placeholder="e.g. San Francisco, CA"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={newApplication.status} onValueChange={(value: any) => setNewApplication({...newApplication, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="applied">Applied</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="offer">Offer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="salary">Salary (Optional)</Label>
                      <Input
                        id="salary"
                        value={newApplication.salary}
                        onChange={(e) => setNewApplication({...newApplication, salary: e.target.value})}
                        placeholder="e.g. $120,000"
                      />
                    </div>
                    <Button onClick={addApplication} className="w-full">
                      Add Application
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {applications.map((app) => (
                <Card key={app.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Building2 className="h-10 w-10 text-gray-400" />
                        <div>
                          <h3 className="font-semibold text-lg">{app.position}</h3>
                          <p className="text-gray-600">{app.company}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {app.location}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Applied {new Date(app.appliedDate).toLocaleDateString()}
                            </span>
                            {app.salary && (
                              <span className="font-medium text-green-600">{app.salary}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        {getStatusIcon(app.status)}
                        <span className="ml-1 capitalize">{app.status}</span>
                      </Badge>
                    </div>
                    {app.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{app.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>8-Week Program Progress</CardTitle>
                <CardDescription>Track your journey through our interview acceleration program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">{completedWeeks} of 8 weeks completed</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                
                <div className="grid gap-4 mt-8">
                  {weeklyProgram.map((week) => (
                    <div key={week.week} className={`p-4 border rounded-lg ${week.current ? 'border-blue-500 bg-blue-50' : week.completed ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${week.completed ? 'bg-green-500 text-white' : week.current ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {week.completed ? <CheckCircle className="h-4 w-4" /> : week.week}
                          </div>
                          <div>
                            <h4 className="font-medium">Week {week.week}: {week.title}</h4>
                            {week.current && <p className="text-sm text-blue-600">Current week</p>}
                          </div>
                        </div>
                        {week.current && (
                          <Button size="sm" onClick={() => navigate('/')}>
                            Continue
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Stats Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Community Applications</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{communityStats.totalApplications.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Total applications tracked</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{communityStats.averageResponseRate}%</div>
                  <p className="text-xs text-muted-foreground">Across all users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{communityStats.successRate}%</div>
                  <p className="text-xs text-muted-foreground">Interview to offer ratio</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Most Applied Companies</CardTitle>
                <CardDescription>See where the community is applying (anonymized data)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityStats.topCompanies.map((company, index) => (
                    <div key={company.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                        </div>
                        <span className="font-medium">{company.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(company.applications / communityStats.topCompanies[0].applications) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-16 text-right">{company.applications}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Insights</CardTitle>
                <CardDescription>Anonymized trends and patterns from our user base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Best Application Days</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Tuesday</span>
                        <span className="text-green-600">+34% response rate</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wednesday</span>
                        <span className="text-green-600">+28% response rate</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thursday</span>
                        <span className="text-green-600">+22% response rate</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Average Timeline</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Application to Response</span>
                        <span>5.2 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>First to Final Interview</span>
                        <span>12.8 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interview to Offer</span>
                        <span>3.1 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}