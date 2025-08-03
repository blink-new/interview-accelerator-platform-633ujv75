import React, { useState, useEffect } from 'react'
import { Star, Calendar, Filter, Search, Briefcase } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import blink from '../lib/blink'

interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
}

interface Mentor {
  id: string
  name: string
  title: string
  company: string
  expertise: string
  bio: string
  avatarUrl: string
  rating: number
  totalSessions: number
  hourlyRate: number
  availability: string
}

interface MentorsPageProps {
  user: User | null
}

const MentorsPage: React.FC<MentorsPageProps> = ({ user }) => {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [expertiseFilter, setExpertiseFilter] = useState('all')
  const [sortBy, setSortBy] = useState('rating')

  useEffect(() => {
    loadMentors()
  }, [])

  const loadMentors = async () => {
    try {
      setLoading(true)
      const mentorData = await blink.db.mentors.list({
        orderBy: { rating: 'desc' }
      })
      
      const formattedMentors = mentorData.map((mentor: any) => ({
        id: mentor.id,
        name: mentor.name,
        title: mentor.title,
        company: mentor.company,
        expertise: Array.isArray(mentor.expertise) ? mentor.expertise.join(', ') : mentor.expertise,
        bio: mentor.bio,
        avatarUrl: mentor.avatarUrl || mentor.avatar_url,
        rating: Number(mentor.rating),
        totalSessions: Number(mentor.totalSessions || mentor.total_sessions || 0),
        hourlyRate: Number(mentor.hourlyRate || mentor.hourly_rate || mentor.pricePerHour || mentor.price_per_hour || 100),
        availability: mentor.availability || (mentor.available ? 'Available' : 'Busy')
      }))
      
      setMentors(formattedMentors)
    } catch (error) {
      console.error('Error loading mentors:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesExpertise = expertiseFilter === 'all' || 
                           mentor.expertise.toLowerCase().includes(expertiseFilter.toLowerCase())
    
    return matchesSearch && matchesExpertise
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'sessions':
        return b.totalSessions - a.totalSessions
      case 'price':
        return a.hourlyRate - b.hourlyRate
      default:
        return 0
    }
  })

  const expertiseOptions = [
    'Technical Interviews',
    'Behavioral Interviews', 
    'System Design',
    'Product Strategy',
    'Design Interviews',
    'Leadership',
    'Data Science',
    'Sales Interviews'
  ]

  const handleBookSession = (mentorId: string) => {
    if (user) {
      window.location.href = `/booking/${mentorId}`
    } else {
      blink.auth.login()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading mentors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Expert Mentors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with industry professionals from top companies who are ready to help you land your dream job.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search mentors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise</SelectItem>
                {expertiseOptions.map(option => (
                  <SelectItem key={option} value={option.toLowerCase()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="sessions">Most Sessions</SelectItem>
                <SelectItem value="price">Lowest Price</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <img
                  src={mentor.avatarUrl}
                  alt={mentor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-xl">{mentor.name}</CardTitle>
                <CardDescription className="flex items-center justify-center text-gray-600">
                  <Briefcase className="mr-1 h-4 w-4" />
                  {mentor.title} at {mentor.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{mentor.rating.toFixed(1)}</span>
                      <span className="text-gray-500 ml-1">({mentor.totalSessions} sessions)</span>
                    </div>
                    <Badge variant="secondary">${mentor.hourlyRate}/hr</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-1">Expertise</h4>
                    <p className="text-sm text-gray-600">{mentor.expertise}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-1">About</h4>
                    <p className="text-sm text-gray-600 line-clamp-3">{mentor.bio}</p>
                  </div>
                  
                  <div className="flex items-center text-sm text-green-600">
                    <Calendar className="mr-1 h-4 w-4" />
                    Available this week
                  </div>
                  
                  <Button 
                    onClick={() => handleBookSession(mentor.id)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Book Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No mentors found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm('')
                setExpertiseFilter('all')
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Can't Find the Right Mentor?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            We're constantly adding new mentors from top companies. Join our waitlist to get notified.
          </p>
          <Button variant="secondary" size="lg">
            Join Waitlist
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MentorsPage