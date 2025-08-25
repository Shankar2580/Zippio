import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Calendar, 
  Clock3, 
  Globe, 
  Share2, 
  ArrowLeft, 
  Play, 
  Eye,
  Sparkles,
  Zap,
  CheckCircle,
  Plus,
  Settings
} from 'lucide-react';
import { useAppSelector } from '../hooks';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

interface DistributionForm {
  title: string;
  description: string;
  hashtags: string;
  scheduledDate: string;
  scheduledTime: string;
}

const SocialMediaPage: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { videos } = useAppSelector(state => state.video);
  const { platforms, postingJobs } = useAppSelector(state => state.socialMedia);
  
  const [distributionForm, setDistributionForm] = useState<DistributionForm>({
    title: '',
    description: '',
    hashtags: '',
    scheduledDate: '',
    scheduledTime: ''
  });

  const [isDistributionMode, setIsDistributionMode] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  // Find video if in distribution mode
  const video = taskId ? videos.find(v => v.taskId === taskId) : null;

  useEffect(() => {
    if (taskId && video) {
      setIsDistributionMode(true);
      setDistributionForm(prev => ({
        ...prev,
        title: video.title
      }));
    } else {
      setIsDistributionMode(false);
    }
  }, [taskId, video]);

  const handleDistributionSubmit = () => {
    // In a real app, this would submit the distribution job
    console.log('Distribution submitted:', distributionForm);
    
    // Simulate distribution process
    setTimeout(() => {
      alert('Distribution scheduled successfully!');
      navigate('/videos');
    }, 1000);
  };

  const handleConnectPlatform = (platformId: string) => {
    setSelectedPlatform(platformId);
    setShowConnectionModal(true);
  };

  const handleDisconnectPlatform = (platformId: string) => {
    // In a real app, this would disconnect the platform
    console.log('Disconnecting platform:', platformId);
  };

  const togglePostingEnabled = (platformId: string) => {
    // In a real app, this would toggle posting enabled
    console.log('Toggling posting for platform:', platformId);
  };

  if (isDistributionMode && video) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
                <Share2 className="w-4 h-4 text-emerald-400 mr-2" />
                <span className="text-sm text-slate-300">Distribution Setup</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  Distribute Your
                </span>
                <br />
                <span className="text-white">Video</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Share your enhanced video across all your social media platforms with custom messaging and scheduling.
              </p>
            </div>
          </div>
        </section>

        {/* Distribution Content */}
        <section className="relative pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Button
                variant="outline"
                onClick={() => navigate('/videos')}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Videos
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Video Preview */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Video Preview</h3>
                <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-emerald-400 text-sm font-medium">✨ AI Enhanced</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-300">
                  <p><span className="font-medium">Title:</span> {video.title}</p>
                  <p><span className="font-medium">Task ID:</span> {video.taskId}</p>
                  <p><span className="font-medium">Duration:</span> {video.duration}s</p>
                </div>
              </Card>

              {/* Post Details Form */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Post Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                      Post Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={distributionForm.title}
                      onChange={(e) => setDistributionForm({ ...distributionForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                      placeholder="Enter post title"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={distributionForm.description}
                      onChange={(e) => setDistributionForm({ ...distributionForm, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                      placeholder="Write your post description..."
                    />
                  </div>

                  <div>
                    <label htmlFor="hashtags" className="block text-sm font-medium text-slate-300 mb-2">
                      Hashtags
                    </label>
                    <input
                      id="hashtags"
                      type="text"
                      value={distributionForm.hashtags}
                      onChange={(e) => setDistributionForm({ ...distributionForm, hashtags: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                      placeholder="#video #ai #enhanced"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="scheduledDate" className="block text-sm font-medium text-slate-300 mb-2">
                        Scheduled Date
                      </label>
                      <input
                        id="scheduledDate"
                        type="date"
                        value={distributionForm.scheduledDate}
                        onChange={(e) => setDistributionForm({ ...distributionForm, scheduledDate: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="scheduledTime" className="block text-sm font-medium text-slate-300 mb-2">
                        Scheduled Time
                      </label>
                      <input
                        id="scheduledTime"
                        type="time"
                        value={distributionForm.scheduledTime}
                        onChange={(e) => setDistributionForm({ ...distributionForm, scheduledTime: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Platform Selection */}
            <Card className="p-8 mt-8 bg-slate-800/50 border-slate-700">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Platform Selection</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`p-6 rounded-xl border transition-all duration-300 ${
                      platform.isConnected
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-slate-700/30 border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          platform.isConnected ? 'bg-emerald-500/20' : 'bg-slate-600'
                        }`}>
                          <span className={`font-bold text-lg ${
                            platform.isConnected ? 'text-emerald-400' : 'text-slate-400'
                          }`}>
                            {platform.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className={`font-semibold ${
                            platform.isConnected ? 'text-emerald-400' : 'text-white'
                          }`}>
                            {platform.name}
                          </h4>
                          <p className={`text-sm ${
                            platform.isConnected ? 'text-emerald-300' : 'text-slate-400'
                          }`}>
                            {platform.isConnected ? 'Connected' : 'Not Connected'}
                          </p>
                        </div>
                      </div>
                      
                      {platform.isConnected ? (
                        <div className="flex items-center space-x-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={platform.postingEnabled}
                              onChange={() => togglePostingEnabled(platform.id)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnectPlatform(platform.id)}
                            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                          >
                            Disconnect
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleConnectPlatform(platform.id)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Platform Customization */}
            <Card className="p-8 mt-8 bg-slate-800/50 border-slate-700">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Platform Customization</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 font-bold">LI</span>
                    </div>
                    <h4 className="text-white font-semibold">LinkedIn</h4>
                  </div>
                  <div className="space-y-3 text-sm text-slate-300">
                    <p>• Professional tone</p>
                    <p>• Business hashtags</p>
                    <p>• Company page integration</p>
                  </div>
                </div>

                <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold">IG</span>
                    </div>
                    <h4 className="text-white font-semibold">Instagram</h4>
                  </div>
                  <div className="space-y-3 text-sm text-slate-300">
                    <p>• Visual storytelling</p>
                    <p>• Trending hashtags</p>
                    <p>• Story highlights</p>
                  </div>
                </div>

                <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                      <span className="text-red-400 font-bold">YT</span>
                    </div>
                    <h4 className="text-white font-semibold">YouTube</h4>
                  </div>
                  <div className="space-y-3 text-sm text-slate-300">
                    <p>• SEO optimization</p>
                    <p>• Video descriptions</p>
                    <p>• Playlist integration</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Schedule Distribution */}
            <div className="text-center mt-8">
              <Button
                onClick={handleDistributionSubmit}
                size="xl"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Schedule Distribution
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Default social media integration mode
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
              <Globe className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-sm text-slate-300">Social Media Integration</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Social Media
              </span>
              <br />
              <span className="text-white">Integration</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Connect your social media accounts and manage video distribution across all platforms from one place.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="text-center">
                <div className="p-3 bg-emerald-500/20 rounded-lg inline-block mb-4 border border-emerald-500/30">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-white">{platforms.filter(p => p.isConnected).length}</p>
                <p className="text-sm text-slate-400">Connected</p>
              </div>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="text-center">
                <div className="p-3 bg-blue-500/20 rounded-lg inline-block mb-4 border border-blue-500/30">
                  <Share2 className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">{postingJobs.filter(j => j.status === 'completed').length}</p>
                <p className="text-sm text-slate-400">Posts Shared</p>
              </div>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="text-center">
                <div className="p-3 bg-yellow-500/20 rounded-lg inline-block mb-4 border border-yellow-500/30">
                  <Clock3 className="w-6 h-6 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-white">{postingJobs.filter(j => j.status === 'pending').length}</p>
                <p className="text-sm text-slate-400">Pending</p>
              </div>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="text-center">
                <div className="p-3 bg-purple-500/20 rounded-lg inline-block mb-4 border border-purple-500/30">
                  <Globe className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white">{platforms.length}</p>
                <p className="text-sm text-slate-400">Available</p>
              </div>
            </Card>
          </div>

          {/* Connected Platforms */}
          <Card className="p-8 mb-8 bg-slate-800/50 border-slate-700">
            <h3 className="text-2xl font-semibold text-white mb-6">Connected Platforms</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {platforms.filter(p => p.isConnected).map((platform) => (
                <div key={platform.id} className="p-6 bg-slate-700/30 rounded-xl border border-slate-600">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <span className="text-emerald-400 font-bold text-lg">{platform.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{platform.name}</h4>
                        <p className="text-sm text-slate-400">@{platform.username || 'username'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={platform.postingEnabled}
                          onChange={() => togglePostingEnabled(platform.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnectPlatform(platform.id)}
                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">
                    <p>Last synced: {platform.lastSync || 'Never'}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Available Platforms */}
          <Card className="p-8 mb-8 bg-slate-800/50 border-slate-700">
            <h3 className="text-2xl font-semibold text-white mb-6">Available Platforms</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {platforms.filter(p => !p.isConnected).map((platform) => (
                <div key={platform.id} className="p-6 bg-slate-700/30 rounded-xl border border-slate-600">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-slate-400 font-bold text-xl">{platform.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{platform.name}</h4>
                    <p className="text-slate-400 text-sm mb-4">{platform.color}</p>
                    <Button
                      onClick={() => handleConnectPlatform(platform.id)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-8 bg-slate-800/50 border-slate-700">
            <h3 className="text-2xl font-semibold text-white mb-6">Recent Distribution Activity</h3>
            <div className="space-y-4">
              {postingJobs.slice(0, 5).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      job.status === 'completed' ? 'bg-emerald-500' :
                      job.status === 'failed' ? 'bg-red-500' :
                      job.status === 'posting' ? 'bg-yellow-500' : 'bg-slate-500'
                    }`}></div>
                    <div>
                      <p className="text-white font-medium">Distribution #{job.id}</p>
                      <p className="text-sm text-slate-400">{job.platforms.length} platforms</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">{new Date(job.createdAt).toLocaleDateString()}</p>
                    <p className={`text-xs capitalize ${
                      job.status === 'completed' ? 'text-emerald-400' :
                      job.status === 'failed' ? 'text-red-400' :
                      job.status === 'posting' ? 'text-yellow-400' : 'text-slate-400'
                    }`}>
                      {job.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaPage;