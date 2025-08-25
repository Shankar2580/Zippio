import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Zippio.ai
              </h3>
            </div>
            <p className="text-slate-300 text-base leading-relaxed max-w-md">
              Transform your videos with cutting-edge AI technology. Professional enhancement, 
              automated distribution, and powerful analytics - all in one platform.
            </p>
            
            {/* Social Media */}
            <div className="space-y-3">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Follow Us</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-200 hover:scale-110">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-500 transition-all duration-200 hover:scale-110">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-600 transition-all duration-200 hover:scale-110">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 transition-all duration-200 hover:scale-110">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg">Quick Links</h4>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/upload" className="flex items-center text-slate-300 hover:text-white text-base transition-colors group">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                Upload Video
              </Link>
              <Link to="/videos" className="flex items-center text-slate-300 hover:text-white text-base transition-colors group">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:bg-purple-400 transition-colors"></span>
                Video Library
              </Link>
              <Link to="/dashboard" className="flex items-center text-slate-300 hover:text-white text-base transition-colors group">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 group-hover:bg-emerald-400 transition-colors"></span>
                Dashboard
              </Link>
              <Link to="/settings" className="flex items-center text-slate-300 hover:text-white text-base transition-colors group">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:bg-orange-400 transition-colors"></span>
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} Zippio.ai. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
