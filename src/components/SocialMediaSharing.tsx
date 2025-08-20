import React, { useState } from 'react';
import { Share2, X, Check, Clock, AlertCircle } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setSelectedPlatforms, startPosting } from '../store/slices/socialMediaSlice';
import Button from './UI/Button';
import Card from './UI/Card';
import type { Video } from '../store/slices/videoSlice';

interface SocialMediaSharingProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
}

const SocialMediaSharing: React.FC<SocialMediaSharingProps> = ({ video, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { platforms, selectedPlatforms, isPosting } = useAppSelector(state => state.socialMedia);
  const [customMessage, setCustomMessage] = useState('');
  const [includeHashtags, setIncludeHashtags] = useState(true);

  const connectedPlatforms = platforms.filter(p => p.isConnected && p.postingEnabled);

  const handlePlatformToggle = (platformId: string) => {
    const newSelected = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter(id => id !== platformId)
      : [...selectedPlatforms, platformId];
    dispatch(setSelectedPlatforms(newSelected));
  };

  const handleShare = () => {
    if (selectedPlatforms.length === 0) return;

    const postingJob = {
      id: Date.now().toString(),
      videoId: video.id,
      platforms: selectedPlatforms,
      status: 'pending' as const,
      results: {},
      createdAt: new Date().toISOString(),
    };

    dispatch(startPosting(postingJob));
    
    // Simulate posting process
    setTimeout(() => {
      // This would be replaced with actual API calls
      console.log('Posting to platforms:', selectedPlatforms);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Share2 className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Share Video</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Preview */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="text-white font-medium">{video.title}</h4>
              <p className="text-slate-400 text-sm">
                {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')} • 
                {(video.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">Select Platforms</h4>
          {connectedPlatforms.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No connected platforms available</p>
              <Button variant="outline" size="sm">
                Connect Platforms
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {connectedPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                      style={{ backgroundColor: platform.color + '20' }}
                    >
                      {platform.icon}
                    </div>
                    {selectedPlatforms.includes(platform.id) && (
                      <Check className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <p className="text-white font-medium text-sm">{platform.name}</p>
                  <p className="text-slate-400 text-xs">@{platform.username}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Message */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Custom Message (Optional)
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            placeholder="Add a custom message for your post..."
          />
        </div>

        {/* Options */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="include-hashtags"
              checked={includeHashtags}
              onChange={(e) => setIncludeHashtags(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="include-hashtags" className="text-slate-300">
              Include platform-specific hashtags
            </label>
          </div>
        </div>

        {/* Selected Platforms Preview */}
        {selectedPlatforms.length > 0 && (
          <div className="mb-6">
            <h5 className="text-sm font-medium text-slate-300 mb-2">
              Posting to {selectedPlatforms.length} platform(s):
            </h5>
            <div className="flex flex-wrap gap-2">
              {selectedPlatforms.map(platformId => {
                const platform = platforms.find(p => p.id === platformId);
                return platform ? (
                  <span
                    key={platformId}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm"
                  >
                    <span>{platform.icon}</span>
                    <span>{platform.name}</span>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isPosting}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleShare}
            disabled={selectedPlatforms.length === 0 || isPosting}
            loading={isPosting}
          >
            {isPosting ? (
              <>
                <Clock className="w-4 h-4 mr-2" />
                Posting...
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 mr-2" />
                Share Now
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SocialMediaSharing;