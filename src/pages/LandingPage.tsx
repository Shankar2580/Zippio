import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Music, Type, Download, Star, Check, ArrowRight, Zap, Crown } from 'lucide-react';
import { useAppSelector } from '../hooks';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const features = [
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Drag and drop your videos with instant preview and validation'
    },
    {
      icon: Music,
      title: 'AI Music',
      description: 'AI-powered background music selection that matches your content perfectly'
    },
    {
      icon: Type,
      title: 'Smart Captions',
      description: 'Automatic caption generation with professional styling options'
    },
    {
      icon: Download,
      title: 'Multi-Platform',
      description: 'Download or share directly to social media platforms'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Creator',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Zippio.ai transformed my content creation workflow. The AI enhancements are incredible!'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'YouTuber',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Professional results in minutes. The social media integration saves me hours of work.'
    },
    {
      name: 'Elena Popov',
      role: 'Social Media Manager',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Perfect for managing multiple clients. The quality is consistently outstanding.'
    }
  ];

  const processSteps = [
    { step: '01', title: 'Upload', description: 'Upload your video and let AI analyze it', icon: Upload },
    { step: '02', title: 'Enhance', description: 'AI adds music, captions, and effects automatically', icon: Zap },
    { step: '03', title: 'Share', description: 'Download or post directly to social media', icon: Download }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-emerald-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                AI-Powered Video
              </span>
              <br />
              <span className="text-white">Enhancement</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Transform your videos with professional AI enhancement. Add music, captions, and effects automatically, 
              then share directly to all your social media platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="xl"
                onClick={handleGetStarted}
                className="group"
              >
                Start Creating Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" onClick={handleGetStarted}>
                View Demo
              </Button>
            </div>
            <p className="text-slate-400 mt-4">
              Professional video enhancement starting at $50
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful AI Features
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Everything you need to create professional videos with AI assistance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center" hover>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Three Simple Steps
            </h2>
            <p className="text-slate-300 text-lg">
              From upload to social media in minutes
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transform -translate-y-1/2" />
            
            <div className="grid lg:grid-cols-3 gap-8">
              {processSteps.map((item, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-20 h-20 bg-slate-800 border-4 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <item.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Creators Worldwide
            </h2>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-slate-300 ml-2">4.9/5 from 10,000+ creators</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

    

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Videos?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Join thousands of creators using AI-powered video enhancement
            </p>
            <Button
              size="xl"
              onClick={handleGetStarted}
              className="group"
            >
              Start Creating Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;