import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Star, Users, ArrowRight, Code, Database, Cpu, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function TechnicalInterviewPage() {
  const navigate = useNavigate()

  const steps = [
    {
      step: 1,
      title: "Live Coding Practice",
      description: "Solve algorithmic problems in real-time with expert guidance",
      details: [
        "Data structures and algorithms mastery",
        "Code optimization techniques",
        "Time and space complexity analysis",
        "Clean code practices and documentation"
      ],
      duration: "20 minutes",
      icon: <Code className="h-5 w-5" />
    },
    {
      step: 2,
      title: "System Design Fundamentals",
      description: "Design scalable systems and architecture patterns",
      details: [
        "High-level system architecture design",
        "Database design and scaling strategies",
        "Load balancing and caching patterns",
        "Microservices vs monolithic approaches"
      ],
      duration: "20 minutes",
      icon: <Database className="h-5 w-5" />
    },
    {
      step: 3,
      title: "Technical Deep Dive",
      description: "Discuss your projects and technical decisions",
      details: [
        "Architecture decisions and trade-offs",
        "Performance optimization strategies",
        "Debugging and troubleshooting approaches",
        "Technology stack justification"
      ],
      duration: "20 minutes",
      icon: <Cpu className="h-5 w-5" />
    }
  ]

  const topics = [
    {
      category: "Algorithms & Data Structures",
      skills: [
        "Arrays, Strings, Linked Lists",
        "Trees, Graphs, Hash Tables",
        "Dynamic Programming",
        "Sorting & Searching Algorithms",
        "Big O Notation Analysis"
      ]
    },
    {
      category: "System Design",
      skills: [
        "Scalable Web Applications",
        "Database Design & Optimization",
        "Caching Strategies",
        "Load Balancing",
        "Microservices Architecture"
      ]
    },
    {
      category: "Programming Languages",
      skills: [
        "JavaScript/TypeScript",
        "Python",
        "Java",
        "C++",
        "Language-specific best practices"
      ]
    },
    {
      category: "Technologies & Frameworks",
      skills: [
        "React, Node.js, Express",
        "AWS, Docker, Kubernetes",
        "SQL & NoSQL Databases",
        "REST APIs & GraphQL",
        "Testing Frameworks"
      ]
    }
  ]

  const outcomes = [
    "Solve coding problems efficiently under pressure",
    "Design scalable systems with proper architecture",
    "Explain technical concepts clearly and concisely",
    "Handle follow-up questions and edge cases",
    "Demonstrate best practices and clean code principles"
  ]

  const companies = [
    { name: "Google", focus: "Algorithms & System Design" },
    { name: "Meta", focus: "Product Engineering" },
    { name: "Amazon", focus: "Leadership Principles + Tech" },
    { name: "Apple", focus: "Product Innovation" },
    { name: "Microsoft", focus: "Cloud & Enterprise" },
    { name: "Netflix", focus: "Scale & Performance" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-200">
            <Code className="h-4 w-4 mr-2" />
            Advanced Level • 60 Minutes
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Ace Your
            <span className="text-orange-600"> Technical Interview</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Master coding challenges, system design, and technical discussions with 
            MAANG engineers. Get real-time feedback and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
              onClick={() => window.open('https://calendly.com/mentorque-edu/technical-interview-mock', '_blank')}
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
              What You'll Master in 60 Minutes
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive technical interview preparation with hands-on practice
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
                    <div className="p-2 bg-orange-100 rounded-lg">
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
                        <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
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

      {/* Technical Topics */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technical Areas We Cover
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive coverage of all major technical interview topics
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {topics.map((topic, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <Zap className="h-6 w-6 text-orange-600" />
                    {topic.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {topic.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <span className="text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Focus */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Company-Specific Preparation
            </h2>
            <p className="text-lg text-gray-600">
              Tailored practice for top tech companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {company.focus}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="py-16 px-4">
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
              <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Learn from MAANG Engineers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">31+</div>
              <div className="text-gray-600">Expert Engineers</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">1,893</div>
              <div className="text-gray-600">Successful Sessions</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Ace Your Technical Interview?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Book a 60-minute session with MAANG engineers and master technical interviews
          </p>
          <Button 
            size="lg" 
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3"
            onClick={() => window.open('https://calendly.com/mentorque-edu/technical-interview-mock', '_blank')}
          >
            Book Your Technical Interview Session
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}