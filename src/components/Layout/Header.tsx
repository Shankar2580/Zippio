import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Upload } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setSidebarOpen } from '../../store/slices/uiSlice';
import Button from '../UI/Button';
import Logo from '../../Assets/ZippioLogo2.jpeg';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector(state => state.ui);
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 backdrop-blur-md border-b border-slate-800/50 fixed top-0 z-50 w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
              aria-label="Toggle sidebar"
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <Link to="/" className="flex items-center space-x-3">
              <img src={Logo} alt="Zippio.ai" className="h-10 w-auto" />
            </Link>
          </div>

          <nav className="hidden xl:flex items-center space-x-1 flex-1 justify-center max-w-2xl">
            {isAuthenticated && (
              <>
                <Link to="/" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                  Home
                </Link>
                <Link to="/dashboard" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                  Dashboard
                </Link>
                <Link to="/settings" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                  Settings
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            {!isAuthenticated ? (
              <>
                <Button onClick={() => navigate('/login')} size="sm" variant="outline">
                  Login
                </Button>
                <Button onClick={() => navigate('/register')} size="sm">
                  Sign Up
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/upload">
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;