import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 w-full overflow-x-hidden flex flex-col">
      <Header />
      <Sidebar />
      <main className="relative w-full flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;