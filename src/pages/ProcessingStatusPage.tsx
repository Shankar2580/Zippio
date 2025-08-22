import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Type, Download, Check, Clock, X, Zap, Upload as UploadIcon } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateVideo } from '../store/slices/videoSlice';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ProgressBar from '../components/UI/ProgressBar';

const ProcessingStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentVideo } = useAppSelector(state => state.video);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    {
      id: 'uploading',
      name: 'Uploading video...',
      icon: UploadIcon,
      description: 'Uploading your video to our secure servers...'
    },
    {
      id: 'music',
      name: 'Generating music with ElevenLabs...',
      icon: Music,
      description: 'Creating and syncing background music via ElevenLabs...'
    },
    {
      id: 'captions',
      name: 'Adding captions with Gemini API...',
      icon: Type,
      description: 'Transcribing and styling captions using Gemini API...'
    },
    {
      id: 'finalizing',
      name: 'Finalizing your enhanced video...',
      icon: Download,
      description: 'Rendering the final output and applying enhancements...'
    },
    {
      id: 'completed',
      name: 'Complete',
      icon: Check,
      description: 'Your professionally enhanced video is ready!'
    }
  ];

  useEffect(() => {
    if (!currentVideo) {
      navigate('/upload');
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (Math.random() * 2 + 1); // Random increment between 1-3
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setCurrentStepIndex(4); // Complete step (index of completed)
          dispatch(updateVideo({
            id: currentVideo.id,
            status: 'completed',
            downloadUrl: 'https://example.com/download/' + currentVideo.id
          }));
          setTimeout(() => navigate('/results'), 1500);
          return 100;
        }

        // Update step based on progress (4 stages before complete)
        if (newProgress > 85 && currentStepIndex < 3) {
          setCurrentStepIndex(3); // Finalizing
        } else if (newProgress > 65 && currentStepIndex < 2) {
          setCurrentStepIndex(2); // Captions
        } else if (newProgress > 40 && currentStepIndex < 1) {
          setCurrentStepIndex(1); // Music (ElevenLabs)
        } else if (newProgress >= 0 && currentStepIndex < 0) {
          setCurrentStepIndex(0); // Uploading
        }

        return newProgress;
      });

      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 150); // Update every 150ms for smooth animation

    return () => clearInterval(interval);
  }, [currentVideo, navigate, dispatch, currentStepIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (!currentVideo) return null;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎬 Processing Your Video
          </h1>
          <p className="text-slate-300 text-lg">
            Our AI is enhancing your video with professional music and captions
          </p>
        </div>

        {/* Video Info */}
        <Card className="p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center animate-pulse">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{currentVideo.title}</h3>
              <p className="text-slate-400">
                {(currentVideo.size / (1024 * 1024)).toFixed(2)} MB • AI Enhancement in Progress
              </p>
            </div>
          </div>
        </Card>

        {/* Progress Overview */}
        <Card className="p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">AI Processing Progress</h3>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{Math.round(progress)}%</div>
              <div className="text-sm text-slate-400">
                {timeRemaining > 0 ? `${formatTime(timeRemaining)} remaining` : 'Almost done!'}
              </div>
            </div>
          </div>
          
          <ProgressBar progress={progress} animated className="mb-6" />
          
          <div className="text-center">
            <p className="text-slate-300 mb-4 text-lg">
              {steps[currentStepIndex]?.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel Processing
            </Button>
          </div>
        </Card>

        {/* Detailed Step Progress */}
        <Card className="p-8">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            AI Enhancement Steps
          </h3>
          
          <div className="space-y-6">
            {steps.slice(0, -1).map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isPending = index > currentStepIndex;

              return (
                <div key={step.id} className="flex items-center space-x-4">
                  <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500
                    ${isCompleted 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                      : isCurrent 
                      ? 'bg-blue-500 text-white animate-pulse shadow-lg shadow-blue-500/30' 
                      : 'bg-slate-700 text-slate-400'}
                  `}>
                    {isCompleted ? (
                      <Check className="w-7 h-7" />
                    ) : isCurrent ? (
                      <step.icon className="w-7 h-7" />
                    ) : (
                      <Clock className="w-7 h-7" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-semibold text-lg ${
                      isCompleted || isCurrent ? 'text-white' : 'text-slate-400'
                    }`}>
                      {step.name}
                    </h4>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                  
                  <div className="text-right min-w-[100px]">
                    {isCompleted && (
                      <span className="text-emerald-400 text-sm font-medium bg-emerald-400/20 px-3 py-1 rounded-full">
                        ✓ Complete
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-blue-400 text-sm font-medium bg-blue-400/20 px-3 py-1 rounded-full animate-pulse">
                        ⚡ Processing...
                      </span>
                    )}
                    {isPending && (
                      <span className="text-slate-500 text-sm bg-slate-500/20 px-3 py-1 rounded-full">
                        ⏳ Waiting
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* AI Enhancement Info */}
        <Card className="p-6 mt-8">
          <h4 className="text-lg font-semibold text-white mb-4">🤖 AI Enhancement Features</h4>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <Music className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-slate-300">Smart music selection based on video mood and pacing</p>
            </div>
            <div>
              <Type className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-slate-300">Professional captions with 99%+ accuracy and styling</p>
            </div>
            <div>
              <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-slate-300">Advanced AI effects and color enhancement</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProcessingStatusPage;