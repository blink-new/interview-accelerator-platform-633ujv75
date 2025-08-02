import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Linkedin, Users, MessageSquare, TrendingUp, CheckCircle, ArrowRight, Target, Zap } from 'lucide-react';

const LinkedInStrategyPage = () => {
  const navigate = useNavigate();

  const strategies = [
    {
      title: "Profile Optimization",
      description: "Transform your LinkedIn profile into a magnet for recruiters",
      features: [
        "Headline optimization for maximum visibility",
        "Summary writing that tells your story",
        "Experience section enhancement",
        "Skills and endorsements strategy"
      ],
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Content Strategy",
      description: "Build thought leadership and increase your visibility",
      features: [
        "Content calendar planning",
        "Industry-specific post ideas",
        "Engagement optimization tactics",
        "Personal branding development"
      ],
      icon: <MessageSquare className="w-8 h-8" />
    },
    {
      title: "Networking & Outreach",
      description: "Connect with the right people and get noticed",
      features: [
        "Strategic connection building",
        "Personalized outreach templates",
        "Follow-up sequences",
        "Relationship nurturing tactics"
      ],
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "Referral System",
      description: "Leverage your network for job opportunities",
      features: [
        "Referral request strategies",
        "Alumni network activation",
        "Industry insider connections",
        "Warm introduction techniques"
      ],
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  const mentorPackages = [
    {
      title: "LinkedIn Audit & Strategy",
      duration: "60 minutes",
      description: "Complete profile review and personalized strategy session",
      includes: [
        "Profile optimization recommendations",
        "Content strategy roadmap",
        "Networking action plan",
        "30-day implementation guide"
      ]
    },
    {
      title: "Outreach & Referral Mastery",
      duration: "45 minutes",
      description: "Master the art of professional outreach and referrals",
      includes: [
        "Outreach message templates",
        "Referral request frameworks",
        "Follow-up strategies",
        "Relationship building tactics"
      ]
    },
    {
      title: "Complete LinkedIn Transformation",
      duration: "90 minutes",
      description: "End-to-end LinkedIn makeover with ongoing support",
      includes: [
        "Full profile rewrite",
        "Content calendar creation",
        "Networking strategy",
        "2-week follow-up session"
      ]
    }
  ];

  const successMetrics = [
    { metric: "Profile Views", increase: "+340%" },
    { metric: "Connection Requests", increase: "+280%" },
    { metric: "Recruiter Messages", increase: "+450%" },
    { metric: "Interview Invitations", increase: "+220%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Linkedin className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              LinkedIn & Outreach Strategy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Transform your LinkedIn presence and master professional networking
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>3x More Profile Views</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>4x More Recruiter Messages</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>2x More Interview Invites</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complete LinkedIn Transformation
          </h2>
          <p className="text-lg text-gray-600">
            Our proven 4-pillar approach to LinkedIn success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">
                {strategy.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {strategy.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {strategy.description}
              </p>
              <ul className="space-y-2">
                {strategy.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Proven Results
            </h2>
            <p className="text-lg text-gray-600">
              Average improvements our clients see within 30 days
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">{metric.increase}</div>
                  <div className="text-blue-100">{metric.metric}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mentor Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Package
          </h2>
          <p className="text-lg text-gray-600">
            Work with LinkedIn experts to accelerate your career
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {mentorPackages.map((pkg, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.title}
                  </h3>
                  <div className="text-gray-500">{pkg.duration}</div>
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
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Book a Call with Mentor
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Case Study: From Invisible to In-Demand
              </h2>
              <p className="text-lg text-gray-600">
                How a professional transformed their LinkedIn presence and landed their dream job
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-800 mb-4">Before</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• 89 connections</li>
                  <li>• 12 profile views/month</li>
                  <li>• 0 recruiter messages</li>
                  <li>• Generic headline</li>
                  <li>• No content strategy</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">After (30 days)</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• 847 connections</li>
                  <li>• 156 profile views/month</li>
                  <li>• 23 recruiter messages</li>
                  <li>• Optimized headline</li>
                  <li>• Consistent content posting</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-700 mb-6">
                "The LinkedIn strategy session completely changed my job search. Within 30 days, I had multiple interview opportunities and landed a Senior Developer role at a Fortune 500 company."
              </p>
              <div className="text-gray-600">
                <strong>Software Professional</strong> - Senior Developer at Tech Company
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your LinkedIn Presence?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join professionals who've enhanced their LinkedIn presence with expert strategies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
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

export default LinkedInStrategyPage;