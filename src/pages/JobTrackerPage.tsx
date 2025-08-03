import React, { useState, useEffect } from 'react'
import { Plus, Search, Calendar, Building, DollarSign, Clock, Edit, Trash2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { toast } from 'sonner'
import blink from '../lib/blink'

interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
}

interface JobApplication {
  id: string
  userId: string
  companyName: string
  positionTitle: string
  applicationDate: string
  status: string
  notes: string
  createdAt: string
  updatedAt: string
}

interface JobTrackerPageProps {
  user: User
}

const JobTrackerPage: React.FC<JobTrackerPageProps> = ({ user }) => {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null)
  const [formData, setFormData] = useState({
    companyName: '',
    positionTitle: '',
    applicationDate: '',
    status: 'applied',
    notes: ''
  })

  useEffect(() => {
    loadApplications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadApplications = async () => {
    try {
      setLoading(true)
      const data = await blink.db.jobApplications.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
      
      const formattedApps = data.map((app: any) => ({
        id: app.id,
        userId: app.userId,
        companyName: app.companyName,
        positionTitle: app.positionTitle,
        applicationDate: app.applicationDate,
        status: app.status,
        notes: app.notes,
        createdAt: app.createdAt,
        updatedAt: app.updatedAt
      }))
      
      setApplications(formattedApps)
    } catch (error) {
      console.error('Error loading applications:', error)
      toast.error('Failed to load job applications')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingApp) {
        // Update existing application
        await blink.db.jobApplications.update(editingApp.id, {
          companyName: formData.companyName,
          positionTitle: formData.positionTitle,
          applicationDate: formData.applicationDate,
          status: formData.status,
          notes: formData.notes,
          updatedAt: new Date().toISOString()
        })
        
        setApplications(prev => prev.map(app => 
          app.id === editingApp.id 
            ? { ...app, ...formData, updatedAt: new Date().toISOString() }
            : app
        ))
        
        toast.success('Application updated successfully!')
      } else {
        // Create new application
        const newApp = await blink.db.jobApplications.create({
          id: `app_${Date.now()}`,
          userId: user.id,
          companyName: formData.companyName,
          positionTitle: formData.positionTitle,
          applicationDate: formData.applicationDate,
          status: formData.status,
          notes: formData.notes,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        
        setApplications(prev => [newApp, ...prev])
        toast.success('Application added successfully!')
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving application:', error)
      toast.error('Failed to save application')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await blink.db.jobApplications.delete(id)
      setApplications(prev => prev.filter(app => app.id !== id))
      toast.success('Application deleted successfully!')
    } catch (error) {
      console.error('Error deleting application:', error)
      toast.error('Failed to delete application')
    }
  }

  const resetForm = () => {
    setFormData({
      companyName: '',
      positionTitle: '',
      applicationDate: '',
      status: 'applied',
      notes: ''
    })
    setEditingApp(null)
    setIsAddDialogOpen(false)
  }

  const openEditDialog = (app: JobApplication) => {
    setEditingApp(app)
    setFormData({
      companyName: app.companyName,
      positionTitle: app.positionTitle,
      applicationDate: app.applicationDate,
      status: app.status,
      notes: app.notes
    })
    setIsAddDialogOpen(true)
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.positionTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800'
      case 'interview': return 'bg-yellow-100 text-yellow-800'
      case 'offer': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'applied').length,
    interview: applications.filter(app => app.status === 'interview').length,
    offers: applications.filter(app => app.status === 'offer').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Tracker</h1>
            <p className="text-gray-600">Track your job applications and interview progress</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Application
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingApp ? 'Edit Application' : 'Add New Application'}</DialogTitle>
                <DialogDescription>
                  {editingApp ? 'Update your job application details.' : 'Add a new job application to track your progress.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="positionTitle">Position Title</Label>
                  <Input
                    id="positionTitle"
                    value={formData.positionTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, positionTitle: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="applicationDate">Application Date</Label>
                  <Input
                    id="applicationDate"
                    type="date"
                    value={formData.applicationDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, applicationDate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Add any notes about this application..."
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingApp ? 'Update' : 'Add'} Application
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Applied</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.applied}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.interview}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Offers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.offers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search companies or positions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <Card key={app.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{app.positionTitle}</h3>
                        <p className="text-gray-600">{app.companyName}</p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        Applied: {new Date(app.applicationDate).toLocaleDateString()}
                      </div>
                      {app.notes && (
                        <div className="flex items-center">
                          <span className="truncate max-w-xs">{app.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(app)}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first job application.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <div className="mt-6">
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Application
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default JobTrackerPage