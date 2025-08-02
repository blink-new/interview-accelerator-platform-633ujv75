import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, ArrowRight, Download, Star, Clock, Users, Lightbulb, Target, Zap } from 'lucide-react';

const InterviewCheatsheetPage = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const cheatsheetTypes = [
    {
      title: "Technical Interview Cheatsheet",
      description: "Comprehensive guide for software engineering interviews",
      duration: "60 minutes",
      price: "$179",
      includes: [
        "Data structures & algorithms quick reference",
        "System design templates and frameworks",
        "Common coding patterns and solutions",
        "Time complexity cheat sheet",
        "Behavioral questions for tech roles"
      ],
      industries: ["Software Engineering", "Data Science", "DevOps", "Cybersecurity"]
    },
    {
      title: "Behavioral Interview Cheatsheet",
      description: "Master storytelling and behavioral questions",
      duration: "45 minutes",
      price: "$129",
      includes: [
        "STAR method framework and examples",
        "Leadership and teamwork scenarios",
        "Conflict resolution strategies",
        "Career progression narratives",
        "Company-specific culture questions"
      ],
      industries: ["Management", "Consulting", "Sales", "Marketing", "HR"]
    },
    {
      title: "Industry-Specific Cheatsheet",
      description: "Tailored preparation for your target industry",
      duration: "45 minutes",
      price: "$149",
      includes: [
        "Industry trends and challenges",
        "Role-specific technical questions",
        "Key performance metrics",
        "Regulatory and compliance topics",
        "Career pathway discussions"
      ],
      industries: ["Finance", "Healthcare", "Consulting", "Retail", "Manufacturing"]
    },
    {
      title: "Executive Interview Cheatsheet",
      description: "Senior-level interview preparation",
      duration: "75 minutes",
      price: "$249",
      includes: [
        "Strategic thinking frameworks",
        "P&L and business metrics",
        "Change management scenarios",
        "Board presentation techniques",
        "Stakeholder management strategies"
      ],
      industries: ["C-Suite", "VP Level", "Director Level", "Senior Management"]
    }
  ];

  const sampleQuestions = [
    {
      category: "Technical",
      questions: [
        "Explain the difference between SQL and NoSQL databases",
        "How would you design a URL shortener like bit.ly?",
        "What's the time complexity of quicksort?",
        "Describe microservices architecture"
      ]
    },
    {
      category: "Behavioral",
      questions: [
        "Tell me about a time you had to work with a difficult team member",
        "Describe a project where you had to meet a tight deadline",
        "How do you handle constructive criticism?",
        "Give an example of when you showed leadership"
      ]
    },
    {
      category: "Situational",
      questions: [
        "How would you prioritize features for a new product?",
        "What would you do if you disagreed with your manager?",
        "How do you stay updated with industry trends?",
        "Describe your ideal work environment"
      ]
    }
  ];

  const mentorSpecialties = [
    {
      name: "Sarah Kim",
      role: "Senior Engineering Manager at Google",
      specialty: "Technical Interviews",
      experience: "8+ years",
      sessions: 342,
      rating: 4.9,
      expertise: ["System Design", "Algorithms", "Coding Interviews"]
    },
    {
      name: "Michael Chen",
      role: "VP of Product at Meta",
      specialty: "Behavioral & Leadership",
      experience: "12+ years",
      sessions: 287,
      rating: 4.8,
      expertise: ["Executive Presence", "Strategic Thinking", "Team Leadership"]
    },
    {
      name: "Emily Rodriguez",
      role: "Principal Consultant at McKinsey",
      specialty: "Case Interviews",
      experience: "10+ years",
      sessions: 195,
      rating: 4.9,
      expertise: ["Case Studies", "Business Strategy", "Problem Solving"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <FileText className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Interview Cheatsheet Preparation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100">
              Get personalized cheatsheets and frameworks for interview success
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>Role-Specific Preparation</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                <span>Proven Frameworks</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Quick Reference Guides</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cheatsheet Types */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Cheatsheet Type
          </h2>
          <p className="text-lg text-gray-600">
            Get personalized preparation materials tailored to your interview type
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cheatsheetTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{type.title}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">{type.price}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {type.duration}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{type.description}</p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                <div className="space-y-2">
                  {type.includes.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Best For:</h4>
                <div className="flex flex-wrap gap-2">
                  {type.industries.map((industry, industryIndex) => (
                    <span key={industryIndex} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                Book a Call with Mentor
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Questions Preview */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sample Questions We Cover
            </h2>
            <p className="text-lg text-gray-600">
              Get prepared for the most common interview questions in each category
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sampleQuestions.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Mentors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Cheatsheet Experts
          </h2>
          <p className="text-lg text-gray-600">
            Work with industry leaders who know what interviewers are looking for
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {mentorSpecialties.map((mentor, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                <p className="text-gray-600">{mentor.role}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialty:</span>
                  <span className="font-medium">{mentor.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{mentor.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sessions:</span>
                  <span className="font-medium">{mentor.sessions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{mentor.rating}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Book a Call with Mentor
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Cheatsheet Preparation?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Download className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Downloadable Resources</h3>
                  <p className="text-gray-600">Get PDF cheatsheets you can reference anytime, anywhere</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Content</h3>
                  <p className="text-gray-600">Tailored to your specific role, industry, and experience level</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Frameworks</h3>
                  <p className="text-gray-600">Battle-tested methods used by successful candidates</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Preparation</h3>
                  <p className="text-gray-600">Efficient study materials for last-minute interview prep</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Your Interview Cheatsheet?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join professionals who've enhanced their interview performance with expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/mentors?service=interview-cheatsheet')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              Browse All Experts
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors inline-flex items-center justify-center gap-2"
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

export default InterviewCheatsheetPage;