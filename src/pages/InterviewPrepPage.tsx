import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, CheckCircle, ArrowRight, Star, Clock, Users, Lightbulb, Zap, Award, MessageSquare } from 'lucide-react';

const InterviewPrepPage = () => {
  const navigate = useNavigate();

  const prepAreas = [
    {
      title: "Technical Preparation",
      description: "Master coding challenges and technical concepts",
      icon: <Zap className="w-8 h-8" />,
      topics: ["Data Structures", "Algorithms", "System Design", "Code Reviews"]
    },
    {
      title: "Behavioral Questions",
      description: "Perfect your storytelling and soft skills",
      icon: <MessageSquare className="w-8 h-8" />,
      topics: ["STAR Method", "Leadership Stories", "Conflict Resolution", "Career Goals"]
    },
    {
      title: "Company Research",
      description: "Deep dive into company culture and values",
      icon: <Target className="w-8 h-8" />,
      topics: ["Mission & Values", "Recent News", "Team Structure", "Growth Strategy"]
    },
    {
      title: "Industry Knowledge",
      description: "Stay current with industry trends and challenges",
      icon: <Lightbulb className="w-8 h-8" />,
      topics: ["Market Trends", "Competitive Landscape", "Technology Stack", "Best Practices"]
    }
  ];

  const prepPackages = [
    {
      title: "Interview Bootcamp",
      duration: "2 hours",
      description: "Comprehensive preparation covering all interview aspects",
      includes: [
        "Technical and behavioral prep",
        "Company-specific research",
        "Mock interview session",
        "Personalized feedback",
        "Follow-up resources"
      ]
    },
    {
      title: "Technical Deep Dive",
      duration: "90 minutes",
      description: "Focused technical interview preparation",
      includes: [
        "Algorithm and data structure review",
        "Live coding practice",
        "System design basics",
        "Technical communication tips",
        "Problem-solving frameworks"
      ]
    },
    {
      title: "Behavioral Mastery",
      duration: "60 minutes",
      description: "Perfect your behavioral interview responses",
      includes: [
        "STAR method training",
        "Story development workshop",
        "Common questions practice",
        "Confidence building techniques",
        "Body language coaching"
      ]
    }
  ];

  const commonQuestions = [
    {
      category: "Technical",
      questions: [
        "Explain the difference between SQL and NoSQL databases",
        "How would you design a URL shortener?",
        "What's your approach to debugging complex issues?",
        "Describe a challenging technical problem you solved"
      ]
    },
    {
      category: "Behavioral",
      questions: [
        "Tell me about a time you disagreed with your manager",
        "Describe a project where you had to learn something new",
        "How do you handle tight deadlines?",
        "Give an example of when you showed leadership"
      ]
    },
    {
      category: "Company-Specific",
      questions: [
        "Why do you want to work here?",
        "How do you align with our company values?",
        "What excites you about this role?",
        "Where do you see yourself in 5 years?"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Target className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Interview Preparation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Comprehensive preparation to ace any interview with confidence
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Technical & Behavioral</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>Industry Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Personalized Coaching</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preparation Areas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Interview Preparation
          </h2>
          <p className="text-lg text-gray-600">
            Cover all aspects of the interview process with expert guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {prepAreas.map((area, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-purple-600 mb-4">
                {area.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {area.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {area.description}
              </p>
              <div className="space-y-2">
                {area.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preparation Packages */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Preparation Package
            </h2>
            <p className="text-lg text-gray-600">
              Tailored preparation sessions to match your interview needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {prepPackages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {pkg.title}
                    </h3>
                    <div className="text-gray-500 flex items-center justify-center gap-1">
                      <Clock className="w-4 h-4" />
                      {pkg.duration}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 text-center">{pkg.description}</p>

                  <div className="space-y-3 mb-8">
                    {pkg.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Book a Call with Mentor
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Questions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Common Interview Questions
          </h2>
          <p className="text-lg text-gray-600">
            Practice with the most frequently asked questions in each category
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {commonQuestions.map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interview Success Tips
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Research Thoroughly</h3>
                  <p className="text-gray-600">Know the company, role, and interviewer background</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Practice Out Loud</h3>
                  <p className="text-gray-600">Rehearse your answers verbally, not just mentally</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Prepare Questions</h3>
                  <p className="text-gray-600">Have thoughtful questions ready about the role and company</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Follow Up</h3>
                  <p className="text-gray-600">Send a thoughtful thank-you note within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get personalized preparation from industry experts and boost your confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              Book a Call with Mentor
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepPage;