/**
 * Embed detection and URL transformation utilities
 * Handles conversion of public media URLs to embeddable iframe URLs
 */

export type EmbedService =
  | 'spotify'
  | 'youtube'
  | 'bandcamp'
  | 'soundcloud'
  | 'mixcloud';

/**
 * Detect which embed service a URL belongs to
 * @param url - The URL to check
 * @returns The service name or null if not embeddable
 */
export function detectEmbedService(url: string): EmbedService | null {
  // Spotify: open.spotify.com
  if (
    /^https?:\/\/open\.spotify\.com\/(track|album|playlist|artist)\//.test(url)
  ) {
    return 'spotify';
  }

  // YouTube: youtube.com/watch or youtu.be
  if (
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(url) ||
    /^https?:\/\/youtu\.be\//.test(url)
  ) {
    return 'youtube';
  }

  // Bandcamp: *.bandcamp.com
  if (/^https?:\/\/[^/]+\.bandcamp\.com\/(track|album)\//.test(url)) {
    return 'bandcamp';
  }

  // SoundCloud: soundcloud.com
  if (/^https?:\/\/(www\.)?soundcloud\.com\//.test(url)) {
    return 'soundcloud';
  }

  // Mixcloud: mixcloud.com
  if (/^https?:\/\/(www\.)?mixcloud\.com\//.test(url)) {
    return 'mixcloud';
  }

  return null;
}

/**
 * Convert a public URL to an embeddable iframe URL
 * @param url - The public URL
 * @param service - The detected service
 * @returns The embed URL
 */
export function getEmbedUrl(url: string, service: EmbedService): string {
  switch (service) {
    case 'spotify': {
      // Convert: https://open.spotify.com/{type}/{id}
      // To: https://open.spotify.com/embed/{type}/{id}
      return url.replace(
        /^https?:\/\/open\.spotify\.com\//,
        'https://open.spotify.com/embed/'
      );
    }

    case 'youtube': {
      // Convert: https://youtube.com/watch?v={id} or https://youtu.be/{id}
      // To: https://www.youtube.com/embed/{id}
      const youtubeMatch = url.match(/[?&]v=([^&]+)/);
      if (youtubeMatch?.[1]) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      }

      const youtuBeMatch = url.match(/youtu\.be\/([^?]+)/);
      if (youtuBeMatch?.[1]) {
        return `https://www.youtube.com/embed/${youtuBeMatch[1]}`;
      }

      // Fallback to original URL if parsing fails
      return url;
    }

    case 'bandcamp': {
      // Bandcamp uses full URL in iframe src (non-standard)
      return url;
    }

    case 'soundcloud': {
      // Convert to SoundCloud player widget
      const encodedUrl = encodeURIComponent(url);
      return `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23000000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
    }

    case 'mixcloud': {
      // Convert to Mixcloud widget
      const encodedUrl = encodeURIComponent(url);
      return `https://www.mixcloud.com/widget/iframe/?feed=${encodedUrl}&hide_cover=1&light=1`;
    }

    default:
      return url;
  }
}

/**
 * Get iframe attributes for a specific service
 * @param service - The embed service
 * @returns Object with iframe attributes (height, frameBorder, loading, allow)
 */
export function getEmbedAttrs(service: EmbedService): {
  height: number;
  loading: 'lazy';
  allow: string;
} {
  const baseAttrs = {
    loading: 'lazy' as const,
  };

  switch (service) {
    case 'spotify':
      return {
        ...baseAttrs,
        height: 152,
        allow: 'encrypted-media',
      };

    case 'youtube':
      return {
        ...baseAttrs,
        height: 400,
        allow:
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      };

    case 'bandcamp':
      return {
        ...baseAttrs,
        height: 470,
        allow: '',
      };

    case 'soundcloud':
      return {
        ...baseAttrs,
        height: 166, // Compact player
        allow: 'autoplay',
      };

    case 'mixcloud':
      return {
        ...baseAttrs,
        height: 120, // Mini player
        allow: '',
      };

    default:
      return {
        ...baseAttrs,
        height: 400,
        allow: '',
      };
  }
}
