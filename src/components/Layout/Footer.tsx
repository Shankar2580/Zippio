import React from 'react';
import { Link } from 'react-router-dom';
import { Rewind as Kiwi, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <span className="text-white font-bold">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white">Zippio.ai</h3>
            </div>
            <p className="text-slate-400 text-sm">
              AI-powered video enhancement platform. Transform your videos with professional AI tools in minutes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Upload Video
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-slate-400 hover:text-white text-sm transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-slate-400" />
                <a href="mailto:support@zippio.ai" className="text-slate-400 hover:text-white text-sm transition-colors">
                  support@zippio.ai
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-slate-400" />
                <a href="tel:+1-555-0123" className="text-slate-400 hover:text-white text-sm transition-colors">
                  +1 (555) 012-3456
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-slate-400" />
                <span className="text-slate-400 text-sm">
                  San Francisco, CA
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {currentYear} Zippio.ai. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-slate-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
