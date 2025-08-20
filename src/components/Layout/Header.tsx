import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Rewind as Kiwi, Menu, X, Settings, Video, Share2, LogOut, User, Upload } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setSidebarOpen } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import Button from '../UI/Button';
import clsx from 'clsx';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector(state => state.ui);
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  const navigation = [
    { name: 'Home', href: '/', icon: Kiwi },
    { name: 'Upload', href: '/upload', icon: Upload },
    { name: 'My Videos', href: '/dashboard', icon: Video },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 fixed top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-white">Zippio.ai</h1>
                <p className="text-xs text-slate-400">AI Video Enhancement</p>
              </div>
            </Link>
          </div>

          <nav className="hidden xl:flex items-center space-x-1 flex-1 justify-center max-w-2xl">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          <Link
            to="/social-media"
            className={clsx(
              'flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap',
              location.pathname === '/social-media'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            )}
          >
            <Share2 size={18} />
            <span>Social Media</span>
          </Link>
          <Link
            to="/settings"
            className={clsx(
              'flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap',
              location.pathname === '/settings'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            )}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            {isAuthenticated ? (
              <>
                
                
                <div className="flex items-center space-x-2">
                  {user?.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover hidden sm:block"
                    />
                  )}
                  <span className="hidden lg:block text-slate-300 max-w-24 truncate">{user?.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-slate-400 hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline ml-1">Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <Button onClick={() => navigate('/login')} size="sm">
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Login</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;