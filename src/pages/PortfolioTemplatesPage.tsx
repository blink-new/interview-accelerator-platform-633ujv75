import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Download, Star, Code, Palette, Zap, ArrowLeft } from 'lucide-react';
import { CompletionBadge } from '@/components/ui/completion-badge';

const PortfolioTemplatesPage = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const portfolioTemplates = [
    {
      id: 1,
      name: "Software Engineer Portfolio",
      description: "Modern full-stack developer portfolio with project showcases",
      image: "/api/placeholder/400/300",
      tech: ["React", "Node.js", "Python", "AWS"],
      features: ["Project Gallery", "Skills Matrix", "GitHub Integration", "Blog Section"],
      rating: 4.9,
      downloads: 1247,
      preview: "https://demo-portfolio-1.example.com",
      category: "Development"
    },
    {
      id: 2,
      name: "Data Scientist Portfolio",
      description: "Analytics-focused portfolio with interactive visualizations",
      image: "/api/placeholder/400/300",
      tech: ["Python", "R", "Tableau", "SQL"],
      features: ["Data Visualizations", "Jupyter Notebooks", "Case Studies", "Research Papers"],
      rating: 4.8,
      downloads: 892,
      preview: "https://demo-portfolio-2.example.com",
      category: "Data Science"
    },
    {
      id: 3,
      name: "Product Manager Portfolio",
      description: "Product-focused portfolio with detailed case studies",
      image: "/api/placeholder/400/300",
      tech: ["Strategy", "Analytics", "Design", "Roadmapping"],
      features: ["Product Case Studies", "Metrics Dashboard", "User Research", "Roadmap Visualization"],
      rating: 4.9,
      downloads: 756,
      preview: "https://demo-portfolio-3.example.com",
      category: "Product"
    },
    {
      id: 4,
      name: "UX Designer Portfolio",
      description: "Design portfolio with interactive prototypes and case studies",
      image: "/api/placeholder/400/300",
      tech: ["Figma", "Sketch", "Prototyping", "User Research"],
      features: ["Interactive Prototypes", "Design Process", "User Journey Maps", "A/B Test Results"],
      rating: 4.9,
      downloads: 1034,
      preview: "https://demo-portfolio-4.example.com",
      category: "Design"
    },
    {
      id: 5,
      name: "DevOps Engineer Portfolio",
      description: "Infrastructure-focused technical portfolio with system architecture",
      image: "/api/placeholder/400/300",
      tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
      features: ["Architecture Diagrams", "Infrastructure Projects", "Monitoring Dashboards", "CI/CD Pipelines"],
      rating: 4.7,
      downloads: 623,
      preview: "https://demo-portfolio-5.example.com",
      category: "DevOps"
    }
  ];

  const handleSelectTemplate = (templateId: number) => {
    setSelectedTemplate(templateId);
    // Here you would typically handle the purchase/selection logic
    navigate('/?tab=portfolio&template=' + templateId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
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
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Choose Your Portfolio Template
              </h1>
              <CompletionBadge serviceId="portfolio-consultation" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our professionally designed portfolio templates, each tailored for specific roles and industries.
            </p>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <Palette className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Portfolio Preview</p>
                  </div>
                </div>
                <Badge className="absolute top-2 right-2" variant="secondary">
                  {template.category}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {template.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span>{template.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Tech Stack */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Tech Stack:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.tech.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {template.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{template.downloads} downloads</span>
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span>Instant download</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{template.name}</DialogTitle>
                        <DialogDescription>
                          Preview of the portfolio template
                        </DialogDescription>
                      </DialogHeader>
                      <div className="w-full h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Code className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
                          <p className="text-lg font-medium text-gray-700">Portfolio Preview</p>
                          <p className="text-sm text-gray-500">Interactive demo would be shown here</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    Select Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <section className="mt-16 bg-white rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Included</h2>
            <p className="text-gray-600">Every template comes with everything you need to create a professional portfolio</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Complete Source Code</h3>
              <p className="text-gray-600">Fully customizable HTML, CSS, and JavaScript code</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Design Assets</h3>
              <p className="text-gray-600">Icons, images, and design files included</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Setup Guide</h3>
              <p className="text-gray-600">Step-by-step instructions for customization</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <div className="bg-indigo-600 text-white rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-xl mb-6 opacity-90">
              Book a consultation with our portfolio experts to find the perfect template for your career goals.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => window.open('https://calendly.com/mentorque-edu/30min?month=2025-08', '_blank')}
              className="text-indigo-600"
            >
              Book a Call with Mentor
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioTemplatesPage;