import React, { useState } from 'react';
import { User, Settings, CreditCard, Save, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setUser } from '../store/slices/userSlice';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user.name || 'John Doe',
    email: user.email || 'john@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [socialCredentials, setSocialCredentials] = useState({
    youtube: { apiKey: '', channelId: '' },
    facebook: { accessToken: '', pageId: '' },
    instagram: { accessToken: '', businessAccountId: '' },
    twitter: { apiKey: '', apiSecret: '', accessToken: '' },
    linkedin: { clientId: '', clientSecret: '' },
    tiktok: { accessToken: '', openId: '' },
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'videos', name: 'My Videos', icon: Video },
    { id: 'social', name: 'Social Media', icon: Settings },
  ];

  const handleSaveProfile = () => {
    dispatch(setUser({
      name: formData.name,
      email: formData.email,
    }));
    alert('Profile updated successfully!');
  };

  const handleSavePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (formData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    alert('Password updated successfully!');
    setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  const handleSaveSocialCredentials = () => {
    // In a real app, this would save to backend
    alert('Social media credentials saved successfully!');
  };

  const handleSocialCredentialChange = (platform: string, field: string, value: string) => {
    setSocialCredentials(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-300">
            Manage your account, security, and social media credentials
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <tab.icon size={18} />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-8">Profile Settings</h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-700">
                    <Button onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>

                  {/* Security (moved from Security tab) */}
                  <div className="pt-8 border-t border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <div className="pt-2">
                        <Button onClick={handleSavePassword}>
                          <Save className="w-4 h-4 mr-2" />
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'billing' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Billing</h2>
                <p className="text-slate-400 mb-6">Manage your subscription plan and usage.</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Current Plan</h3>
                    <p className="text-slate-300">Starter</p>
                    <p className="text-slate-400 text-sm">50 videos/month</p>
                    <div className="pt-4">
                      <Button>Upgrade Plan</Button>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Usage</h3>
                    <p className="text-slate-300">Videos used this month: 0/50</p>
                    <div className="pt-4">
                      <Button variant="outline">Buy Add-ons</Button>
                    </div>
                  </Card>
                </div>
              </Card>
            )}

            {activeTab === 'videos' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">My Videos</h2>
                <p className="text-slate-400 mb-6">View and manage your uploaded and processed videos.</p>
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </Card>
            )}

            {activeTab === 'social' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Social Media Credentials</h2>
                <p className="text-slate-400 mb-8">
                  Add your social media platform credentials to enable automatic video sharing
                </p>
                <div className="mb-6">
                  <Button onClick={() => navigate('/social-media')}>
                    Go to Social Media Setup
                  </Button>
                </div>
                
                
              </Card>
            )}

            {/* Security tab removed; its contents moved into Profile */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;