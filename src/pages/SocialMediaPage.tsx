import React, { useState } from 'react';
import { Link2, Settings, Plus, Check, X, ExternalLink, Clock, AlertCircle } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { connectPlatform, disconnectPlatform, updatePlatformSettings, togglePlatformPosting } from '../store/slices/socialMediaSlice';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const SocialMediaPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { platforms, postingJobs } = useAppSelector(state => state.socialMedia);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectionForm, setConnectionForm] = useState({
    username: '',
    accessToken: '',
    apiKey: '',
  });

  const handleConnect = (platformId: string) => {
    setSelectedPlatform(platformId);
    setShowConnectModal(true);
  };

  const handleConnectionSubmit = () => {
    if (selectedPlatform && connectionForm.username) {
      dispatch(connectPlatform({
        platformId: selectedPlatform,
        username: connectionForm.username,
      }));
      setShowConnectModal(false);
      setConnectionForm({ username: '', accessToken: '', apiKey: '' });
      setSelectedPlatform(null);
    }
  };

  const handleDisconnect = (platformId: string) => {
    dispatch(disconnectPlatform(platformId));
  };

  const handleTogglePosting = (platformId: string) => {
    dispatch(togglePlatformPosting(platformId));
  };

  const connectedPlatforms = platforms.filter(p => p.isConnected);
  const disconnectedPlatforms = platforms.filter(p => !p.isConnected);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Social Media Integration</h1>
          <p className="text-slate-300">
            Connect your social media accounts to automatically share your videos across platforms
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Link2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{connectedPlatforms.length}</p>
                <p className="text-slate-400 text-sm">Connected</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {postingJobs.filter(j => j.status === 'completed').length}
                </p>
                <p className="text-slate-400 text-sm">Posts Shared</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {postingJobs.filter(j => j.status === 'pending' || j.status === 'posting').length}
                </p>
                <p className="text-slate-400 text-sm">Pending</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {postingJobs.filter(j => j.status === 'failed').length}
                </p>
                <p className="text-slate-400 text-sm">Failed</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Connected Platforms */}
        {connectedPlatforms.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Connected Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connectedPlatforms.map((platform) => (
                <Card key={platform.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                        style={{ backgroundColor: platform.color + '20' }}
                      >
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                        <p className="text-slate-400 text-sm">@{platform.username}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleTogglePosting(platform.id)}
                        className={`w-10 h-6 rounded-full transition-colors ${
                          platform.postingEnabled ? 'bg-emerald-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          platform.postingEnabled ? 'translate-x-5' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Auto-posting:</span>
                      <span className={platform.defaultSettings.autoPost ? 'text-emerald-400' : 'text-slate-400'}>
                        {platform.defaultSettings.autoPost ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Last sync:</span>
                      <span className="text-slate-300">
                        {platform.lastSync ? new Date(platform.lastSync).toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDisconnect(platform.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Platforms */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Available Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disconnectedPlatforms.map((platform) => (
              <Card key={platform.id} className="p-6 text-center" hover>
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4"
                  style={{ backgroundColor: platform.color + '20' }}
                >
                  {platform.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{platform.name}</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Connect to automatically share your videos
                </p>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleConnect(platform.id)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        {postingJobs.length > 0 && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {postingJobs.slice(0, 5).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      job.status === 'completed' ? 'bg-emerald-400' :
                      job.status === 'failed' ? 'bg-red-400' :
                      job.status === 'posting' ? 'bg-blue-400 animate-pulse' :
                      'bg-yellow-400'
                    }`} />
                    <div>
                      <p className="text-white font-medium">Video posted to {job.platforms.length} platform(s)</p>
                      <p className="text-slate-400 text-sm">
                        {new Date(job.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      job.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      job.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                      job.status === 'posting' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {job.status}
                    </span>
                    {job.status === 'completed' && (
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Connection Modal */}
      {showConnectModal && selectedPlatform && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Connect {platforms.find(p => p.id === selectedPlatform)?.name}
              </h3>
              <button
                onClick={() => setShowConnectModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Username/Handle
                </label>
                <input
                  type="text"
                  value={connectionForm.username}
                  onChange={(e) => setConnectionForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Access Token (Optional)
                </label>
                <input
                  type="password"
                  value={connectionForm.accessToken}
                  onChange={(e) => setConnectionForm(prev => ({ ...prev, accessToken: e.target.value }))}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter access token"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  API Key (Optional)
                </label>
                <input
                  type="password"
                  value={connectionForm.apiKey}
                  onChange={(e) => setConnectionForm(prev => ({ ...prev, apiKey: e.target.value }))}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter API key"
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-400 text-sm">
                  <strong>Note:</strong> For full functionality, you'll need to provide API credentials. 
                  Basic connection only requires a username.
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConnectModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleConnectionSubmit}
                disabled={!connectionForm.username}
              >
                Connect
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SocialMediaPage;