import React, { useState } from 'react';
import { User, Settings, CreditCard, Bell, Key, Download, Trash2, Save } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setUser } from '../store/slices/userSlice';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
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
    { id: 'social', name: 'Social Media', icon: Settings },
    { id: 'security', name: 'Security', icon: Key },
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
                </div>
              </Card>
            )}

            {activeTab === 'social' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Social Media Credentials</h2>
                <p className="text-slate-400 mb-8">
                  Add your social media platform credentials to enable automatic video sharing
                </p>
                
                <div className="space-y-8">
                  {/* YouTube */}
                  <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">🎥</span>
                      <h3 className="text-lg font-semibold text-white">YouTube</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          API Key
                        </label>
                        <input
                          type="password"
                          value={socialCredentials.youtube.apiKey}
                          onChange={(e) => handleSocialCredentialChange('youtube', 'apiKey', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter YouTube API Key"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Channel ID
                        </label>
                        <input
                          type="text"
                          value={socialCredentials.youtube.channelId}
                          onChange={(e) => handleSocialCredentialChange('youtube', 'channelId', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter Channel ID"
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Facebook */}
                  <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">📘</span>
                      <h3 className="text-lg font-semibold text-white">Facebook</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Access Token
                        </label>
                        <input
                          type="password"
                          value={socialCredentials.facebook.accessToken}
                          onChange={(e) => handleSocialCredentialChange('facebook', 'accessToken', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter Facebook Access Token"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Page ID
                        </label>
                        <input
                          type="text"
                          value={socialCredentials.facebook.pageId}
                          onChange={(e) => handleSocialCredentialChange('facebook', 'pageId', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter Page ID"
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Instagram */}
                  <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">📷</span>
                      <h3 className="text-lg font-semibold text-white">Instagram</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Access Token
                        </label>
                        <input
                          type="password"
                          value={socialCredentials.instagram.accessToken}
                          onChange={(e) => handleSocialCredentialChange('instagram', 'accessToken', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter Instagram Access Token"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Business Account ID
                        </label>
                        <input
                          type="text"
                          value={socialCredentials.instagram.businessAccountId}
                          onChange={(e) => handleSocialCredentialChange('instagram', 'businessAccountId', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter Business Account ID"
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Twitter/X */}
                  <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">🐦</span>
                      <h3 className="text-lg font-semibold text-white">Twitter/X</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          API Key
                        </label>
                        <input
                          type="password"
                          value={socialCredentials.twitter.apiKey}
                          onChange={(e) => handleSocialCredentialChange('twitter', 'apiKey', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter API Key"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          API Secret
                        </label>
                        <input
                          type="password"
                          value={socialCredentials.twitter.apiSecret}
                          onChange={(e) => handleSocialCredentialChange('twitter', 'apiSecret', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter API Secret"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Access Token
                        </label>
                        <input
                          type="password"
                          value={socialCredentials.twitter.accessToken}
                          onChange={(e) => handleSocialCredentialChange('twitter', 'accessToken', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter Access Token"
                        />
                      </div>
                    </div>
                  </Card>

                  {/* LinkedIn */}
                  <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">💼</span>
                      <h3 className="text-lg font-semibold text-white">LinkedIn</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Client ID
                        </label>
                        <input
                          type="password"
                          value={socialCredentials.linkedin.clientId}
                          onChange={(e) => handleSocialCredentialChange('linkedin', 'clientId', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter Client ID"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Client Secret
                        </label>
                        <input
                          type="password"
                          value={socialCredentials.linkedin.clientSecret}
                          onChange={(e) => handleSocialCredentialChange('linkedin', 'clientSecret', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter Client Secret"
                        />
                      </div>
                    </div>
                  </Card>

                  {/* TikTok */}
                  <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">🎵</span>
                      <h3 className="text-lg font-semibold text-white">TikTok</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Access Token
                        </label>
                        <input
                          type="password"
                          value={socialCredentials.tiktok.accessToken}
                          onChange={(e) => handleSocialCredentialChange('tiktok', 'accessToken', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter Access Token"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Open ID
                        </label>
                        <input
                          type="text"
                          value={socialCredentials.tiktok.openId}
                          onChange={(e) => handleSocialCredentialChange('tiktok', 'openId', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter Open ID"
                        />
                      </div>
                    </div>
                  </Card>

                  <div className="pt-6 border-t border-slate-700">
                    <Button onClick={handleSaveSocialCredentials}>
                      <Save className="w-4 h-4 mr-2" />
                      Save All Credentials
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
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
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-700">
                    <Button onClick={handleSavePassword}>
                      <Save className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;