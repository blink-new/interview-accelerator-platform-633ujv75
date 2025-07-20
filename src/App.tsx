import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import HomePage from './pages/HomePage'
import JourneyPage from './pages/JourneyPage'
import MentorsPage from './pages/MentorsPage'
import BookingPage from './pages/BookingPage'
import DashboardPage from './pages/DashboardPage'
import PortfolioTemplatesPage from './pages/PortfolioTemplatesPage'
import AIAssistantPage from './pages/AIAssistantPage'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking/:mentorId" element={<BookingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio-templates" element={<PortfolioTemplatesPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App