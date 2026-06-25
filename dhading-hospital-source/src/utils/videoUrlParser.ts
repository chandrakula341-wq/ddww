export interface ParsedVideoSource {
  platform: 'youtube' | 'vimeo' | 'tiktok' | 'instagram' | 'streamable' | 'direct' | 'unknown';
  videoId?: string;
  directUrl?: string;
  embedUrl?: string;
}

export function parseVideoUrl(url: string): ParsedVideoSource {
  if (!url) return { platform: 'unknown' };

  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    // YouTube embed with continuous looping - playlist parameter makes it loop
    return { 
      platform: 'youtube', 
      videoId: ytMatch[1], 
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&controls=0&playlist=${ytMatch[1]}&modestbranding=1` 
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    // Vimeo embed with continuous looping
    return { 
      platform: 'vimeo', 
      videoId: vimeoMatch[1], 
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&controls=0` 
    };
  }

  // TikTok
  const tiktokMatch = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  if (tiktokMatch) {
    // TikTok embed (note: TikTok embeds have limited loop control)
    return { 
      platform: 'tiktok', 
      videoId: tiktokMatch[1], 
      embedUrl: `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}` 
    };
  }

  // Streamable
  const streamableMatch = url.match(/streamable\.com\/([a-zA-Z0-9]+)/);
  if (streamableMatch) {
    // Streamable embed with continuous looping and no controls
    return { 
      platform: 'streamable', 
      videoId: streamableMatch[1], 
      embedUrl: `https://streamable.com/e/${streamableMatch[1]}?autoplay=1&muted=1&loop=1&nocontrols=1` 
    };
  }

  // Direct video file
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) {
    return { platform: 'direct', directUrl: url };
  }

  return { platform: 'unknown' };
}

export interface VideoEmbedCode {
  html: string;
}

export function getVideoEmbedCode(url: string): VideoEmbedCode | null {
  const parsed = parseVideoUrl(url);
  if (!parsed.embedUrl) return null;

  // Wrap iframe in a container for proper looping behavior
  const iframeHtml = `<div style="position:relative;width:100%;height:100%;overflow:hidden;">
    <iframe
      src="${parsed.embedUrl}"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
      style="width:100%;height:100%;position:absolute;top:0;left:0;border:none;"
      title="Banner video"
    ></iframe>
  </div>`;

  return { html: iframeHtml };
}
