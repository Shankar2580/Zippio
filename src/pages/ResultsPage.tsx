import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, Play, Pause, Volume2, VolumeX, RotateCcw, ArrowLeft } from 'lucide-react';
import { useAppSelector } from '../hooks';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import SocialMediaSharing from '../components/SocialMediaSharing';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentVideo } = useAppSelector(state => state.video);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSocialSharing, setShowSocialSharing] = useState(false);

  const handleDownload = () => {
    // In a real app, this would trigger the actual download
    console.log('Downloading video...');
    // Create a mock download
    const link = document.createElement('a');
    link.href = '#';
    link.download = currentVideo?.title || 'enhanced-video.mp4';
    link.click();
  };

  const createNewVideo = () => {
    navigate('/upload');
  };

  if (!currentVideo) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎉 Your Video is Ready!
          </h1>
          <p className="text-slate-300 text-lg">
            Your video has been professionally enhanced with AI-powered music and captions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Enhanced Video</h3>
              <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden mb-4">
                {/* Mock Video Player */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                  <img
                    src="https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Enhanced video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center text-slate-900 hover:bg-white transition-colors shadow-2xl"
                    >
                      {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                    </button>
                  </div>

                  {/* Enhancement Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ✨ AI Enhanced
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    
                    <div className="flex-1 bg-slate-700 rounded-full h-1">
                      <div className="bg-blue-500 h-1 rounded-full w-1/3"></div>
                    </div>
                    
                    <span className="text-white text-sm">1:23 / 3:45</span>
                    
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white">{currentVideo.title}</h4>
                  <p className="text-slate-400">
                    Enhanced with AI • {(currentVideo.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
                    ✅ Ready
                  </span>
                </div>
              </div>
            </Card>

            {/* Before/After Comparison */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">✨ AI Enhancements Applied</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Before</h4>
                  <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                    <span className="text-slate-400">Original Video</span>
                  </div>
                  <ul className="mt-3 text-sm text-slate-400 space-y-1">
                    <li>• No background music</li>
                    <li>• No captions</li>
                    <li>• Basic quality</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-3">After</h4>
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                    <span className="text-blue-400">✨ AI Enhanced</span>
                  </div>
                  <ul className="mt-3 text-sm text-emerald-400 space-y-1">
                    <li>• ✅ Perfect background music</li>
                    <li>• ✅ Professional captions</li>
                    <li>• ✅ Enhanced quality</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Main Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">What's Next?</h3>
              
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Video
                </Button>
                
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full"
                  onClick={() => setShowSocialSharing(true)}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share to Social Media
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={createNewVideo}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Create Another Video
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>
            </Card>

            {/* Enhancement Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Enhancement Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Processing Time:</span>
                  <span className="text-white">2m 34s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Music Added:</span>
                  <span className="text-emerald-400">✅ Perfect Match</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Captions:</span>
                  <span className="text-emerald-400">✅ 99% Accuracy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Quality:</span>
                  <span className="text-emerald-400">✅ Enhanced</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Social Media Sharing Modal */}
      <SocialMediaSharing
        video={currentVideo}
        isOpen={showSocialSharing}
        onClose={() => setShowSocialSharing(false)}
      />
    </div>
  );
};

export default ResultsPage;