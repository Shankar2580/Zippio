import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileVideo, X, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addVideo, setCurrentVideo, setUploadProgress, setIsUploading } from '../store/slices/videoSlice';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ProgressBar from '../components/UI/ProgressBar';

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { uploadProgress, isUploading } = useAppSelector(state => state.video);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('Please upload a video file');
      return;
    }

    setUploadedFile(file);
    dispatch(setIsUploading(true));
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      dispatch(setUploadProgress(i));
    }

    // Create video object
    const video = {
      id: Date.now().toString(),
      title: file.name,
      thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: 120, // Mock duration
      size: file.size,
      status: 'uploading' as const,
      createdAt: new Date().toISOString(),
    };

    dispatch(addVideo(video));
    dispatch(setCurrentVideo(video));
    dispatch(setIsUploading(false));
    
    // Automatically navigate to processing status after upload completes
    setTimeout(() => {
      navigate('/processing-status');
    }, 1500);
  };

  const removeFile = () => {
    setUploadedFile(null);
    dispatch(setUploadProgress(0));
  };

  const supportedFormats = ['MP4', 'MOV', 'AVI', 'WMV', 'FLV', 'WebM'];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Upload Your Video
          </h1>
          <p className="text-slate-300 text-lg">
            Drop your video file and let's create something amazing together
          </p>
        </div>

        {!uploadedFile ? (
          <Card className="p-12">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-slate-600 hover:border-slate-500'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-2">
                Drop your video here
              </h3>
              <p className="text-slate-300 mb-6">
                Or click to browse from your device
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <Button
                size="lg"
                className="cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose Video File
              </Button>
              
              <div className="mt-8 pt-8 border-t border-slate-700">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <FileVideo className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-300">Max 2GB</p>
                  </div>
                  <div className="text-center">
                    <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-300">HD Quality</p>
                  </div>
                  <div className="text-center md:col-span-1 col-span-2">
                    <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-300">Fast Upload</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-slate-400 mb-2">Supported formats:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {supportedFormats.map(format => (
                      <span
                        key={format}
                        className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <FileVideo className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{uploadedFile.name}</h3>
                    <p className="text-slate-400">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {isUploading ? (
                <div>
                  <ProgressBar progress={uploadProgress} />
                  <p className="text-sm text-slate-300 mt-2 text-center">
                    Uploading your video...
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center text-emerald-400 mb-4">
                    <Check className="w-5 h-5 mr-2" />
                    <span className="font-medium">Upload complete! Redirecting to processing...</span>
                  </div>
                </div>
              )}
            </Card>

            {!isUploading && (
              <Card className="p-6">
                <h4 className="text-lg font-semibold text-white mb-4">What's Next?</h4>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-400 font-bold">1</span>
                    </div>
                    <p className="text-sm text-slate-300">Choose processing options</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-400 font-bold">2</span>
                    </div>
                    <p className="text-sm text-slate-300">AI adds music & captions</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-400 font-bold">3</span>
                    </div>
                    <p className="text-sm text-slate-300">Download your video</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;