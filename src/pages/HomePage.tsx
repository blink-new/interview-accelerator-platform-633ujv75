import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Lock, Star, Users, Calendar, FileText, Bot, MessageSquare, Mic, Code, Brain, Target } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const isStepCompleted = (step: number) => completedSteps.includes(step);
  const isStepLocked = (step: number) => {
    if (step === 1) return false; // First step is always unlocked
    return !isStepCompleted(step - 1);
  };

  const handleStepClick = (step: number, path: string) => {
    if (!isStepLocked(step)) {
      navigate(path);
    }
  };

  const portfolioTemplates = [
    {
      id: 1,
      name: "Software Engineer",
      image: "/api/placeholder/300/200",
      tech: ["React", "Node.js", "Python"],
      preview: "Modern full-stack developer portfolio"
    },
    {
      id: 2,
      name: "Data Scientist",
      image: "/api/placeholder/300/200",
      tech: ["Python", "ML", "Tableau"],
      preview: "Analytics-focused portfolio with visualizations"
    },
    {
      id: 3,
      name: "Product Manager",
      image: "/api/placeholder/300/200",
      tech: ["Strategy", "Analytics", "Design"],
      preview: "Product-focused portfolio with case studies"
    },
    {
      id: 4,
      name: "UX Designer",
      image: "/api/placeholder/300/200",
      tech: ["Figma", "Sketch", "Prototyping"],
      preview: "Design portfolio with interactive prototypes"
    },
    {
      id: 5,
      name: "DevOps Engineer",
      image: "/api/placeholder/300/200",
      tech: ["AWS", "Docker", "Kubernetes"],
      preview: "Infrastructure-focused technical portfolio"
    }
  ];

  const mockInterviews = [
    {
      id: 1,
      title: "Elevator Pitch",
      description: "Perfect your 30-second introduction with MAANG engineers",
      icon: <Mic className="h-6 w-6" />,
      duration: "30 mins",
      price: "$89",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Competency Interview",
      description: "Behavioral questions and soft skills assessment",
      icon: <MessageSquare className="h-6 w-6" />,
      duration: "45 mins",
      price: "$129",
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Technical Interview",
      description: "Coding challenges and system design with tech leads",
      icon: <Code className="h-6 w-6" />,
      duration: "60 mins",
      price: "$179",
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "Final Behavioral Round",
      description: "Leadership scenarios and culture fit with senior engineers",
      icon: <Brain className="h-6 w-6" />,
      duration: "45 mins",
      price: "$149",
      difficulty: "Expert"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Land Your Dream Job
            <span className="text-indigo-600"> Faster</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Complete our structured 4-step program with expert mentors and get interview-ready in weeks, not months.
          </p>
        </div>
      </section>

      {/* 4 Major Steps */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Your Path to Success</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1: Resume Review */}
            <Card className={`relative transition-all duration-300 hover:shadow-lg ${isStepLocked(1) ? 'opacity-50' : 'cursor-pointer hover:scale-105'}`}
                  onClick={() => handleStepClick(1, '/mentors?service=resume-review')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-bold">1</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">Book Your 1-1 Call Session</CardTitle>
                      <CardDescription>Get your resume reviewed by experts</CardDescription>
                    </div>
                  </div>
                  {isStepCompleted(1) ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : isStepLocked(1) ? (
                    <Lock className="h-6 w-6 text-gray-400" />
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Start your journey with a comprehensive resume review. Our experts will analyze your resume and provide actionable feedback to make it ATS-friendly and recruiter-approved.
                </p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">45 mins</Badge>
                  <Badge variant="outline">$79</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">4.9/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Resume Rebuild */}
            <Card className={`relative transition-all duration-300 hover:shadow-lg ${isStepLocked(2) ? 'opacity-50' : 'cursor-pointer hover:scale-105'}`}
                  onClick={() => handleStepClick(2, '/mentors?service=resume-rebuild')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 font-bold">2</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">Rebuild Your Resume</CardTitle>
                      <CardDescription>Work with an expert to rebuild from scratch</CardDescription>
                    </div>
                  </div>
                  {isStepCompleted(2) ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : isStepLocked(2) ? (
                    <Lock className="h-6 w-6 text-gray-400" />
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Transform your resume completely. Based on the feedback from step 1, work one-on-one with a mentor to rebuild your resume for maximum impact.
                </p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">60 mins</Badge>
                  <Badge variant="outline">$129</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">4.8/5</span>
                  </div>
                </div>
                {isStepLocked(2) && (
                  <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 font-medium">Complete Step 1 to unlock</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 3: Portfolio Builder */}
            <Card className={`relative transition-all duration-300 hover:shadow-lg ${isStepLocked(3) ? 'opacity-50' : 'cursor-pointer hover:scale-105'}`}
                  onClick={() => handleStepClick(3, '/portfolio-templates')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">Build Your Portfolio</CardTitle>
                      <CardDescription>Choose from professional templates</CardDescription>
                    </div>
                  </div>
                  {isStepCompleted(3) ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : isStepLocked(3) ? (
                    <Lock className="h-6 w-6 text-gray-400" />
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Create a stunning portfolio that showcases your skills. Choose from 5 professionally designed templates tailored for different roles.
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary">Self-paced</Badge>
                  <Badge variant="outline">$49</Badge>
                  <Badge variant="outline">5 Templates</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {portfolioTemplates.slice(0, 3).map((template) => (
                    <div key={template.id} className="text-center">
                      <div className="w-full h-16 bg-gray-200 rounded mb-1"></div>
                      <p className="text-xs text-gray-600">{template.name}</p>
                    </div>
                  ))}
                </div>
                {isStepLocked(3) && (
                  <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 font-medium">Complete Step 2 to unlock</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 4: AI Assistant */}
            <Card className={`relative transition-all duration-300 hover:shadow-lg ${isStepLocked(4) ? 'opacity-50' : 'cursor-pointer hover:scale-105'}`}
                  onClick={() => handleStepClick(4, '/ai-assistant')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">4</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">Get Your Personal AI Assistant</CardTitle>
                      <CardDescription>Chrome extension for job applications</CardDescription>
                    </div>
                  </div>
                  {isStepCompleted(4) ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : isStepLocked(4) ? (
                    <Lock className="h-6 w-6 text-gray-400" />
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Install our Chrome extension that scrapes job descriptions and provides personalized recommendations for each application.
                </p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">Chrome Extension</Badge>
                  <Badge variant="outline">Free</Badge>
                  <div className="flex items-center gap-1">
                    <Bot className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">AI Powered</span>
                  </div>
                </div>
                {isStepLocked(4) && (
                  <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 font-medium">Complete Step 3 to unlock</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Optional Services */}
      <section className="px-4 pb-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Optional Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/mentors?service=interview-cheatsheet')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-indigo-600" />
                  <div>
                    <CardTitle>Interview Cheatsheet Preparation</CardTitle>
                    <CardDescription>Get a personalized interview cheatsheet</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Work with a mentor to create a comprehensive cheatsheet tailored to your target companies and roles.
                </p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">45 mins</Badge>
                  <Badge variant="outline">$99</Badge>
                  <Badge variant="outline">Optional</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/mentors?service=linkedin-strategy')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle>LinkedIn & Outreach Strategy</CardTitle>
                    <CardDescription>Master networking and referrals</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn proven strategies for LinkedIn optimization, cold outreach, and getting referrals from industry professionals.
                </p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">60 mins</Badge>
                  <Badge variant="outline">$119</Badge>
                  <Badge variant="outline">Optional</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mock Interviews */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mock Interviews with MAANG Engineers</h2>
            <p className="text-xl text-gray-600">Practice with engineers from top tech companies</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockInterviews.map((interview) => (
              <Card key={interview.id} className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                    onClick={() => navigate(`/booking?type=mock-interview&category=${interview.title.toLowerCase().replace(/\s+/g, '-')}`)}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {interview.icon}
                  </div>
                  <CardTitle className="text-lg">{interview.title}</CardTitle>
                  <CardDescription className="text-sm">{interview.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2 mb-4">
                    <Badge variant="secondary">{interview.duration}</Badge>
                    <Badge variant="outline">{interview.difficulty}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-indigo-600 mb-4">{interview.price}</div>
                  <Button className="w-full">Book Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful candidates who've accelerated their careers with our proven system.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/mentors?service=resume-review')}
            className="text-indigo-600"
          >
            Start Your Journey Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;