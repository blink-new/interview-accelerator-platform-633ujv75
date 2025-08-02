import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xzhzyevxktpnzriysvmg.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6aHp5ZXZ4a3RwbnpyaXlzdm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MjE2MjgsImV4cCI6MjA2OTA5NzYyOH0.KTGSzRqAjErbGslxjLinsqnWLNlEJ8_4ZTiD0mZSf7M'

// Create optimized Supabase client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'Cache-Control': 'no-cache'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 2 // Reduced for better performance
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
  role?: string
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

// Optimized helper functions with proper error handling and caching
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 30000 // 30 seconds

const getCachedData = (key: string) => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() })
}

export const getCompletedWeeks = async (userId: string): Promise<number[]> => {
  if (!userId) return []
  
  const cacheKey = `completed_weeks_${userId}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached
  
  try {
    const { data, error } = await supabase
      .from('week_completions')
      .select('week_number')
      .eq('user_id', userId)
      .eq('completed', true)
    
    if (error) {
      console.error('Error fetching completed weeks:', error)
      return []
    }
    
    const result = data ? data.map(w => w.week_number) : []
    setCachedData(cacheKey, result)
    return result
  } catch (error) {
    console.error('Error in getCompletedWeeks:', error)
    return []
  }
}

export const markWeekComplete = async (weekNumber: number, userId: string): Promise<void> => {
  if (!userId || !weekNumber) return
  
  try {
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
    
    // Clear cache for this user
    cache.delete(`completed_weeks_${userId}`)
  } catch (error) {
    console.error('Error in markWeekComplete:', error)
    throw error
  }
}

export const getUserJobApplications = async (userId: string): Promise<JobApplication[]> => {
  if (!userId) return []
  
  const cacheKey = `job_applications_${userId}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached
  
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching job applications:', error)
      return []
    }
    
    const result = data || []
    setCachedData(cacheKey, result)
    return result
  } catch (error) {
    console.error('Error in getUserJobApplications:', error)
    return []
  }
}

export const createJobApplication = async (application: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>): Promise<JobApplication | null> => {
  if (!application.user_id) return null
  
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .insert(application)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating job application:', error)
      return null
    }
    
    // Clear cache for this user
    cache.delete(`job_applications_${application.user_id}`)
    return data
  } catch (error) {
    console.error('Error in createJobApplication:', error)
    return null
  }
}

export const updateJobApplication = async (id: string, updates: Partial<JobApplication>): Promise<JobApplication | null> => {
  if (!id) return null
  
  try {
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
    
    // Clear cache for this user if we have user_id
    if (data?.user_id) {
      cache.delete(`job_applications_${data.user_id}`)
    }
    return data
  } catch (error) {
    console.error('Error in updateJobApplication:', error)
    return null
  }
}

export const getMentors = async (): Promise<Mentor[]> => {
  const cacheKey = 'mentors_available'
  const cached = getCachedData(cacheKey)
  if (cached) return cached
  
  try {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .eq('available', true)
      .order('rating', { ascending: false })
    
    if (error) {
      console.error('Error fetching mentors:', error)
      return []
    }
    
    const result = data || []
    setCachedData(cacheKey, result)
    return result
  } catch (error) {
    console.error('Error in getMentors:', error)
    return []
  }
}

export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  if (!userId) return []
  
  const cacheKey = `bookings_${userId}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached
  
  try {
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
    
    const result = data || []
    setCachedData(cacheKey, result)
    return result
  } catch (error) {
    console.error('Error in getUserBookings:', error)
    return []
  }
}

export const createBooking = async (booking: Omit<Booking, 'id' | 'created_at'>): Promise<Booking | null> => {
  if (!booking.user_id) return null
  
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating booking:', error)
      return null
    }
    
    // Clear cache for this user
    cache.delete(`bookings_${booking.user_id}`)
    return data
  } catch (error) {
    console.error('Error in createBooking:', error)
    return null
  }
}