import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Star, Users, TrendingUp, Calendar, Bot, FileText, Briefcase, MessageSquare } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()

  const weeklyProgram = [
    {
      week: 1,
      title: "Resume Review & Analysis",
      description: "Get your current resume professionally reviewed by industry experts",
      duration: "1-1 Call Session",
      icon: <FileText className="h-6 w-6" />,
      action: () => navigate('/mentors?service=resume-review'),
      color: "bg-blue-50 border-blue-200"
    },
    {
      week: 2,
      title: "Resume Rebuild & Optimization",
      description: "Completely rebuild your resume with expert guidance and ATS optimization",
      duration: "Expert Collaboration",
      icon: <TrendingUp className="h-6 w-6" />,
      action: () => navigate('/mentors?service=resume-rebuild'),
      color: "bg-green-50 border-green-200"
    },
    {
      week: 3,
      title: "Portfolio Development",
      description: "Build a stunning portfolio that showcases your skills and projects",
      duration: "Template Selection",
      icon: <Briefcase className="h-6 w-6" />,
      action: () => navigate('/portfolio-templates'),
      color: "bg-purple-50 border-purple-200"
    },
    {
      week: 4,
      title: "AI Assistant Setup",
      description: "Get your personal AI assistant Chrome extension for job applications",
      duration: "Chrome Extension",
      icon: <Bot className="h-6 w-6" />,
      action: () => navigate('/ai-assistant'),
      color: "bg-orange-50 border-orange-200"
    }
  ]

  const optionalServices = [
    {
      title: "Interview Cheatsheet Preparation",
      description: "Create personalized cheatsheets with mentor guidance",
      icon: <FileText className="h-5 w-5" />,
      action: () => navigate('/mentors?service=interview-prep')
    },
    {
      title: "LinkedIn & Outreach Strategy",
      description: "Master networking and referral strategies",
      icon: <Users className="h-5 w-5" />,
      action: () => navigate('/mentors?service=linkedin-strategy')
    }
  ]

  const mockInterviews = [
    {
      title: "Elevator Pitch",
      description: "Perfect your 30-second introduction",
      duration: "30 mins",
      price: "$89",
      difficulty: "Beginner",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Competency Interview",
      description: "Behavioral questions and soft skills assessment",
      duration: "45 mins", 
      price: "$129",
      difficulty: "Intermediate",
      icon: <Users className="h-5 w-5" />,
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      title: "Technical Interview",
      description: "Coding challenges and technical deep-dives",
      duration: "60 mins",
      price: "$179", 
      difficulty: "Advanced",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-orange-100 text-orange-800"
    },
    {
      title: "Final Behavioral Round",
      description: "Executive-level behavioral assessment",
      duration: "45 mins",
      price: "$149",
      difficulty: "Expert",
      icon: <Star className="h-5 w-5" />,
      color: "bg-red-100 text-red-800"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            🚀 8-Week Interview Acceleration Program
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Land Your Dream Job in
            <span className="text-blue-600"> 8 Weeks</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A structured, week-by-week program designed to accelerate your interview success. 
            From resume optimization to mock interviews with MAANG engineers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => navigate('/dashboard')}
            >
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3"
              onClick={() => navigate('/mentors')}
            >
              Browse Mentors
            </Button>
          </div>
        </div>
      </section>

      {/* 8-Week Program */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your 8-Week Success Timeline
            </h2>
            <p className="text-lg text-gray-600">
              Follow our proven week-by-week program for maximum interview success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {weeklyProgram.map((week, index) => (
              <Card key={index} className={`${week.color} hover:shadow-lg transition-all duration-300 cursor-pointer`} onClick={week.action}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      Week {week.week}
                    </Badge>
                    {week.icon}
                  </div>
                  <CardTitle className="text-lg">{week.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {week.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      {week.duration}
                    </span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Optional Services */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Optional Enhancement Services
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {optionalServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={service.action}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mock Interviews */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mock Interviews with MAANG Engineers
            </h2>
            <p className="text-lg text-gray-600">
              Practice with engineers from top tech companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockInterviews.map((interview, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    {interview.icon}
                    <Badge className={interview.color}>
                      {interview.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{interview.title}</CardTitle>
                  <CardDescription>{interview.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">{interview.duration}</span>
                    <span className="text-lg font-bold text-blue-600">{interview.price}</span>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/booking?type=${interview.title.toLowerCase().replace(' ', '-')}`)}
                  >
                    Book Session
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful candidates who landed their dream jobs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
              onClick={() => navigate('/dashboard')}
            >
              Start Week 1 Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              onClick={() => navigate('/mentors')}
            >
              Meet Our Mentors
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}