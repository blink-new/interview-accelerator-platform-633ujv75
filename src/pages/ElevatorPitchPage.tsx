import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Star, Users, ArrowRight, MessageSquare, Target, Lightbulb, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ElevatorPitchPage() {
  const navigate = useNavigate()

  const steps = [
    {
      step: 1,
      title: "Personal Story Foundation",
      description: "Craft your unique professional narrative",
      details: [
        "Identify your core strengths and achievements",
        "Define your professional identity clearly",
        "Connect your past experiences to future goals",
        "Create emotional connection points"
      ],
      duration: "10 minutes",
      icon: <Target className="h-5 w-5" />
    },
    {
      step: 2,
      title: "Structure & Framework",
      description: "Build your 30-second pitch using proven frameworks",
      details: [
        "Present-Past-Future structure mastery",
        "Problem-Solution-Impact methodology",
        "Hook-Bridge-Close technique",
        "Industry-specific customization"
      ],
      duration: "10 minutes",
      icon: <Lightbulb className="h-5 w-5" />
    },
    {
      step: 3,
      title: "Delivery & Confidence",
      description: "Master the art of confident presentation",
      details: [
        "Voice modulation and pacing techniques",
        "Body language and eye contact mastery",
        "Handling nerves and building confidence",
        "Adapting to different audiences"
      ],
      duration: "10 minutes",
      icon: <Zap className="h-5 w-5" />
    }
  ]

  const outcomes = [
    "Deliver a compelling 30-second introduction",
    "Adapt your pitch for different scenarios",
    "Build confidence in networking situations",
    "Create memorable first impressions",
    "Handle follow-up questions naturally"
  ]

  const scenarios = [
    {
      title: "Networking Events",
      description: "Professional meetups and conferences"
    },
    {
      title: "Job Interviews",
      description: "Tell me about yourself questions"
    },
    {
      title: "Career Fairs",
      description: "Quick company booth interactions"
    },
    {
      title: "LinkedIn Outreach",
      description: "Video messages and calls"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
            <MessageSquare className="h-4 w-4 mr-2" />
            Beginner Level • 30 Minutes
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Master Your
            <span className="text-green-600"> Elevator Pitch</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Perfect your 30-second introduction and make unforgettable first impressions. 
            Learn from industry experts who specialize in professional communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              onClick={() => window.open('https://calendly.com/mentorque-edu/elevator-pitch-mock', '_blank')}
            >
              Book Your Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3"
              onClick={() => navigate('/mock-interviews')}
            >
              View All Mock Interviews
            </Button>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Master in 30 Minutes
            </h2>
            <p className="text-lg text-gray-600">
              A structured approach to crafting and delivering your perfect elevator pitch
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      Step {step.step}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {step.duration}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      {step.icon}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm mb-4">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Scenarios */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Practice Real-World Scenarios
            </h2>
            <p className="text-lg text-gray-600">
              We'll practice your pitch in various professional contexts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((scenario, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{scenario.title}</CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Achieve
            </h2>
            <p className="text-lg text-gray-600">
              By the end of this session, you'll be able to:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Learn from the Best
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Expert Mentors</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">1,247</div>
              <div className="text-gray-600">Successful Sessions</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Perfect Your Elevator Pitch?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Book a 30-minute session with our expert mentors and transform your first impressions
          </p>
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3"
            onClick={() => window.open('https://calendly.com/mentorque-edu/elevator-pitch-mock', '_blank')}
          >
            Book Your Elevator Pitch Session
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}