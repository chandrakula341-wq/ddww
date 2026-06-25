import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { WebBanner } from '../types';
import { parseVideoUrl, getVideoEmbedCode } from '../utils/videoUrlParser';

interface BannerSliderProps {
  banners: WebBanner[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners]);

  const handlePrev = () => {
    if (!banners || banners.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!banners || banners.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  if (!banners || banners.length === 0) {
    return (
      <div className="relative w-full bg-[#006830] flex items-center justify-center text-white py-16 sm:py-24">
        <div className="text-center px-4">
          <Activity className="size-12 sm:size-16 mx-auto mb-4 animate-spin text-green-300" />
          <h2 className="text-xl sm:text-3xl font-bold">Dhading Hospital Services</h2>
          <p className="text-gray-200 mt-2 text-sm sm:text-base">Compassionate multi-disciplinary digital healthcare</p>
        </div>
      </div>
    );
  }

  const current = banners[currentIndex];

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 group">
      {/* Dynamic Slide Background - Full width and height with proper aspect ratio */}
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
        {/* Video or Image Background */}
        {current.videoUrl ? (
          (() => {
            const videoSource = parseVideoUrl(current.videoUrl);
            console.log("[v0] Banner video URL:", current.videoUrl);
            console.log("[v0] Parsed video source:", videoSource);
            
            // For direct video files
            if (videoSource.platform === 'direct') {
              return (
                <video
                  src={videoSource.directUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center"
                />
              );
            }
            
            // For platform embeds (YouTube, TikTok, Streamable, Vimeo, Instagram)
            const embedCode = getVideoEmbedCode(current.videoUrl);
            console.log("[v0] Embed code generated:", embedCode);
            if (embedCode && embedCode.html) {
              return (
                <div 
                  dangerouslySetInnerHTML={{ __html: embedCode.html }}
                  className="w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                />
              );
            }
            
            // Fallback to image if video parsing fails
            console.log("[v0] No video embed, using fallback image");
            return (
              <img
                src={current.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1920&q=80"}
                alt={current.title}
                className="w-full h-full object-cover object-center"
              />
            );
          })()
        ) : (
          <img
            src={current.imageUrl || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1920&q=80"}
            alt={current.title}
            className="w-full h-full object-cover object-center"
          />
        )}
        {/* Soft gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        
        {/* Slide Captions - Responsive positioning */}
        {/* Desktop only: left-aligned text in center-left, hidden on mobile */}
        <div className="absolute inset-0 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center">
          {/* Desktop only: left-aligned text, centered vertically */}
          <div className="hidden md:block space-y-4 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black tracking-wide text-blue-600 uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] font-sans leading-tight">
              {current.title}
            </h2>
            {current.subtitle && (
              <p className="text-base lg:text-lg xl:text-xl text-blue-500 font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-sans line-clamp-3">
                {current.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Control Buttons - Always visible on mobile */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#00A64C] text-white p-2 sm:p-3 rounded-full opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110 cursor-pointer z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#00A64C] text-white p-2 sm:p-3 rounded-full opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110 cursor-pointer z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="size-4 sm:size-5" />
          </button>

          {/* Indicator dots */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-5 sm:w-8 bg-[#00A64C]' : 'w-2 sm:w-2.5 bg-white/50 hover:bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
