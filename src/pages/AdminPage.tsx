import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Users, Shield, Trash2, Loader2, UserX, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Navigate } from "react-router-dom"

interface UserProfile {
  id: string
  full_name: string
  email: string
  role: string
  created_at: string
  avatar_url?: string
  journey_completion: number
  completed_weeks: number
  is_active: boolean
}

export default function AdminPage() {
  const { user, userProfile } = useAuth()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  // Check if user is admin
  const isAdmin = user && userProfile?.role === 'admin'

  const fetchUsersWithProgress = async () => {
    try {
      // First get all users
      const { data: usersData, error: usersError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (usersError) throw usersError

      // Then get completion data for each user
      const usersWithProgress = await Promise.all(
        (usersData || []).map(async (user) => {
          const { data: completions, error: completionsError } = await supabase
            .from('week_completions')
            .select('week_number, completed')
            .eq('user_id', user.id)
            .eq('completed', true)

          if (completionsError) {
            console.error('Error fetching completions for user:', user.id, completionsError)
          }

          const completedWeeks = completions?.length || 0
          const journeyCompletion = Math.round((completedWeeks / 8) * 100) // 8 weeks total

          return {
            ...user,
            completed_weeks: completedWeeks,
            journey_completion: journeyCompletion,
            is_active: user.role !== 'deactivated'
          }
        })
      )

      setUsers(usersWithProgress)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to load users')
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await fetchUsersWithProgress()
      setLoading(false)
    }
    loadData()
  }, [])

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error
      toast.success('User role updated successfully!')
      fetchUsersWithProgress()
    } catch (error) {
      console.error('Error updating user role:', error)
      toast.error('Failed to update user role')
    }
  }

  const handleRevokeAccess = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ role: 'deactivated' })
        .eq('id', userId)

      if (error) throw error
      toast.success('User access revoked successfully!')
      fetchUsersWithProgress()
    } catch (error) {
      console.error('Error revoking user access:', error)
      toast.error('Failed to revoke user access')
    }
  }

  const handleRestoreAccess = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ role: 'user' })
        .eq('id', userId)

      if (error) throw error
      toast.success('User access restored successfully!')
      fetchUsersWithProgress()
    } catch (error) {
      console.error('Error restoring user access:', error)
      toast.error('Failed to restore user access')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      // Delete user's week completions first
      await supabase
        .from('week_completions')
        .delete()
        .eq('user_id', userId)

      // Delete user profile
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', userId)

      if (error) throw error
      toast.success('User deleted successfully!')
      fetchUsersWithProgress()
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  }

  const getStats = () => {
    const totalUsers = users.length
    const activeUsers = users.filter(u => u.is_active).length
    const adminUsers = users.filter(u => u.role === 'admin').length
    const deactivatedUsers = users.filter(u => u.role === 'deactivated').length
    const avgCompletion = users.length > 0 
      ? Math.round(users.reduce((sum, u) => sum + u.journey_completion, 0) / users.length)
      : 0

    return { totalUsers, activeUsers, adminUsers, deactivatedUsers, avgCompletion }
  }

  const stats = getStats()

  // Check if user is admin after all hooks are called
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Shield className="h-8 w-8 text-blue-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Manage users and monitor journey progress</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                All registered users
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                Users with access
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.adminUsers}</div>
              <p className="text-xs text-muted-foreground">
                Admin users
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deactivated</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.deactivatedUsers}</div>
              <p className="text-xs text-muted-foreground">
                Revoked access
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgCompletion}%</div>
              <p className="text-xs text-muted-foreground">
                Journey completion
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Management Table */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage user accounts, roles, and track journey progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Journey Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.full_name || 'Anonymous'}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          user.role === 'admin' ? 'default' : 
                          user.role === 'deactivated' ? 'destructive' : 
                          'secondary'
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>{user.completed_weeks}/8 weeks</span>
                            <span className="font-medium">{user.journey_completion}%</span>
                          </div>
                          <Progress value={user.journey_completion} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.is_active ? 'outline' : 'destructive'}>
                          {user.is_active ? 'Active' : 'Deactivated'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {user.role !== 'deactivated' && (
                            <Select
                              value={user.role}
                              onValueChange={(newRole) => handleUpdateUserRole(user.id, newRole)}
                              disabled={user.id === userProfile?.id}
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                          
                          {user.role === 'deactivated' ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRestoreAccess(user.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Restore
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevokeAccess(user.id)}
                              disabled={user.id === userProfile?.id}
                              className="text-orange-600 hover:text-orange-700"
                            >
                              <UserX className="h-4 w-4" />
                              Revoke
                            </Button>
                          )}
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={user.id === userProfile?.id}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to permanently delete this user? This will remove all their data including journey progress. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete User
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}