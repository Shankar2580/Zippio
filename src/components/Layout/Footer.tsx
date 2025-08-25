import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Zippio.ai</h3>
            </div>
            <p className="text-slate-400 text-sm">
              AI-powered video enhancement platform.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/upload" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Upload Video
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Video Library
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
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

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} Zippio.ai. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
