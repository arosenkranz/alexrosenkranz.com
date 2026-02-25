import { useEffect, useState } from 'react';

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  trackUrl?: string;
}

export default function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/spotify/now-playing');
        const json = (await res.json()) as NowPlayingData;
        setData(json);
      } catch {
        // Keep showing last known state on error
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-foreground-quaternary font-mono text-sm">
        loading...
      </div>
    );
  }

  if (!data?.isPlaying) {
    return (
      <div className="text-foreground-quaternary font-mono text-sm">
        not listening to anything right now
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      {data.albumArt && (
        <img
          src={data.albumArt}
          alt={data.album}
          width={40}
          height={40}
          className="border-border border flex-shrink-0"
        />
      )}
      <div className="min-w-0">
        <p className="text-foreground-quaternary font-mono text-xs mb-1">
          now playing
        </p>
        {data.trackUrl ? (
          <a
            href={data.trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-secondary font-mono text-sm no-underline hover:underline block truncate"
            data-now-playing-link
            data-track-url={data.trackUrl}
            data-track-title={data.title}
            data-artist={data.artist}
          >
            {data.title}
          </a>
        ) : (
          <span className="text-foreground-secondary font-mono text-sm block truncate">
            {data.title}
          </span>
        )}
        <p className="text-foreground-tertiary font-mono text-xs truncate">
          {data.artist}
        </p>
      </div>
    </div>
  );
}
