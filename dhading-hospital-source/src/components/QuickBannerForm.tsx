import React, { useState } from 'react';
import { X, Plus, Loader } from 'lucide-react';

interface QuickBannerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (banner: { id: string; title: string; subtitle: string; imageUrl: string; videoUrl: string }) => void;
}

export default function QuickBannerForm({ isOpen, onClose, onAdd }: QuickBannerFormProps) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !imageUrl.trim()) {
      alert('Please enter banner title and image URL');
      return;
    }

    setLoading(true);
    
    const newBanner = {
      id: 'b-' + Date.now(),
      title: title.trim(),
      subtitle: subtitle.trim(),
      imageUrl: imageUrl.trim(),
      videoUrl: videoUrl.trim()
    };

    onAdd(newBanner);
    
    setLoading(false);
    setTitle('');
    setSubtitle('');
    setImageUrl('');
    setVideoUrl('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#006830] flex items-center gap-2">
            <Plus className="size-5" />
            Add Video Banner
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="size-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Banner Title (Required)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Welcome to Dhading Hospital"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A64C]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sub-Title / Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Quality Healthcare Services"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A64C]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Background Image URL (Required)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A64C]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Video URL (Optional - YouTube, TikTok, Vimeo, etc.)
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="w-full px-3 py-2 border border-blue-200 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-blue-600 mt-1">
              Supports: YouTube, TikTok, Vimeo, Streamable, Instagram Reels, or direct MP4/WebM
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#00A64C] hover:bg-[#006830] text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  Add Banner
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
