import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Chrome, Zap, Target, FileText, TrendingUp, ArrowLeft, Download, Star, CheckCircle } from 'lucide-react';
import { CompletionBadge } from '@/components/ui/completion-badge';

const AIAssistantPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Job Description Analysis",
      description: "Automatically extracts key requirements, skills, and qualifications from any job posting"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Personalized Recommendations",
      description: "Get tailored suggestions for resume optimization based on specific job requirements"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Application Tracking",
      description: "Track your applications and get insights on your job search performance"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Suggestions",
      description: "Instant feedback while browsing job boards like LinkedIn, Indeed, and Glassdoor"
    }
  ];

  const supportedSites = [
    { name: "LinkedIn", logo: "🔗", users: "50M+" },
    { name: "Indeed", logo: "🔍", users: "30M+" },
    { name: "Glassdoor", logo: "🏢", users: "20M+" },
    { name: "AngelList", logo: "👼", users: "5M+" },
    { name: "Monster", logo: "👹", users: "15M+" },
    { name: "ZipRecruiter", logo: "📮", users: "10M+" }
  ];

  const testimonials = [
    {
      name: "Software Engineer",
      role: "Tech Professional",
      company: "Technology Sector",
      quote: "The AI assistant helped me tailor my applications effectively. I saw significant improvement in my interview rate!",
      rating: 5
    },
    {
      name: "Product Manager",
      role: "Product Professional",
      company: "Product Development",
      quote: "Game-changer for job hunting. The personalized recommendations were very helpful.",
      rating: 5
    },
    {
      name: "Data Scientist",
      role: "Analytics Professional",
      company: "Data Analytics",
      quote: "Saved me hours of manual work. The job description analysis is quite accurate.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bot className="h-12 w-12 text-white" />
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="text-5xl font-bold text-gray-900">
              Your Personal AI
              <span className="text-indigo-600"> Job Assistant</span>
            </h1>
            <CompletionBadge serviceId="ai-setup" />
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Install our Chrome extension and get personalized recommendations for every job application. 
            Our AI analyzes job descriptions and provides tailored suggestions to maximize your chances.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Chrome className="h-5 w-5 mr-2" />
              Chrome Extension
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              100% Free
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
              4.9/5 Rating
            </Badge>
          </div>

          <Button size="lg" className="text-lg px-8 py-3">
            <Download className="h-5 w-5 mr-2" />
            Install Chrome Extension
          </Button>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <CardTitle>Install Extension</CardTitle>
                <CardDescription>Add our Chrome extension to your browser in one click</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <CardTitle>Browse Jobs</CardTitle>
                <CardDescription>Visit any job board and our AI automatically analyzes job descriptions</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <CardTitle>Get Recommendations</CardTitle>
                <CardDescription>Receive personalized suggestions to optimize your application</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
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
        </section>

        {/* Supported Job Boards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Works on All Major Job Boards</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {supportedSites.map((site, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">{site.logo}</div>
                  <h3 className="font-semibold mb-1">{site.name}</h3>
                  <p className="text-sm text-gray-500">{site.users} users</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Demo Section */}
        <section className="mb-16">
          <Card className="overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">See It In Action</CardTitle>
              <CardDescription>Watch how our AI assistant analyzes job descriptions and provides recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Bot className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700">Interactive Demo</p>
                  <p className="text-sm text-gray-500">Click to see the AI assistant in action</p>
                  <Button className="mt-4">
                    Watch Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.quote}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="mb-16">
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-800">Privacy & Security First</CardTitle>
              <CardDescription className="text-green-700">
                Your data is safe and secure with our AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">No Data Storage</h3>
                  <p className="text-sm text-green-700">We don't store your personal information</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">Local Processing</h3>
                  <p className="text-sm text-green-700">Analysis happens on your device</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">GDPR Compliant</h3>
                  <p className="text-sm text-green-700">Fully compliant with privacy regulations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-indigo-600 text-white border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Job Search?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join professionals who've enhanced their job search with our AI assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-indigo-600">
                  <Download className="h-5 w-5 mr-2" />
                  Install Free Extension
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-indigo-600"
                  onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
                >
                  Book a Call with Mentor
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AIAssistantPage;