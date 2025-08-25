import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileVideo, X, Check, Image, AlertCircle, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addVideo, setCurrentVideo, setUploadProgress, setIsUploading } from '../store/slices/videoSlice';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ProgressBar from '../components/UI/ProgressBar';

interface UploadForm {
  title: string;
  description: string;
  tags: string;
}

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { uploadProgress, isUploading } = useAppSelector(state => state.video);
  
  const [dragActive, setDragActive] = useState<'video' | 'logo' | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const [formData, setFormData] = useState<UploadForm>({
    title: '',
    description: '',
    tags: ''
  });
  const [errors, setErrors] = useState<Partial<UploadForm>>({});
  
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = useCallback((e: React.DragEvent, type: 'video' | 'logo') => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(type);
    } else if (e.type === 'dragleave') {
      setDragActive(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, type: 'video' | 'logo') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], type);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'logo') => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], type);
    }
  };

  const validateFile = (file: File, type: 'video' | 'logo'): boolean => {
    if (type === 'video') {
      // Video validation: <2GB, MP4/MOV
      const maxSize = 2 * 1024 * 1024 * 1024; // 2GB
      const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
      
      if (file.size > maxSize) {
        alert('Video file must be less than 2GB');
        return false;
      }
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload MP4, MOV, or AVI video files only');
        return false;
      }
      
      return true;
    } else {
      // Logo validation: <10MB, PNG/JPG/SVG
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
      
      if (file.size > maxSize) {
        alert('Logo file must be less than 10MB');
        return false;
      }
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload PNG, JPG, or SVG logo files only');
        return false;
      }
      
      return true;
    }
  };

  const handleFile = async (file: File, type: 'video' | 'logo') => {
    if (!validateFile(file, type)) {
      return;
    }

    if (type === 'video') {
      setUploadedVideo(file);
    } else {
      setUploadedLogo(file);
    }
  };

  const removeFile = (type: 'video' | 'logo') => {
    if (type === 'video') {
      setUploadedVideo(null);
    } else {
      setUploadedLogo(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UploadForm> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!uploadedVideo) {
      alert('Please upload a video file');
      return;
    }

    if (!validateForm()) {
      return;
    }

    dispatch(setIsUploading(true));
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      dispatch(setUploadProgress(i));
    }

    // Create video object with taskId
    const taskId = `TASK-${Date.now().toString().slice(-6)}`;
    const video = {
      id: Date.now().toString(),
      taskId,
      title: formData.title,
      thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: 120, // Mock duration
      size: uploadedVideo.size,
      status: 'processing' as const, // Changed from 'uploading' to 'processing'
      createdAt: new Date().toISOString(),
    };

    dispatch(addVideo(video));
    dispatch(setCurrentVideo(video));
    dispatch(setIsUploading(false));
    
    // Navigate to processing status after upload completes
    setTimeout(() => {
      navigate('/processing-status');
    }, 1500);
  };

  const supportedVideoFormats = ['MP4', 'MOV', 'AVI'];
  const supportedLogoFormats = ['PNG', 'JPG', 'SVG'];

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
              <span className="text-sm text-slate-300">AI-Powered Video Enhancement</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Upload Your
              </span>
              <br />
              <span className="text-white">Video</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Drop your video and logo files to get started with AI-powered enhancement. Our system will automatically add music, captions, and professional effects.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="relative pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Zones */}
            <div className="space-y-6">
              {/* Video Upload */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Video File</h3>
                {!uploadedVideo ? (
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      dragActive === 'video' 
                        ? 'border-blue-500 bg-blue-500/10' 
                        : 'border-slate-600 hover:border-slate-500 bg-slate-800/30'
                    }`}
                    onDragEnter={(e) => handleDrag(e, 'video')}
                    onDragLeave={(e) => handleDrag(e, 'video')}
                    onDragOver={(e) => handleDrag(e, 'video')}
                    onDrop={(e) => handleDrop(e, 'video')}
                  >
                    <FileVideo className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300 mb-2 text-lg">
                      <span className="font-medium">Drop your video here</span> or click to browse
                    </p>
                    <p className="text-sm text-slate-400 mb-6">
                      Supports {supportedVideoFormats.join(', ')} • Max 2GB
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => videoInputRef.current?.click()}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      Choose Video File
                    </Button>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileInput(e, 'video')}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="border border-slate-600 rounded-xl p-4 bg-slate-800/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileVideo className="w-8 h-8 text-blue-400" />
                        <div>
                          <p className="font-medium text-white">{uploadedVideo.name}</p>
                          <p className="text-sm text-slate-400">
                            {(uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile('video')}
                        className="p-1 text-slate-400 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </Card>

              {/* Logo Upload */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Logo File (Optional)</h3>
                {!uploadedLogo ? (
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      dragActive === 'logo' 
                        ? 'border-blue-500 bg-blue-500/10' 
                        : 'border-slate-600 hover:border-slate-500 bg-slate-800/30'
                    }`}
                    onDragEnter={(e) => handleDrag(e, 'logo')}
                    onDragLeave={(e) => handleDrag(e, 'logo')}
                    onDragOver={(e) => handleDrag(e, 'logo')}
                    onDrop={(e) => handleDrop(e, 'logo')}
                  >
                    <Image className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300 mb-2 text-lg">
                      <span className="font-medium">Drop your logo here</span> or click to browse
                    </p>
                    <p className="text-sm text-slate-400 mb-6">
                      Supports {supportedLogoFormats.join(', ')} • Max 10MB
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => logoInputRef.current?.click()}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      Choose Logo File
                    </Button>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileInput(e, 'logo')}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="border border-slate-600 rounded-xl p-4 bg-slate-800/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image className="w-8 h-8 text-emerald-400" />
                        <div>
                          <p className="font-medium text-white">{uploadedLogo.name}</p>
                          <p className="text-sm text-slate-400">
                            {(uploadedLogo.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile('logo')}
                        className="p-1 text-slate-400 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Metadata Form */}
            <div className="space-y-6">
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Video Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                      Title *
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className={`w-full px-3 py-2 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400 ${
                        errors.title ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder="Enter video title"
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className={`w-full px-3 py-2 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400 ${
                        errors.description ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder="Describe your video content"
                    />
                    {errors.description && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-slate-300 mb-2">
                      Tags
                    </label>
                    <input
                      id="tags"
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                      placeholder="Enter tags separated by commas"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Add relevant tags to help categorize your video
                    </p>
                  </div>
                </div>
              </Card>

              {/* Upload Progress */}
              {isUploading && (
                <Card className="p-6 bg-slate-800/50 border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Uploading...</h3>
                  <ProgressBar progress={uploadProgress} />
                  <p className="text-sm text-slate-400 mt-2">
                    {uploadProgress}% complete
                  </p>
                </Card>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!uploadedVideo || isUploading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                size="lg"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Start Processing
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UploadPage;