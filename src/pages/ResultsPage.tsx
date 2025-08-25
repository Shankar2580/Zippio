import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Download, 
  Share2, 
  Play, 
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  FileVideo,
  Plus,
  ArrowLeft,
  Sparkles,
  RotateCcw,
  RefreshCw
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateVideo } from '../store/slices/videoSlice';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import CircularProgress from '../components/UI/CircularProgress';
import type { Video } from '../store/slices/videoSlice';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { videos } = useAppSelector(state => state.video);
  
  const [isReprocessing, setIsReprocessing] = useState(false);
  const [isDistributing, setIsDistributing] = useState(false);
  const [distributionProgress, setDistributionProgress] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock data for demonstration
  const mockVideos: Video[] = [
    {
      id: '1',
      taskId: 'TASK-001',
      title: 'Product Demo 2024',
      thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 180,
      size: 156789123,
      status: 'published',
      createdAt: '2024-01-15T10:30:00Z',
      downloadUrl: 'https://example.com/videos/product-demo-2024-enhanced.mp4'
    },
    {
      id: '2',
      taskId: 'TASK-002',
      title: 'Marketing Campaign',
      thumbnail: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 95,
      size: 67891234,
      status: 'processing',
      createdAt: '2024-01-14T15:45:00Z',
      processingProgress: 67
    },
    {
      id: '3',
      taskId: 'TASK-003',
      title: 'Tutorial Content',
      thumbnail: 'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 340,
      size: 234567890,
      status: 'completed',
      createdAt: '2024-01-13T09:15:00Z',
      downloadUrl: 'https://example.com/videos/tutorial-content-enhanced.mp4'
    },
    {
      id: '4',
      taskId: 'TASK-004',
      title: 'Company Update',
      thumbnail: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 125,
      size: 89654321,
      status: 'failed',
      createdAt: '2024-01-12T14:20:00Z'
    }
  ];

  const displayVideos = videos.length > 0 ? videos : mockVideos;

  const getStatusColor = (status: Video['status']) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-600 bg-emerald-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'uploading':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'published':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  const getStatusIcon = (status: Video['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'uploading':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

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

  const handleVideoClick = (video: Video) => {
    if (video.status === 'completed' || video.status === 'published') {
      navigate(`/videos/${video.taskId}`);
    } else if (video.status === 'processing') {
      navigate(`/processing-status`);
    }
  };

  const handleReprocess = async (video: Video) => {
    if (!video) return;
    
    setIsReprocessing(true);
    
    try {
      // Update video status to processing and clear download URL
      dispatch(updateVideo({
        id: video.id,
        status: 'processing',
        downloadUrl: undefined
      }));
      
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to processing status page
      navigate('/processing-status');
    } catch (error) {
      console.error('Error reprocessing video:', error);
    } finally {
      setIsReprocessing(false);
    }
  };

  const handleDownload = (video: Video) => {
    // In a real app, this would trigger the actual download
    console.log('Downloading video:', video.title);
    
    if (video.downloadUrl && video.downloadUrl !== '#') {
      // If we have a real download URL, use it
      const link = document.createElement('a');
      link.href = video.downloadUrl;
      link.download = `${video.title}-enhanced.mp4`;
      link.click();
    } else {
      // Fallback for demo purposes - create a dummy download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${video.title}-enhanced.mp4`;
      link.click();
      
      // Show a message that this is a demo
      alert('Demo mode: This would download the enhanced video in a real application.');
    }
  };

  const handleDistribute = async (video: Video) => {
    setIsDistributing(true);
    setDistributionProgress(0);
    setShowSuccessMessage(false);
    
    // Simulate distribution progress
    const interval = setInterval(() => {
      setDistributionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDistributing(false);
          setShowSuccessMessage(true);
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 5000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // In a real app, this would call the backend API to distribute to all platforms
    console.log('Distributing video to all connected platforms:', video.title);
  };

  // If we have a taskId, show video detail view
  if (taskId) {
    const video = displayVideos.find(v => v.taskId === taskId);
    if (!video) {
      navigate('/videos');
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={() => navigate('/videos')}
            className="mb-6 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>

          {/* Video Comparison View */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{video.title}</h1>
            <p className="text-slate-400">Task ID: {video.taskId}</p>
          </div>

          {/* Video Comparison Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Original Video */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FileVideo className="w-5 h-5 mr-2 text-blue-400" />
                Original Video
              </h3>
              
              <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden mb-4">
                <img
                  src={video.thumbnail}
                  alt={`${video.title} - Original`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-slate-900 hover:bg-white transition-colors">
                    <Play size={24} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{formatDuration(video.duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{formatFileSize(video.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uploaded:</span>
                  <span>{formatDate(video.createdAt)}</span>
                </div>
              </div>
            </Card>

            {/* Processed Video */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-emerald-400" />
                Enhanced Video
              </h3>
              
              <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden mb-4">
                <img
                  src={video.thumbnail}
                  alt={`${video.title} - Enhanced`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-slate-900 hover:bg-white transition-colors">
                    <Play size={24} />
                  </button>
                </div>
                {/* Enhanced Badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs font-medium">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Enhanced
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{formatDuration(video.duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Enhanced Size:</span>
                  <span>{formatFileSize(video.size * 1.2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Date:</span>
                  <span>{formatDate(video.createdAt)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Video Actions</h3>
            
            {/* Distribution Progress - Full Page Overlay */}
            {isDistributing && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center">
                <div className="bg-slate-800/90 rounded-2xl p-12 border border-slate-700 shadow-2xl max-w-md mx-4">
                  <div className="text-center">
                    <h4 className="text-3xl font-bold text-white mb-4">Distributing to Social Media</h4>
                    <p className="text-slate-300 text-lg mb-8">Sharing your enhanced video to all connected platforms</p>
                    
                    <div className="flex justify-center mb-6">
                      <CircularProgress 
                        progress={distributionProgress} 
                        size={200} 
                        strokeWidth={16}
                      />
                    </div>
                    
                    <div className="text-center">
                      <p className="text-slate-300 text-lg">
                        {distributionProgress < 100 
                          ? 'Uploading and processing for each platform...' 
                          : 'Finalizing distribution...'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {showSuccessMessage && (
              <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-emerald-400 mb-2">Distribution Complete!</h4>
                  <p className="text-emerald-300">
                    Your enhanced video has been successfully distributed to all connected social media platforms.
                  </p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => handleDownload(video)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download
              </Button>
              
              <Button
                onClick={() => handleDistribute(video)}
                disabled={isDistributing}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50"
                size="lg"
              >
                {isDistributing ? (
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Share2 className="w-5 h-5 mr-2" />
                )}
                {isDistributing ? 'Distributing...' : 'Distribute'}
              </Button>
              
              <Button
                onClick={() => handleReprocess(video)}
                disabled={isReprocessing}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:opacity-50"
                size="lg"
              >
                {isReprocessing ? (
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <RotateCcw className="w-5 h-5 mr-2" />
                )}
                {isReprocessing ? 'Reprocessing...' : 'Reprocess'}
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                Click "Distribute" to automatically share your video to all connected social media platforms
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Main Video Library View - Show completed videos with comparison by default
  const completedVideos = displayVideos.filter(video => 
    video.status === 'completed' || video.status === 'published'
  );

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
              <span className="text-sm text-slate-300">AI-Enhanced Videos Ready</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Your Enhanced
              </span>
              <br />
              <span className="text-white">Videos</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Download, distribute, or reprocess your AI-enhanced videos. See the transformation from original to professional quality.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Upload Button */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Enhanced Videos</h2>
              <p className="text-slate-400">Download, distribute, or reprocess your AI-enhanced content</p>
            </div>
            <Button
              size="lg"
              onClick={() => navigate('/upload')}
              className="mt-4 lg:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Upload New Video
            </Button>
          </div>

          {/* Show completed videos with comparison view */}
          {completedVideos.length === 0 ? (
            <Card className="p-16 text-center bg-slate-800/50 border-slate-700">
              <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileVideo className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Enhanced Videos Yet</h3>
              <p className="text-slate-300 mb-8 text-lg">
                Upload and process your first video to see the AI transformation
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/upload')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Upload First Video
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {completedVideos.map((video) => (
                <Card key={video.id} className="p-6 bg-slate-800/50 border-slate-700">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{video.title}</h3>
                    <p className="text-slate-400 text-sm">Task ID: {video.taskId}</p>
                  </div>

                  {/* Video Comparison */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Original Video */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                        <h4 className="text-sm font-medium text-slate-300">Original</h4>
                      </div>
                      <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                        <img
                          src={video.thumbnail}
                          alt="Original video"
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Play className="w-6 h-6 text-slate-400" />
                            </div>
                            <p className="text-slate-400 text-xs">Original</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Video */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <h4 className="text-sm font-medium text-emerald-400">Enhanced</h4>
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="relative aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg overflow-hidden border border-emerald-500/30">
                        <img
                          src={video.thumbnail}
                          alt="Enhanced video"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-emerald-400 text-xs font-medium">Enhanced</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                      onClick={() => handleDownload(video)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50"
                      onClick={() => handleDistribute(video)}
                      disabled={isDistributing}
                    >
                      {isDistributing ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Share2 className="w-4 h-4 mr-2" />
                      )}
                      {isDistributing ? 'Distributing...' : 'Distribute'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                      onClick={() => handleReprocess(video)}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reprocess
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResultsPage;