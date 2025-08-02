import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Star, Users, ArrowRight, Brain, Target, Award, Lightbulb } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CompetencyInterviewPage() {
  const navigate = useNavigate()

  const steps = [
    {
      step: 1,
      title: "STAR Method Mastery",
      description: "Structure your responses using Situation, Task, Action, Result",
      details: [
        "Learn the STAR framework fundamentals",
        "Practice with real behavioral questions",
        "Quantify your achievements effectively",
        "Avoid common storytelling mistakes"
      ],
      duration: "15 minutes",
      icon: <Target className="h-5 w-5" />
    },
    {
      step: 2,
      title: "Leadership & Teamwork",
      description: "Demonstrate your collaborative and leadership skills",
      details: [
        "Showcase leadership in challenging situations",
        "Handle conflict resolution scenarios",
        "Demonstrate team collaboration skills",
        "Present cross-functional project experience"
      ],
      duration: "15 minutes",
      icon: <Users className="h-5 w-5" />
    },
    {
      step: 3,
      title: "Problem-Solving Framework",
      description: "Show your analytical and critical thinking abilities",
      details: [
        "Break down complex problems systematically",
        "Present data-driven decision making",
        "Handle ambiguous situations confidently",
        "Demonstrate innovative thinking"
      ],
      duration: "15 minutes",
      icon: <Brain className="h-5 w-5" />
    }
  ]

  const competencies = [
    {
      title: "Leadership",
      questions: [
        "Tell me about a time you led a team through a difficult project",
        "Describe a situation where you had to influence without authority",
        "How did you handle a team member who wasn't performing?"
      ]
    },
    {
      title: "Problem Solving",
      questions: [
        "Walk me through a complex problem you solved",
        "Tell me about a time you had to make a decision with incomplete information",
        "Describe a situation where you had to think outside the box"
      ]
    },
    {
      title: "Communication",
      questions: [
        "Tell me about a time you had to explain something complex to a non-technical audience",
        "Describe a situation where you had to give difficult feedback",
        "How did you handle a miscommunication that led to problems?"
      ]
    },
    {
      title: "Adaptability",
      questions: [
        "Tell me about a time you had to adapt to significant changes",
        "Describe a situation where you had to learn something quickly",
        "How did you handle a project that changed scope midway?"
      ]
    }
  ]

  const outcomes = [
    "Master the STAR method for structured responses",
    "Confidently answer any behavioral question",
    "Showcase leadership and teamwork skills effectively",
    "Demonstrate problem-solving abilities with real examples",
    "Handle follow-up questions and probing with ease"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Brain className="h-4 w-4 mr-2" />
            Intermediate Level • 45 Minutes
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Master
            <span className="text-yellow-600"> Competency Interviews</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Excel at behavioral questions and competency-based interviews. Learn to showcase 
            your skills through compelling stories using the proven STAR method.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3"
              onClick={() => window.open('https://calendly.com/mentorque-edu/competency-interview-mock', '_blank')}
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
              What You'll Master in 45 Minutes
            </h2>
            <p className="text-lg text-gray-600">
              A comprehensive approach to acing behavioral and competency-based interviews
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
                    <div className="p-2 bg-yellow-100 rounded-lg">
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
                        <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
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

      {/* Core Competencies */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Core Competencies We'll Cover
            </h2>
            <p className="text-lg text-gray-600">
              Practice the most common behavioral interview themes with real examples
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {competencies.map((competency, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <Award className="h-6 w-6 text-yellow-600" />
                    {competency.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 font-medium">Sample Questions:</p>
                    {competency.questions.map((question, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 italic">"{question}"</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
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
              <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
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
            Learn from Industry Experts
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <Users className="h-8 w-8 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">23+</div>
              <div className="text-gray-600">Expert Mentors</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">2,156</div>
              <div className="text-gray-600">Successful Sessions</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Master Competency Interviews?
          </h2>
          <p className="text-xl text-yellow-100 mb-8">
            Book a 45-minute session and learn to showcase your skills through compelling stories
          </p>
          <Button 
            size="lg" 
            className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3"
            onClick={() => window.open('https://calendly.com/mentorque-edu/competency-interview-mock', '_blank')}
          >
            Book Your Competency Interview Session
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}