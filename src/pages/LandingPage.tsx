import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Music, Type, Download, Star, Check, ArrowRight, Zap, Crown, Play, Sparkles } from 'lucide-react';
import { useAppSelector } from '../hooks';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/Upload');
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-sm text-slate-300">AI-Powered Video Enhancement</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
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
                className="group bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
              >
                Start Creating Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              {/* <Button
                variant="outline"
                size="xl"
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-5 h-5 mr-2" />
                See Features
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
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
              <Card key={index} className="p-6 text-center group hover:bg-slate-800/50 transition-all duration-300" hover>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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
      <section className="py-20 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
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
            
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
              {processSteps.map((item, index) => (
                <div key={index} className="relative text-center group">
                  <div className="w-20 h-20 bg-slate-800 border-4 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-emerald-600 p-1">
            <Card className="p-12 bg-slate-900 rounded-3xl">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your Videos?
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Join thousands of creators using AI-powered video enhancement
              </p>
              <Button
                size="xl"
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
              >
                Start Creating Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;