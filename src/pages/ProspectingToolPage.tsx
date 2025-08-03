import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Users, 
  Target, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Database, 
  Mail, 
  Linkedin,
  ArrowLeft,
  Download,
  Star
} from 'lucide-react';

const ProspectingToolPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Company HR Database",
      description: "Access comprehensive HR contact information for companies across industries"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Individual & Bulk Extraction",
      description: "Extract HR details for single companies or process multiple companies at once"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Contact Information",
      description: "Get email addresses, LinkedIn profiles, and direct contact details"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Response Optimization",
      description: "Templates and strategies designed to get more responses from HR professionals"
    }
  ];

  const toolCapabilities = [
    {
      title: "HR Contact Extraction",
      description: "Extract HR manager and recruiter contact details",
      includes: [
        "HR Manager email addresses",
        "Recruiter LinkedIn profiles", 
        "Direct phone numbers when available",
        "Department-specific contacts"
      ]
    },
    {
      title: "Bulk Company Processing",
      description: "Process multiple companies simultaneously",
      includes: [
        "Upload company lists via CSV",
        "Batch processing up to 100 companies",
        "Export results in multiple formats",
        "Progress tracking and reporting"
      ]
    },
    {
      title: "Referral Optimization",
      description: "Maximize your referral success rate",
      includes: [
        "Employee contact information",
        "Referral request templates",
        "Follow-up sequences",
        "Success rate tracking"
      ]
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for individual job seekers",
      features: [
        "50 company extractions/month",
        "Individual company lookup",
        "Basic contact information",
        "Email templates included"
      ],
      popular: false
    },
    {
      name: "Professional", 
      price: "$99",
      period: "/month",
      description: "For serious job seekers and career changers",
      features: [
        "200 company extractions/month",
        "Bulk processing (up to 50 companies)",
        "Advanced contact details",
        "Referral optimization templates",
        "LinkedIn integration"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199", 
      period: "/month",
      description: "For career coaches and agencies",
      features: [
        "Unlimited extractions",
        "Bulk processing (unlimited)",
        "API access",
        "Custom templates",
        "Priority support",
        "Team collaboration tools"
      ],
      popular: false
    }
  ];

  const successStats = [
    { metric: "Response Rate", value: "3.2x higher" },
    { metric: "Referral Success", value: "85%" },
    { metric: "Time Saved", value: "15+ hours/week" },
    { metric: "Industry Coverage", value: "Comprehensive" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Database className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              HR Prospecting Tool
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Extract HR details for companies instantly, both individually and in bulk
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>Individual & Bulk Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>3x Higher Response Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Comprehensive Database</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful HR Prospecting Features
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to connect with HR professionals and get more referrals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Tool Capabilities */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You Can Do
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive tools for HR prospecting and referral optimization
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {toolCapabilities.map((capability, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{capability.title}</CardTitle>
                  <CardDescription>{capability.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {capability.includes.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stats */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Proven Results
            </h2>
            <p className="text-lg text-gray-600">
              See the impact our prospecting tool has on your job search
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {successStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.metric}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600">
            Select the plan that fits your job search needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${
              plan.popular ? 'border-green-500 shadow-lg scale-105' : ''
            }`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-green-600">
                  {plan.price}
                  <span className="text-lg text-gray-500">{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                  onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple 3-step process to get HR contacts and increase your referral success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Companies</h3>
              <p className="text-gray-600">Enter company names individually or upload a CSV file for bulk processing</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Extract Contacts</h3>
              <p className="text-gray-600">Our tool automatically finds HR managers, recruiters, and employee contacts</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Outreach</h3>
              <p className="text-gray-600">Use our optimized templates to reach out and get more responses</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Supercharge Your Referral Game?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Get instant access to HR contacts and start getting more referrals today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-green-600"
              onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
            >
              Book a Demo Call
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProspectingToolPage;