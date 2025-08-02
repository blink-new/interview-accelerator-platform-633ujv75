import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Star, Users, CheckCircle, ArrowRight, Play, Award } from 'lucide-react';

const MockInterviewPage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');

  const interviewTypes = [
    {
      id: 'elevator-pitch',
      title: 'Elevator Pitch',
      duration: '30 minutes',

      difficulty: 'Beginner',
      description: 'Perfect your 30-second introduction and personal branding',
      features: [
        'Personal story structuring',
        'Confidence building techniques',
        'Body language coaching',
        'Industry-specific customization'
      ],
      mentors: 15,
      rating: 4.9,
      sessions: 1247
    },
    {
      id: 'competency',
      title: 'Competency Interview',
      duration: '45 minutes',

      difficulty: 'Intermediate',
      description: 'Master behavioral questions and competency-based interviews',
      features: [
        'STAR method mastery',
        'Leadership scenarios',
        'Problem-solving frameworks',
        'Real-time feedback'
      ],
      mentors: 23,
      rating: 4.8,
      sessions: 2156
    },
    {
      id: 'technical',
      title: 'Technical Interview',
      duration: '60 minutes',

      difficulty: 'Advanced',
      description: 'Ace technical challenges with MAANG engineers',
      features: [
        'Live coding sessions',
        'System design practice',
        'Algorithm optimization',
        'Code review techniques'
      ],
      mentors: 31,
      rating: 4.9,
      sessions: 1893
    },
    {
      id: 'behavioral',
      title: 'Final Behavioral Round',
      duration: '45 minutes',

      difficulty: 'Advanced',
      description: 'Navigate final rounds with senior leadership',
      features: [
        'Executive presence',
        'Strategic thinking',
        'Culture fit assessment',
        'Salary negotiation prep'
      ],
      mentors: 18,
      rating: 4.8,
      sessions: 987
    }
  ];

  const handleBookNow = (type: string) => {
    navigate('/mentors?service=mock-interview');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mock Interview Practice
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Practice with MAANG engineers and land your dream job
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>87+ Expert Mentors</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>4.8/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>6,283+ Successful Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Types */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Interview Type
          </h2>
          <p className="text-lg text-gray-600">
            Practice with industry experts and get personalized feedback
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {interviewTypes.map((type) => (
            <div
              key={type.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {type.title}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(type.difficulty)}`}>
                      {type.difficulty}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {type.duration}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{type.description}</p>

                <div className="space-y-3 mb-6">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{type.mentors} mentors</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{type.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{type.sessions.toLocaleString()} sessions</span>
                  </div>
                </div>

                <button
                  onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  Book a Call with Mentor
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              See how our mock interviews helped candidates land their dream jobs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Software Engineer",
                role: "Tech Professional",
                story: "The technical mock interviews helped me identify my weak spots and practice system design. Got the offer after focused preparation!",
                improvement: "Significant confidence boost"
              },
              {
                name: "Product Manager",
                role: "Product Professional",
                story: "Behavioral interview prep was game-changing. Learned to structure my answers and showcase leadership experience effectively.",
                improvement: "Notable improvement in response quality"
              },
              {
                name: "Data Scientist",
                role: "Analytics Professional",
                story: "Elevator pitch coaching transformed how I present myself. Now I can confidently explain my value in 30 seconds.",
                improvement: "Enhanced first impression skills"
              }
            ].map((story, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <p className="text-sm text-gray-600">{story.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"{story.story}"</p>
                <div className="text-sm font-medium text-indigo-600">
                  {story.improvement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join professionals who've enhanced their interview skills with expert mentors
          </p>
          <button
            onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
          >
            Book a Call with Mentor
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewPage;