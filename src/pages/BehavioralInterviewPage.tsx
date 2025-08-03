import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Star, Users, ArrowRight, Crown, Target, Handshake, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function BehavioralInterviewPage() {
  const navigate = useNavigate()

  const steps = [
    {
      step: 1,
      title: "Executive Presence",
      description: "Develop the confidence and gravitas expected at senior levels",
      details: [
        "Command attention and respect in conversations",
        "Project confidence without arrogance",
        "Handle challenging questions with poise",
        "Demonstrate strategic thinking abilities"
      ],
      duration: "15 minutes",
      icon: <Crown className="h-5 w-5" />
    },
    {
      step: 2,
      title: "Strategic Thinking",
      description: "Showcase your ability to think at a high level",
      details: [
        "Present long-term vision and planning",
        "Demonstrate business acumen and market understanding",
        "Show ability to balance competing priorities",
        "Discuss cross-functional collaboration"
      ],
      duration: "15 minutes",
      icon: <Target className="h-5 w-5" />
    },
    {
      step: 3,
      title: "Culture Fit & Values",
      description: "Align with company culture and demonstrate shared values",
      details: [
        "Research and understand company values deeply",
        "Share authentic stories that demonstrate alignment",
        "Discuss your leadership philosophy",
        "Show genuine interest in company mission"
      ],
      duration: "15 minutes",
      icon: <Handshake className="h-5 w-5" />
    }
  ]

  const scenarios = [
    {
      title: "Leadership Challenges",
      description: "Navigate complex organizational dynamics",
      examples: [
        "Leading through organizational change",
        "Managing underperforming team members",
        "Resolving conflicts between departments",
        "Making difficult resource allocation decisions"
      ]
    },
    {
      title: "Strategic Decisions",
      description: "Demonstrate high-level thinking and judgment",
      examples: [
        "Pivoting product strategy based on market feedback",
        "Deciding between competing technology investments",
        "Balancing short-term results with long-term vision",
        "Managing stakeholder expectations during setbacks"
      ]
    },
    {
      title: "Cultural Alignment",
      description: "Show fit with company values and mission",
      examples: [
        "Times you've championed diversity and inclusion",
        "Examples of customer-centric decision making",
        "Instances of taking calculated risks for innovation",
        "Demonstrating ownership and accountability"
      ]
    }
  ]

  const outcomes = [
    "Project executive presence and confidence",
    "Articulate strategic vision and business impact",
    "Demonstrate cultural fit and shared values",
    "Handle senior-level behavioral questions expertly",
    "Navigate salary and compensation discussions"
  ]

  const interviewLevels = [
    {
      level: "Director Level",
      focus: "Team leadership and departmental strategy",
      keyAreas: ["Team building", "Cross-functional collaboration", "Resource management"]
    },
    {
      level: "VP Level",
      focus: "Organizational impact and strategic vision",
      keyAreas: ["Strategic planning", "Stakeholder management", "Change leadership"]
    },
    {
      level: "C-Suite Level",
      focus: "Company-wide influence and market positioning",
      keyAreas: ["Vision setting", "Board communication", "Industry leadership"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-red-100 text-red-800 hover:bg-red-200">
            <Crown className="h-4 w-4 mr-2" />
            Expert Level • 45 Minutes
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Master
            <span className="text-red-600"> Final Behavioral Rounds</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Excel in executive-level behavioral interviews. Learn to project leadership presence, 
            demonstrate strategic thinking, and showcase perfect cultural alignment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
              onClick={() => window.open('https://calendly.com/mentorque-edu/behavioral-interview-mock', '_blank')}
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
              Executive-level behavioral interview mastery for senior positions
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
                    <div className="p-2 bg-red-100 rounded-lg">
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
                        <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
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

      {/* Interview Scenarios */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Executive-Level Scenarios
            </h2>
            <p className="text-lg text-gray-600">
              Practice with real senior-level behavioral interview scenarios
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-red-600" />
                    {scenario.title}
                  </CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 font-medium">Example Scenarios:</p>
                    {scenario.examples.map((example, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{example}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Levels */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preparation by Seniority Level
            </h2>
            <p className="text-lg text-gray-600">
              Tailored preparation based on your target role level
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {interviewLevels.map((level, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{level.level}</CardTitle>
                  <CardDescription>{level.focus}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 font-medium">Key Focus Areas:</p>
                    {level.keyAreas.map((area, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span className="text-gray-700">{area}</span>
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
              <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
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
            Learn from Senior Leaders
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <Users className="h-8 w-8 text-red-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">18+</div>
              <div className="text-gray-600">Senior Executives</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">987</div>
              <div className="text-gray-600">Successful Sessions</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Master Executive Interviews?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Book a 45-minute session and learn to excel in final behavioral rounds
          </p>
          <Button 
            size="lg" 
            className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3"
            onClick={() => window.open('https://calendly.com/mentorque-edu/behavioral-interview-mock', '_blank')}
          >
            Book Your Behavioral Interview Session
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}