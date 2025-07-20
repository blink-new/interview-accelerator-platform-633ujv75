import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Award,
  Briefcase,
  GraduationCap,
  MessageCircle
} from 'lucide-react'

const MentorsPage = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExpertise, setSelectedExpertise] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState('all')
  const [serviceType, setServiceType] = useState('')

  useEffect(() => {
    const service = searchParams.get('service')
    if (service) {
      setServiceType(service)
      // Set appropriate search terms based on service
      switch (service) {
        case 'resume-review':
          setSearchQuery('resume')
          break
        case 'resume-rebuild':
          setSearchQuery('resume')
          break
        case 'interview-cheatsheet':
          setSearchQuery('interview')
          break
        case 'linkedin-strategy':
          setSearchQuery('linkedin networking')
          break
        case 'portfolio-consultation':
          setSearchQuery('portfolio')
          break
        case 'ai-setup':
          setSearchQuery('AI assistant')
          break
        default:
          break
      }
    }
  }, [searchParams])

  const mentors = [
    {
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
      price: '$150/hour',
      availability: 'Available this week',
      bio: 'Former startup founder turned product leader at Google. Specialized in 0-1 product development and team scaling.',
      achievements: ['Led 3 successful product launches', 'Managed teams of 15+', 'Ex-founder (acquired)'],
      languages: ['English', 'Mandarin'],
      responseTime: '< 2 hours'
    },
    {
      id: 'mentor-2',
      name: 'Marcus Johnson',
      title: 'VP of Engineering',
      company: 'Stripe',
      avatar: '/api/placeholder/100/100',
      rating: 4.8,
      reviews: 89,
      expertise: ['Engineering Leadership', 'System Design', 'Career Growth'],
      experience: '12+ years',
      location: 'New York, NY',
      price: '$200/hour',
      availability: 'Available next week',
      bio: 'Engineering leader with experience scaling teams from 5 to 100+ engineers. Expert in technical leadership and career advancement.',
      achievements: ['Scaled engineering org 20x', 'Built distributed systems at scale', 'Mentored 50+ engineers'],
      languages: ['English', 'Spanish'],
      responseTime: '< 4 hours'
    },
    {
      id: 'mentor-3',
      name: 'Emily Rodriguez',
      title: 'Chief Marketing Officer',
      company: 'Airbnb',
      avatar: '/api/placeholder/100/100',
      rating: 5.0,
      reviews: 156,
      expertise: ['Marketing Strategy', 'Brand Building', 'Growth'],
      experience: '10+ years',
      location: 'Los Angeles, CA',
      price: '$175/hour',
      availability: 'Available today',
      bio: 'Marketing executive who has built and scaled marketing teams at high-growth companies. Expert in brand strategy and growth marketing.',
      achievements: ['Grew user base 10x in 2 years', 'Built marketing team from 2 to 25', 'Led 5 major rebrand initiatives'],
      languages: ['English', 'Portuguese'],
      responseTime: '< 1 hour'
    },
    {
      id: 'mentor-4',
      name: 'David Kim',
      title: 'Startup Founder & CEO',
      company: 'TechCorp (Acquired)',
      avatar: '/api/placeholder/100/100',
      rating: 4.7,
      reviews: 203,
      expertise: ['Entrepreneurship', 'Fundraising', 'Business Strategy'],
      experience: '15+ years',
      location: 'Austin, TX',
      price: '$250/hour',
      availability: 'Available this week',
      bio: 'Serial entrepreneur with 2 successful exits. Expert in early-stage startups, fundraising, and building from 0 to 1.',
      achievements: ['2 successful exits ($50M+)', 'Raised $25M+ in funding', 'Built teams of 100+'],
      languages: ['English', 'Korean'],
      responseTime: '< 6 hours'
    },
    {
      id: 'mentor-5',
      name: 'Lisa Thompson',
      title: 'Head of Design',
      company: 'Figma',
      avatar: '/api/placeholder/100/100',
      rating: 4.9,
      reviews: 94,
      expertise: ['UX Design', 'Design Leadership', 'Product Design'],
      experience: '9+ years',
      location: 'Seattle, WA',
      price: '$140/hour',
      availability: 'Available tomorrow',
      bio: 'Design leader passionate about creating user-centered products. Expert in design systems and leading creative teams.',
      achievements: ['Led design for 10M+ user products', 'Built design system used by 1000+ designers', 'Speaker at 15+ conferences'],
      languages: ['English', 'French'],
      responseTime: '< 3 hours'
    },
    {
      id: 'mentor-6',
      name: 'Alex Rivera',
      title: 'Data Science Director',
      company: 'Netflix',
      avatar: '/api/placeholder/100/100',
      rating: 4.8,
      reviews: 112,
      expertise: ['Data Science', 'Machine Learning', 'Analytics'],
      experience: '11+ years',
      location: 'Remote',
      price: '$180/hour',
      availability: 'Available this week',
      bio: 'Data science leader with expertise in ML at scale. Passionate about using data to drive business decisions and mentor the next generation.',
      achievements: ['Built ML systems serving 200M+ users', 'Led data teams of 20+', 'Published 10+ research papers'],
      languages: ['English', 'Spanish'],
      responseTime: '< 2 hours'
    }
  ]

  const expertiseOptions = [
    'Product Management',
    'Engineering Leadership',
    'Marketing Strategy',
    'Entrepreneurship',
    'UX Design',
    'Data Science',
    'Strategy',
    'Leadership',
    'Career Growth'
  ]

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesExpertise = selectedExpertise === 'all' || 
                            mentor.expertise.some(skill => skill.toLowerCase().includes(selectedExpertise.toLowerCase()))
    
    const matchesExperience = selectedExperience === 'all' || 
                             mentor.experience.includes(selectedExperience)
    
    return matchesSearch && matchesExpertise && matchesExperience
  })

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          {serviceType ? (
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {serviceType === 'resume-review' && 'Resume Review Experts'}
                {serviceType === 'resume-rebuild' && 'Resume Rebuild Specialists'}
                {serviceType === 'interview-cheatsheet' && 'Interview Preparation Mentors'}
                {serviceType === 'linkedin-strategy' && 'LinkedIn & Networking Experts'}
                {serviceType === 'portfolio-consultation' && 'Portfolio Design Consultants'}
                {serviceType === 'ai-setup' && 'AI Assistant Setup Specialists'}
              </h1>
              <p className="text-muted-foreground">
                {serviceType === 'resume-review' && 'Get your resume reviewed by industry experts who know what recruiters want'}
                {serviceType === 'resume-rebuild' && 'Work with specialists to completely rebuild your resume for maximum impact'}
                {serviceType === 'interview-cheatsheet' && 'Create personalized interview cheatsheets with experienced mentors'}
                {serviceType === 'linkedin-strategy' && 'Master LinkedIn optimization and networking strategies with proven experts'}
                {serviceType === 'portfolio-consultation' && 'Get expert guidance on creating a portfolio that showcases your skills'}
                {serviceType === 'ai-setup' && 'Get help setting up and optimizing your AI job search assistant'}
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Perfect Mentor</h1>
              <p className="text-muted-foreground">Connect with industry experts who can accelerate your career growth</p>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search mentors, skills, or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
              <SelectTrigger>
                <SelectValue placeholder="Expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise</SelectItem>
                {expertiseOptions.map(option => (
                  <SelectItem key={option} value={option.toLowerCase()}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger>
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience</SelectItem>
                <SelectItem value="5+">5+ years</SelectItem>
                <SelectItem value="8+">8+ years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
                <SelectItem value="15+">15+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredMentors.length} of {mentors.length} mentors
          </p>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sort by: Relevance</span>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg font-semibold">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription className="text-sm">{mentor.title}</CardDescription>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {mentor.company}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">{mentor.rating}</span>
                          <span className="text-muted-foreground text-sm ml-1">({mentor.reviews})</span>
                        </div>
                        <div className="text-sm font-medium text-primary mt-1">{mentor.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Bio */}
                <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                
                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{mentor.experience} experience</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-green-600">{mentor.availability}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Responds {mentor.responseTime}</span>
                  </div>
                </div>
                
                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Key Achievements
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {mentor.achievements.slice(0, 2).map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3 pt-2">
                  <Link to={`/booking/${mentor.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-primary to-accent">
                      Book Session
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="px-4">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No mentors found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all mentors
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('')
                setSelectedExpertise('all')
                setSelectedExperience('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MentorsPage