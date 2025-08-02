import { createContext } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { UserProfile } from './supabase'

export interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  session: Session | null
  isLoading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)