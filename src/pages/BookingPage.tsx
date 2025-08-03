import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Clock, Star, ArrowLeft, Check } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Textarea } from '../components/ui/textarea'
import { toast } from 'sonner'
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

interface BookingPageProps {
  user: User
}

const BookingPage: React.FC<BookingPageProps> = ({ user }) => {
  const { mentorId } = useParams<{ mentorId: string }>()
  const navigate = useNavigate()
  const [mentor, setMentor] = useState<Mentor | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const [booking, setBooking] = useState(false)

  const loadMentor = useCallback(async () => {
    try {
      setLoading(true)
      const mentorData = await blink.db.mentors.list({
        where: { id: mentorId }
      })
      
      if (mentorData.length > 0) {
        const mentorInfo = mentorData[0]
        setMentor({
          id: mentorInfo.id,
          name: mentorInfo.name,
          title: mentorInfo.title,
          company: mentorInfo.company,
          expertise: mentorInfo.expertise,
          bio: mentorInfo.bio,
          avatarUrl: mentorInfo.avatarUrl,
          rating: Number(mentorInfo.rating),
          totalSessions: Number(mentorInfo.totalSessions),
          hourlyRate: Number(mentorInfo.hourlyRate),
          availability: mentorInfo.availability
        })
      }
    } catch (error) {
      console.error('Error loading mentor:', error)
      toast.error('Failed to load mentor information')
    } finally {
      setLoading(false)
    }
  }, [mentorId])

  useEffect(() => {
    if (mentorId) {
      loadMentor()
    }
  }, [mentorId, loadMentor])

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !mentor) {
      toast.error('Please select a date and time')
      return
    }

    try {
      setBooking(true)
      
      // Create booking record
      await blink.db.bookings.create({
        id: `booking_${Date.now()}`,
        userId: user.id,
        mentorId: mentor.id,
        sessionDate: selectedDate,
        sessionTime: selectedTime,
        duration: 60,
        status: 'scheduled',
        notes: notes
      })

      toast.success('Session booked successfully!')
      navigate('/journey')
    } catch (error) {
      console.error('Error booking session:', error)
      toast.error('Failed to book session. Please try again.')
    } finally {
      setBooking(false)
    }
  }

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
      if (hour < 17) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`)
      }
    }
    return slots
  }

  // Generate next 14 days
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      })
    }
    return dates
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading mentor information...</p>
        </div>
      </div>
    )
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Mentor not found</p>
          <Button onClick={() => navigate('/mentors')}>
            Back to Mentors
          </Button>
        </div>
      </div>
    )
  }

  const timeSlots = generateTimeSlots()
  const availableDates = generateDates()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/mentors')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Mentors
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mentor Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <img
                  src={mentor.avatarUrl}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-xl">{mentor.name}</CardTitle>
                <CardDescription>
                  {mentor.title} at {mentor.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{mentor.rating.toFixed(1)}</span>
                    </div>
                    <Badge variant="secondary">${mentor.hourlyRate}/hr</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-1">Expertise</h4>
                    <p className="text-sm text-gray-600">{mentor.expertise}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-1">About</h4>
                    <p className="text-sm text-gray-600">{mentor.bio}</p>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {mentor.totalSessions} sessions completed
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Session
                </CardTitle>
                <CardDescription>
                  Select your preferred date and time for a 1-hour mentorship session.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div>
                  <h3 className="font-semibold mb-3">Select Date</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availableDates.map((date) => (
                      <Button
                        key={date.value}
                        variant={selectedDate === date.value ? "default" : "outline"}
                        onClick={() => setSelectedDate(date.value)}
                        className="text-sm"
                      >
                        {date.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Select Time
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className="text-sm"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedTime && (
                  <div>
                    <h3 className="font-semibold mb-3">Session Notes (Optional)</h3>
                    <Textarea
                      placeholder="What would you like to focus on during this session? Any specific questions or topics you'd like to discuss?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                )}

                {/* Booking Summary */}
                {selectedDate && selectedTime && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Mentor:</span>
                        <span>{mentor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{new Date(selectedDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span>{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>60 minutes</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${mentor.hourlyRate}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                {selectedDate && selectedTime && (
                  <Button 
                    onClick={handleBooking}
                    disabled={booking}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    size="lg"
                  >
                    {booking ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Booking Session...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Book Session
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage