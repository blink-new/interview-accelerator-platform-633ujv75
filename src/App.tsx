import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import ErrorBoundary from './components/ErrorBoundary'
import { SessionManager } from './components/SessionManager'
import HomePage from './pages/HomePage'
import JourneyPage from './pages/JourneyPage'
import MentorsPage from './pages/MentorsPage'
import BookingPage from './pages/BookingPage'

import PortfolioTemplatesPage from './pages/PortfolioTemplatesPage'
import AIAssistantPage from './pages/AIAssistantPage'
import ResumeReviewPage from './pages/ResumeReviewPage'
import ProspectingToolPage from './pages/ProspectingToolPage'

import InterviewPrepPage from './pages/InterviewPrepPage'
import MockInterviewPage from './pages/MockInterviewPage'
import LinkedInStrategyPage from './pages/LinkedInStrategyPage'
import InterviewCheatsheetPage from './pages/InterviewCheatsheetPage'
import ElevatorPitchPage from './pages/ElevatorPitchPage'
import CompetencyInterviewPage from './pages/CompetencyInterviewPage'
import TechnicalInterviewPage from './pages/TechnicalInterviewPage'
import BehavioralInterviewPage from './pages/BehavioralInterviewPage'
import JobTrackerPage from './pages/JobTrackerPage'
import SignInPage from './pages/SignInPage'
import Navbar from './components/layout/Navbar'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/signin" replace />
  }
  
  return <>{children}</>
}

function AppContent() {
  const { user } = useAuth()
  
  // Minimal initialization
  React.useEffect(() => {
    // Just ensure we have a clean start without aggressive cache clearing
  }, [])
  
  return (
    <div className="min-h-screen bg-background">
      <SessionManager />
      {user && <Navbar />}
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/" replace /> : <SignInPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/journey" element={
          <ProtectedRoute>
            <JourneyPage />
          </ProtectedRoute>
        } />
        <Route path="/mentors" element={
          <ProtectedRoute>
            <MentorsPage />
          </ProtectedRoute>
        } />
        <Route path="/booking" element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } />
        <Route path="/booking/:mentorId" element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } />

        <Route path="/portfolio-templates" element={
          <ProtectedRoute>
            <PortfolioTemplatesPage />
          </ProtectedRoute>
        } />
        <Route path="/ai-assistant" element={
          <ProtectedRoute>
            <AIAssistantPage />
          </ProtectedRoute>
        } />
        <Route path="/resume-review" element={
          <ProtectedRoute>
            <ResumeReviewPage />
          </ProtectedRoute>
        } />
        <Route path="/interview-prep" element={
          <ProtectedRoute>
            <InterviewPrepPage />
          </ProtectedRoute>
        } />
        <Route path="/mock-interviews" element={
          <ProtectedRoute>
            <MockInterviewPage />
          </ProtectedRoute>
        } />
        <Route path="/linkedin-strategy" element={
          <ProtectedRoute>
            <LinkedInStrategyPage />
          </ProtectedRoute>
        } />
        <Route path="/interview-cheatsheet" element={
          <ProtectedRoute>
            <InterviewCheatsheetPage />
          </ProtectedRoute>
        } />
        <Route path="/prospecting-tool" element={
          <ProtectedRoute>
            <ProspectingToolPage />
          </ProtectedRoute>
        } />
        <Route path="/elevator-pitch" element={
          <ProtectedRoute>
            <ElevatorPitchPage />
          </ProtectedRoute>
        } />
        <Route path="/competency-interview" element={
          <ProtectedRoute>
            <CompetencyInterviewPage />
          </ProtectedRoute>
        } />
        <Route path="/technical-interview" element={
          <ProtectedRoute>
            <TechnicalInterviewPage />
          </ProtectedRoute>
        } />
        <Route path="/behavioral-interview" element={
          <ProtectedRoute>
            <BehavioralInterviewPage />
          </ProtectedRoute>
        } />
        <Route path="/job-tracker" element={
          <ProtectedRoute>
            <JobTrackerPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to={user ? "/" : "/signin"} replace />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App