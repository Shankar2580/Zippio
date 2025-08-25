import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Video, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Activity,
  Plus,
  Eye,
  Share2,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAppSelector } from '../hooks';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ProgressBar from '../components/UI/ProgressBar';

interface DashboardStats {
  totalVideos: number;
  processing: number;
  published: number;
  processingProgress: number;
}

interface ActivityItem {
  id: string;
  type: 'upload' | 'processing' | 'approval' | 'distribution' | 'error';
  message: string;
  timestamp: string;
  videoTitle?: string;
  status?: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { videos } = useAppSelector(state => state.video);
  const [stats, setStats] = useState<DashboardStats>({
    totalVideos: 0,
    processing: 0,
    published: 0,
    processingProgress: 0
  });

  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'upload',
      message: 'Video uploaded successfully',
      timestamp: new Date().toISOString(),
      videoTitle: 'Product Demo 2024'
    },
    {
      id: '2',
      type: 'processing',
      message: 'Video processing started',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      videoTitle: 'Marketing Campaign',
      status: '67% complete'
    },
    {
      id: '3',
      type: 'approval',
      message: 'Video ready for review',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      videoTitle: 'Tutorial Content'
    },
    {
      id: '4',
      type: 'distribution',
      message: 'Video published to LinkedIn',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      videoTitle: 'Company Update'
    }
  ]);

  useEffect(() => {
    // Calculate stats from videos
    const totalVideos = videos.length;
    const processing = videos.filter(v => v.status === 'processing').length;
    const published = videos.filter(v => v.status === 'published').length;
    
    setStats({
      totalVideos,
      processing,
      published,
      processingProgress: processing > 0 ? 67 : 0
    });
  }, [videos]);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'upload':
        return <Upload className="w-5 h-5 text-blue-400" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'approval':
        return <Eye className="w-5 h-5 text-purple-400" />;
      case 'distribution':
        return <Share2 className="w-5 h-5 text-emerald-400" />;
      case 'error':
        return <Activity className="w-5 h-5 text-red-400" />;
      default:
        return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

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
              <Sparkles className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-sm text-slate-300">Welcome Back!</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Your Video
              </span>
              <br />
              <span className="text-white">Dashboard</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Track your video processing progress, view recent activity, and manage your content creation workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Videos</p>
                  <p className="text-3xl font-bold text-white">{stats.totalVideos}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <Video className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Processing</p>
                  <p className="text-3xl font-bold text-white">{stats.processing}</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              {stats.processing > 0 && (
                <div className="mt-3">
                  <ProgressBar progress={stats.processingProgress} />
                  <p className="text-xs text-slate-400 mt-1">{stats.processingProgress}% complete</p>
                </div>
              )}
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Published</p>
                  <p className="text-3xl font-bold text-white">{stats.published}</p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-8 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer group" onClick={() => navigate('/upload')}>
              <div className="text-center">
                <div className="p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl inline-block mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Upload New Video</h3>
                <p className="text-slate-400">Start creating your next video with AI enhancement</p>
              </div>
            </Card>

            <Card className="p-8 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer group" onClick={() => navigate('/videos')}>
              <div className="text-center">
                <div className="p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-2xl inline-block mb-6 border border-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Video Library</h3>
                <p className="text-slate-400">Manage your complete video collection</p>
              </div>
            </Card>
          </div>

          {/* Activity & Processing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/videos')} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivity.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{activity.message}</p>
                      {activity.videoTitle && (
                        <p className="text-sm text-slate-400">{activity.videoTitle}</p>
                      )}
                      {activity.status && (
                        <p className="text-xs text-slate-500">{activity.status}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-1">{formatTimestamp(activity.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Processing Queue */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Processing Queue</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/processing-status')} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View All
                </Button>
              </div>
              {stats.processing > 0 ? (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-yellow-400">Processing Videos</span>
                      <span className="text-sm text-yellow-400">{stats.processing}</span>
                    </div>
                    <ProgressBar progress={stats.processingProgress} />
                    <p className="text-xs text-yellow-400 mt-1">Estimated completion: 2-3 hours</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-400 mb-4">No videos currently processing</p>
                  <Button 
                    onClick={() => navigate('/upload')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Video
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;