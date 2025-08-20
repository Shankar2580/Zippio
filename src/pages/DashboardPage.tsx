import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, Trash2, Share2, Play, Plus, Calendar, Clock } from 'lucide-react';
import { useAppSelector } from '../hooks';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import type { Video } from '../store/slices/videoSlice';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { videos } = useAppSelector(state => state.video);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'processing' | 'failed'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');

  // Mock data if no videos exist
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Summer Vacation Highlights.mp4',
      thumbnail: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 125,
      size: 89654321,
      status: 'completed',
      createdAt: '2024-01-15T10:30:00Z',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Product Demo Video.mp4',
      thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 180,
      size: 156789123,
      status: 'processing',
      createdAt: '2024-01-14T15:45:00Z',
      processingProgress: 67
    },
    {
      id: '3',
      title: 'Tutorial Content.mp4',
      thumbnail: 'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 340,
      size: 234567890,
      status: 'completed',
      createdAt: '2024-01-13T09:15:00Z',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Marketing Campaign.mp4',
      thumbnail: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 95,
      size: 67891234,
      status: 'failed',
      createdAt: '2024-01-12T14:20:00Z'
    }
  ];

  const displayVideos = videos.length > 0 ? videos : mockVideos;

  const filteredVideos = displayVideos
    .filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || video.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const getStatusColor = (status: Video['status']) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-400 bg-emerald-400/20';
      case 'processing':
        return 'text-blue-400 bg-blue-400/20';
      case 'uploading':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'failed':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-slate-400 bg-slate-400/20';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Videos</h1>
            <p className="text-slate-300">
              Manage and download all your processed videos
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => navigate('/upload')}
            className="mt-4 lg:mt-0"
          >
            <Plus className="w-5 h-5 mr-2" />
            Upload New Video
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{displayVideos.length}</p>
                <p className="text-slate-400 text-sm">Total Videos</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {displayVideos.filter(v => v.status === 'completed').length}
                </p>
                <p className="text-slate-400 text-sm">Completed</p>
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
                  {displayVideos.filter(v => v.status === 'processing').length}
                </p>
                <p className="text-slate-400 text-sm">Processing</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">5</p>
                <p className="text-slate-400 text-sm">This Month</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-slate-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-slate-700 border border-slate-600 rounded-lg text-white px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-700 border border-slate-600 rounded-lg text-white px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </Card>

        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Videos Found</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Upload your first video to get started'
              }
            </p>
            <Button onClick={() => navigate('/upload')}>
              <Plus className="w-4 h-4 mr-2" />
              Upload Video
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden group" hover>
                {/* Thumbnail */}
                <div className="relative aspect-video bg-slate-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-slate-900 hover:bg-white transition-colors">
                      <Play size={20} />
                    </button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </div>

                  {/* Status Badge */}
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(video.status)}`}>
                    {video.status === 'processing' ? `${video.processingProgress || 0}%` : video.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 truncate" title={video.title}>
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-slate-400 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatDate(video.createdAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{formatFileSize(video.size)}</span>
                  </div>

                  {/* Processing Progress */}
                  {video.status === 'processing' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Processing...</span>
                        <span>{video.processingProgress || 0}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${video.processingProgress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {video.status === 'completed' && (
                      <>
                        <Button size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    
                    {video.status === 'processing' && (
                      <Button variant="outline" size="sm" className="flex-1" disabled>
                        <Clock className="w-4 h-4 mr-2" />
                        Processing...
                      </Button>
                    )}
                    
                    {video.status === 'failed' && (
                      <Button variant="secondary" size="sm" className="flex-1">
                        🔄 Retry
                      </Button>
                    )}
                    
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredVideos.length > 9 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <div className="flex items-center space-x-1">
                {[1, 2, 3].map(page => (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded ${
                      page === 1 
                        ? 'bg-blue-600 text-white' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;