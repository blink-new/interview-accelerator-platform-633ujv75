import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xzhzyevxktpnzriysvmg.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6aHp5ZXZ4a3RwbnpyaXlzdm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MjE2MjgsImV4cCI6MjA2OTA5NzYyOH0.KTGSzRqAjErbGslxjLinsqnWLNlEJ8_4ZTiD0mZSf7M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: {
      getItem: (key: string) => {
        try {
          return localStorage.getItem(key)
        } catch {
          return null
        }
      },
      setItem: (key: string, value: string) => {
        try {
          localStorage.setItem(key, value)
        } catch {
          // Ignore storage errors
        }
      },
      removeItem: (key: string) => {
        try {
          localStorage.removeItem(key)
        } catch {
          // Ignore storage errors
        }
      }
    }
  },
  global: {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Database types
export interface UserProfile {
  id: string
  full_name: string
  email?: string
  avatar_url?: string
  bio?: string
  linkedin_url?: string
  github_url?: string
  created_at: string
  updated_at: string
}

export interface WeekCompletion {
  id: string
  user_id: string
  week_number: number
  completed: boolean
  completed_at: string | null
  created_at: string
}

export interface JobApplication {
  id: string
  user_id: string
  company_name: string
  position_title: string
  status: 'applied' | 'interview' | 'offer' | 'rejected'
  application_date: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Mentor {
  id: string
  name: string
  title: string
  company: string
  expertise: string[]
  bio: string
  avatar_url?: string
  rating: number
  price_per_hour: number
  available: boolean
  created_at: string
}

export interface Booking {
  id: string
  user_id: string
  mentor_id: string
  scheduled_at: string
  duration_minutes: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
}

// Simplified helper functions
export const getCompletedWeeks = async (userId: string): Promise<number[]> => {
  const { data, error } = await supabase
    .from('week_completions')
    .select('week_number')
    .eq('user_id', userId)
    .eq('completed', true)
  
  if (error) {
    console.error('Error fetching completed weeks:', error)
    return []
  }
  
  return data ? data.map(w => w.week_number) : []
}

export const markWeekComplete = async (weekNumber: number, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('week_completions')
    .upsert({
      user_id: userId,
      week_number: weekNumber,
      completed: true,
      completed_at: new Date().toISOString()
    })
  
  if (error) {
    console.error('Error marking week complete:', error)
    throw error
  }
}

export const getUserJobApplications = async (userId: string): Promise<JobApplication[]> => {
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching job applications:', error)
    return []
  }
  
  return data || []
}

export const createJobApplication = async (application: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>): Promise<JobApplication | null> => {
  const { data, error } = await supabase
    .from('job_applications')
    .insert(application)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating job application:', error)
    return null
  }
  
  return data
}

export const updateJobApplication = async (id: string, updates: Partial<JobApplication>): Promise<JobApplication | null> => {
  const { data, error } = await supabase
    .from('job_applications')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating job application:', error)
    return null
  }
  
  return data
}

export const getMentors = async (): Promise<Mentor[]> => {
  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .eq('available', true)
    .order('rating', { ascending: false })
  
  if (error) {
    console.error('Error fetching mentors:', error)
    return []
  }
  
  return data || []
}

export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      mentors (
        name,
        title,
        company,
        avatar_url
      )
    `)
    .eq('user_id', userId)
    .order('scheduled_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching bookings:', error)
    return []
  }
  
  return data || []
}

export const createBooking = async (booking: Omit<Booking, 'id' | 'created_at'>): Promise<Booking | null> => {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating booking:', error)
    return null
  }
  
  return data
}