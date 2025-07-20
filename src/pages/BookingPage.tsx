import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Video, 
  MessageCircle, 
  Calendar as CalendarIcon,
  CheckCircle,
  Award,
  Users
} from 'lucide-react'
import { toast } from 'sonner'

const BookingPage = () => {
  const { mentorId } = useParams()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [sessionType, setSessionType] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [step, setStep] = useState<'datetime' | 'details' | 'confirmation'>('datetime')

  // Mock mentor data - in real app, fetch by mentorId
  const mentor = {
    id: 'mentor-1',
    name: 'Sarah Chen',
    title: 'Senior Product Manager',
    company: 'Google',
    avatar: '/api/placeholder/100/100',
    rating: 4.9,
    reviews: 127,
    expertise: ['Product Management', 'Strategy', 'Leadership'],
    experience: '8+ years',
    location: 'San Francisco, CA',
    price: 150,
    bio: 'Former startup founder turned product leader at Google. Specialized in 0-1 product development and team scaling.',
    achievements: ['Led 3 successful product launches', 'Managed teams of 15+', 'Ex-founder (acquired)'],
    responseTime: '< 2 hours',
    languages: ['English', 'Mandarin']
  }

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const sessionTypes = [
    { value: 'career-guidance', label: 'Career Guidance (60 min)', price: 150 },
    { value: 'resume-review', label: 'Resume Review (30 min)', price: 75 },
    { value: 'mock-interview', label: 'Mock Interview (45 min)', price: 120 },
    { value: 'strategy-session', label: 'Strategy Session (90 min)', price: 200 }
  ]

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !sessionType) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setStep('confirmation')
    toast.success('Session booked successfully!')
  }

  const getSessionPrice = () => {
    const session = sessionTypes.find(s => s.value === sessionType)
    return session ? session.price : mentor.price
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Your session has been successfully scheduled</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={mentor.avatar} alt={mentor.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{mentor.name}</div>
                  <div className="text-sm text-muted-foreground">{mentor.title} at {mentor.company}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Video className="w-4 h-4 text-muted-foreground" />
                  <span>{sessionTypes.find(s => s.value === sessionType)?.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">${getSessionPrice()}</span>
                </div>
              </div>

              {message && (
                <div>
                  <h4 className="font-medium mb-2">Your Message</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{message}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• You'll receive a calendar invite with the video call link</li>
                  <li>• Sarah will reach out within 2 hours to confirm</li>
                  <li>• Prepare any questions or materials you'd like to discuss</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <Link to="/dashboard" className="flex-1">
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
                <Link to="/mentors">
                  <Button variant="outline">Book Another Session</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/mentors" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Mentors
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Book a Session</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mentor Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg font-semibold">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <CardDescription>{mentor.title}</CardDescription>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span>{mentor.company}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{mentor.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">({mentor.reviews} reviews)</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{mentor.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Responds {mentor.responseTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{mentor.experience} experience</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Key Achievements
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {mentor.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Your Session</CardTitle>
                <CardDescription>
                  Choose your preferred date, time, and session type
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {step === 'datetime' && (
                  <>
                    {/* Session Type */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">
                        Session Type *
                      </label>
                      <Select value={sessionType} onValueChange={setSessionType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select session type" />
                        </SelectTrigger>
                        <SelectContent>
                          {sessionTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{type.label}</span>
                                <span className="ml-4 font-medium">${type.price}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date Selection */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">
                        Select Date *
                      </label>
                      <div className="border rounded-lg p-4">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                          className="rounded-md"
                        />
                      </div>
                    </div>

                    {/* Time Selection */}
                    {selectedDate && (
                      <div>
                        <label className="text-sm font-medium text-foreground mb-3 block">
                          Available Times *
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {availableTimes.map(time => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className="text-sm"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button 
                      onClick={() => setStep('details')}
                      disabled={!selectedDate || !selectedTime || !sessionType}
                      className="w-full"
                    >
                      Continue to Details
                    </Button>
                  </>
                )}

                {step === 'details' && (
                  <>
                    {/* Session Summary */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Session Summary</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>Date: {selectedDate?.toLocaleDateString()}</div>
                        <div>Time: {selectedTime}</div>
                        <div>Type: {sessionTypes.find(s => s.value === sessionType)?.label}</div>
                        <div className="font-medium text-foreground">Total: ${getSessionPrice()}</div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">
                        Message to {mentor.name.split(' ')[0]} (Optional)
                      </label>
                      <Textarea
                        placeholder="Share what you'd like to discuss, your background, or any specific questions..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep('datetime')}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleBooking}
                        className="flex-1 bg-gradient-to-r from-primary to-accent"
                      >
                        Book Session - ${getSessionPrice()}
                      </Button>
                    </div>
                  </>
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