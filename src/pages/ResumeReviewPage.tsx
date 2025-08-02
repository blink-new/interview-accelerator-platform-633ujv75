import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, ArrowRight, Star, Clock, Users, Target, Zap, Award } from 'lucide-react';
import { CompletionBadge } from '@/components/ui/completion-badge';

const ResumeReviewPage = () => {
  const navigate = useNavigate();

  const reviewFeatures = [
    {
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems",
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "Content Enhancement",
      description: "Improve impact statements and quantify achievements",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Format & Design",
      description: "Professional formatting that stands out to recruiters",
      icon: <Award className="w-8 h-8" />
    },
    {
      title: "Industry Alignment",
      description: "Tailor content to your target industry and role",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const reviewPackages = [
    {
      title: "Basic Resume Review",
      duration: "30 minutes",
      description: "Quick assessment with actionable feedback",
      includes: [
        "ATS compatibility check",
        "Content review and suggestions",
        "Format optimization tips",
        "Written feedback report"
      ]
    },
    {
      title: "Comprehensive Review",
      duration: "60 minutes",
      description: "In-depth analysis with live feedback session",
      includes: [
        "Everything in Basic Review",
        "Live 1-on-1 feedback session",
        "Industry-specific recommendations",
        "Before/after comparison",
        "Follow-up email support"
      ]
    },
    {
      title: "Executive Review",
      duration: "90 minutes",
      description: "Senior-level resume optimization",
      includes: [
        "Everything in Comprehensive Review",
        "Executive presence optimization",
        "Leadership narrative development",
        "Board-ready formatting",
        "2-week revision support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <FileText className="w-12 h-12" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Professional Resume Review
              </h1>
              <CompletionBadge serviceId="resume-review" />
            </div>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Get expert feedback to make your resume stand out to recruiters
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>ATS Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>Industry Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>24hr Turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What We Review
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive analysis to maximize your interview potential
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviewFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Packages */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Review Package
            </h2>
            <p className="text-lg text-gray-600">
              Select the level of feedback that matches your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviewPackages.map((pkg, index) => (
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
      </div>

      {/* Success Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600">
            See how our resume reviews helped candidates land interviews
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Software Engineer",
              role: "Tech Professional",
              improvement: "Significant improvement in response rate",
              story: "The ATS optimization made all the difference. Started getting callbacks within a week of implementing the feedback."
            },
            {
              name: "Product Manager",
              role: "Product Professional",
              improvement: "Notable increase in recruiter interest",
              story: "The content enhancement helped me quantify my achievements better. Recruiters finally understood my impact."
            },
            {
              name: "Data Scientist",
              role: "Analytics Professional",
              improvement: "Substantial growth in interview opportunities",
              story: "The industry-specific recommendations transformed my resume. Got interviews at multiple top-tier companies."
            }
          ].map((story, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{story.name}</h4>
                  <p className="text-sm text-gray-600">{story.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{story.story}"</p>
              <div className="text-sm font-medium text-blue-600">
                {story.improvement}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join professionals who've enhanced their career prospects with expert feedback
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

export default ResumeReviewPage;