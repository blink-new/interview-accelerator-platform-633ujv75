import React, { useState, useEffect } from 'react'
import { Users, Shield, CheckCircle, XCircle, Calendar, Mail } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Switch } from '../components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { toast } from 'sonner'
import blink from '../lib/blink'

interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
  provider: string
  createdAt: string
  lastLogin: string
  isActive: boolean
  isAdmin: boolean
}

interface AdminUser {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
}

interface AdminDashboardProps {
  user: AdminUser | null
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadUsers()
    }
  }, [user])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `https://xzhzyevxktpnzriysvmg.supabase.co/functions/v1/user-management?action=list`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${await blink.auth.getToken()}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const data = await response.json()
      
      if (data.success) {
        const formattedUsers = data.users.map((u: any) => ({
          id: u.id,
          email: u.email,
          displayName: u.display_name,
          avatarUrl: u.avatar_url,
          provider: u.provider,
          createdAt: u.created_at,
          lastLogin: u.last_login,
          isActive: u.is_active,
          isAdmin: u.is_admin
        }))
        setUsers(formattedUsers)
      } else {
        toast.error('Failed to load users')
      }
    } catch (error) {
      console.error('Error loading users:', error)
      toast.error('Error loading users')
    } finally {
      setLoading(false)
    }
  }

  const toggleUserAccess = async (userId: string, currentStatus: boolean) => {
    try {
      setUpdating(userId)
      const response = await fetch(
        `https://xzhzyevxktpnzriysvmg.supabase.co/functions/v1/user-management?action=toggle-access`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${await blink.auth.getToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            isActive: !currentStatus
          })
        }
      )

      const data = await response.json()
      
      if (data.success) {
        setUsers(users.map(u => 
          u.id === userId ? { ...u, isActive: !currentStatus } : u
        ))
        toast.success(`User access ${!currentStatus ? 'granted' : 'revoked'}`)
      } else {
        toast.error('Failed to update user access')
      }
    } catch (error) {
      console.error('Error updating user access:', error)
      toast.error('Error updating user access')
    } finally {
      setUpdating(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    return email ? email[0].toUpperCase() : 'U'
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>Please sign in to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => blink.auth.login()} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Shield className="mr-3 h-8 w-8 text-indigo-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage user access and platform settings</p>
            </div>
            <Button onClick={loadUsers} variant="outline">
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.isActive).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {users.filter(u => !u.isActive).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => {
                  const today = new Date().toDateString()
                  const userDate = new Date(u.createdAt).toDateString()
                  return today === userDate
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registered Users</CardTitle>
            <CardDescription>
              Manage user access and view registration details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>
                        {getInitials(user.displayName, user.email)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">
                          {user.displayName || user.email.split('@')[0]}
                        </h3>
                        {user.isAdmin && (
                          <Badge variant="secondary">Admin</Badge>
                        )}
                        <Badge variant={user.provider === 'google' ? 'default' : 'outline'}>
                          {user.provider}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Mail className="mr-1 h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Joined: {formatDate(user.createdAt)} • 
                        Last login: {formatDate(user.lastLogin)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Access:</span>
                      <Switch
                        checked={user.isActive}
                        onCheckedChange={() => toggleUserAccess(user.id, user.isActive)}
                        disabled={updating === user.id}
                      />
                      <span className={`text-sm font-medium ${
                        user.isActive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {user.isActive ? 'Active' : 'Blocked'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {users.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No users registered yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard