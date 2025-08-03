import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import blink from './lib/blink'

// Components
import Navbar from './components/layout/Navbar'
import ErrorBoundary from './components/ErrorBoundary'

// Pages
import HomePage from './pages/HomePage'
import JourneyPage from './pages/JourneyPage'
import MentorsPage from './pages/MentorsPage'
import BookingPage from './pages/BookingPage'
import InterviewPrepPage from './pages/InterviewPrepPage'
import MockInterviewPage from './pages/MockInterviewPage'
import BehavioralInterviewPage from './pages/BehavioralInterviewPage'
import TechnicalInterviewPage from './pages/TechnicalInterviewPage'
import CompetencyInterviewPage from './pages/CompetencyInterviewPage'
import ResumeReviewPage from './pages/ResumeReviewPage'
import LinkedInStrategyPage from './pages/LinkedInStrategyPage'
import ElevatorPitchPage from './pages/ElevatorPitchPage'
import InterviewCheatsheetPage from './pages/InterviewCheatsheetPage'
import PortfolioTemplatesPage from './pages/PortfolioTemplatesPage'
import ProspectingToolPage from './pages/ProspectingToolPage'
import AIAssistantPage from './pages/AIAssistantPage'
import Week1Page from './pages/Week1Page'
import Leaderboard from './pages/Leaderboard'
import AdminDashboard from './pages/AdminDashboard'

interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged(async (state) => {
      setUser(state.user)
      setLoading(state.isLoading)
      
      // Register user when they sign in
      if (state.user && !state.isLoading) {
        try {
          await fetch(
            `https://xzhzyevxktpnzriysvmg.supabase.co/functions/v1/user-management?action=register`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${await blink.auth.getToken()}`,
                'Content-Type': 'application/json'
              }
            }
          )
        } catch (error) {
          console.error('Error registering user:', error)
        }
      }
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading MentorPath...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <Navbar user={user} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage user={user} />} />
              <Route path="/journey" element={user ? <JourneyPage user={user} /> : <Navigate to="/" />} />
              <Route path="/mentors" element={<MentorsPage user={user} />} />
              <Route path="/booking/:mentorId" element={user ? <BookingPage user={user} /> : <Navigate to="/" />} />
              <Route path="/interview-prep" element={<InterviewPrepPage user={user} />} />
              <Route path="/mock-interview" element={user ? <MockInterviewPage user={user} /> : <Navigate to="/" />} />
              <Route path="/behavioral-interview" element={user ? <BehavioralInterviewPage user={user} /> : <Navigate to="/" />} />
              <Route path="/technical-interview" element={user ? <TechnicalInterviewPage user={user} /> : <Navigate to="/" />} />
              <Route path="/competency-interview" element={user ? <CompetencyInterviewPage user={user} /> : <Navigate to="/" />} />
              <Route path="/resume-review" element={user ? <ResumeReviewPage user={user} /> : <Navigate to="/" />} />
              <Route path="/linkedin-strategy" element={user ? <LinkedInStrategyPage user={user} /> : <Navigate to="/" />} />
              <Route path="/elevator-pitch" element={user ? <ElevatorPitchPage user={user} /> : <Navigate to="/" />} />
              <Route path="/interview-cheatsheet" element={user ? <InterviewCheatsheetPage user={user} /> : <Navigate to="/" />} />
              <Route path="/portfolio-templates" element={user ? <PortfolioTemplatesPage user={user} /> : <Navigate to="/" />} />
              <Route path="/prospecting-tool" element={user ? <ProspectingToolPage user={user} /> : <Navigate to="/" />} />
              <Route path="/ai-assistant" element={user ? <AIAssistantPage user={user} /> : <Navigate to="/" />} />
              <Route path="/week1" element={user ? <Week1Page user={user} /> : <Navigate to="/" />} />
              <Route path="/leaderboard" element={<Leaderboard user={user} />} />
              <Route path="/admin" element={<AdminDashboard user={user} />} />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App