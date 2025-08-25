import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Settings, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setSidebarOpen } from '../../store/slices/uiSlice';
import clsx from 'clsx';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector(state => state.ui);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const closeSidebar = () => dispatch(setSidebarOpen(false));

  if (!sidebarOpen) return null;

  return (
    <>
      <div 
        className="xl:hidden fixed inset-0 bg-black/50 z-40"
        onClick={closeSidebar}
      />
      
      <div className="xl:hidden fixed left-0 top-0 h-full w-64 bg-slate-900/98 backdrop-blur-md z-50 transform transition-transform border-r border-slate-800">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeSidebar}
                className={clsx(
                  'flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                )}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;