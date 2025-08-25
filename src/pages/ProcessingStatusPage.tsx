import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Eye, 
  Zap,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateVideo, setCurrentVideo } from '../store/slices/videoSlice';
import Card from '../components/UI/Card';
import ProgressBar from '../components/UI/ProgressBar';

const ProcessingStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const dispatch = useAppDispatch();
  const { videos, currentVideo } = useAppSelector(state => state.video);
  
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  // Determine which video to show
  const video = taskId ? videos.find(v => v.taskId === taskId) : currentVideo;
  
  const processingSteps = [
    { name: 'Analyzing Video', description: 'AI analyzing video content and structure', icon: Eye },
    { name: 'Adding Background Music', description: 'Selecting and syncing perfect background music', icon: Activity },
    { name: 'Generating Captions', description: 'Creating professional captions with timing', icon: Clock },
    { name: 'Applying Effects', description: 'Adding visual enhancements and transitions', icon: Zap },
    { name: 'Finalizing', description: 'Optimizing for social media platforms', icon: CheckCircle }
  ];

  useEffect(() => {
    // If we have a video and it's processing, start processing simulation
    if (video && video.status === 'processing') {
      setProcessingProgress(0);
      setCurrentStep(0);
    }
    
    // If we don't have a video but have currentVideo, use that
    if (!video && currentVideo) {
      console.log('Using currentVideo as fallback:', currentVideo);
    }
  }, [video, currentVideo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Update video status to completed in Redux store
          if (video) {
            const updatedVideo = { ...video, status: 'completed' as const };
            dispatch(updateVideo({
              id: video.id,
              status: 'completed',
              downloadUrl: `https://example.com/videos/${video.title.toLowerCase().replace(/\s+/g, '-')}-enhanced.mp4`
            }));
            
            // Also update currentVideo if it's the same video
            if (currentVideo && currentVideo.id === video.id) {
              const updatedCurrentVideo = { 
                ...currentVideo, 
                status: 'completed' as const,
                downloadUrl: `https://example.com/videos/${video.title.toLowerCase().replace(/\s+/g, '-')}-enhanced.mp4`
              };
              dispatch(setCurrentVideo(updatedCurrentVideo));
            }
            
            console.log('Video status updated to completed:', video.id);
          } else {
            console.error('No video found to update status');
          }
          
          // Wait a bit for Redux store to update, then navigate to ResultsPage
          setTimeout(() => {
            console.log('Processing completed, navigating to ResultsPage');
            navigate(`/videos/${video?.taskId || 'completed'}`);
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [navigate, video, dispatch, currentVideo]);

  useEffect(() => {
    if (processingProgress > 0) {
      const step = Math.floor((processingProgress / 100) * processingSteps.length);
      setCurrentStep(Math.min(step, processingSteps.length - 1));
    }
  }, [processingProgress, processingSteps.length]);

  if (!video) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="p-16 text-center bg-slate-800/50 border-slate-700">
            <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Video Found</h3>
            <p className="text-slate-300 mb-8 text-lg">
              The video you're looking for doesn't exist or has been removed.
            </p>
            <button 
              onClick={() => navigate('/upload')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Upload New Video
            </button>
          </Card>
        </div>
      </div>
    );
  }

  // Processing mode
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
              <Zap className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm text-slate-300">AI Processing in Progress</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Processing Your
              </span>
              <br />
              <span className="text-white">Video</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Our AI is working hard to enhance your video with music, captions, and professional effects.
            </p>
          </div>
        </div>
      </section>

      {/* Processing Content */}
      <section className="relative pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Overview */}
          <Card className="p-8 mb-8 bg-slate-800/50 border-slate-700">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Processing Progress</h2>
              <p className="text-slate-300">Your video is being enhanced with AI technology</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-white">{processingProgress}%</span>
                <span className="text-slate-400">Complete</span>
              </div>
              <ProgressBar progress={processingProgress} />
              <p className="text-sm text-slate-400 mt-2 text-center">
                Estimated time remaining: {Math.max(0, Math.ceil((100 - processingProgress) / 2))} minutes
              </p>
            </div>
          </Card>

          {/* Processing Steps */}
          <Card className="p-8 mb-8 bg-slate-800/50 border-slate-700">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Processing Steps</h3>
            <div className="space-y-4">
              {processingSteps.map((step, index) => (
                <div
                  key={step.name}
                  className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 ${
                    index <= currentStep
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-slate-700/30 border-slate-600'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-600 text-slate-400'
                  }`}>
                    {index <= currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      index <= currentStep ? 'text-emerald-400' : 'text-slate-300'
                    }`}>
                      {step.name}
                    </h4>
                    <p className={`text-sm ${
                      index <= currentStep ? 'text-emerald-300' : 'text-slate-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  {index <= currentStep && (
                    <div className="text-emerald-400">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Current Video Info */}
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">Current Video</h3>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center">
                <Activity className="w-8 h-8 text-slate-400" /> 
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">{video.title}</h4>
                <p className="text-slate-400">Task ID: {video.taskId}</p>
                <p className="text-slate-400">Duration: {video.duration}s</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ProcessingStatusPage;