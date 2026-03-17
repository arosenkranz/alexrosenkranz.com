import { useEffect, useState } from 'react';
import { datadogRum } from '@datadog/browser-rum';

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  trackUrl?: string;
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
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
    const interval = setInterval(fetchNowPlaying, 20_000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <p className="text-foreground-quaternary font-mono text-xs">loading...</p>
    );
  }

  if (!data?.isPlaying) {
    return (
      <p className="text-foreground-quaternary font-mono text-xs">
        nothing playing right now
      </p>
    );
  }

  const handleTrackClick = () => {
    datadogRum.addAction('spotify.click', {
      trackUrl: data.trackUrl,
      trackTitle: data.title,
      artist: data.artist,
    });
  };

  return (
    <div className="space-y-1">
      <p className="text-foreground-quaternary flex items-center gap-1.5 font-mono text-xs">
        <SpotifyIcon className="h-3 w-3 flex-shrink-0" />
        now playing
      </p>
      <div>
        {data.trackUrl ? (
          <a
            href={data.trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTrackClick}
            className="text-foreground-secondary block font-mono text-sm no-underline hover:underline"
          >
            {data.title}
          </a>
        ) : (
          <span className="text-foreground-secondary block font-mono text-sm">
            {data.title}
          </span>
        )}
        <p className="text-foreground-tertiary font-mono text-xs">
          {data.artist} · {data.album}
        </p>
      </div>
    </div>
  );
}
