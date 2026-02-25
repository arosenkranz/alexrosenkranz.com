interface Env {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
}

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyImage {
  url: string;
  width: number;
  height: number;
}

interface SpotifyNowPlayingResponse {
  is_playing: boolean;
  item?: {
    name: string;
    external_urls: { spotify: string };
    artists: SpotifyArtist[];
    album: {
      name: string;
      images: SpotifyImage[];
    };
  };
}

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  trackUrl?: string;
}

interface PagesContext {
  env: Env;
  request: Request;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

function jsonResponse(data: NowPlayingData): Response {
  return new Response(JSON.stringify(data), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=30',
    },
  });
}

async function getAccessToken(env: Env): Promise<string> {
  const credentials = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data = (await response.json()) as SpotifyTokenResponse;
  return data.access_token;
}

export const onRequestGet = async (context: PagesContext): Promise<Response> => {
  try {
    const accessToken = await getAccessToken(context.env);

    const response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // 204 means nothing is currently playing
    if (response.status === 204 || !response.ok) {
      return jsonResponse({ isPlaying: false });
    }

    const data = (await response.json()) as SpotifyNowPlayingResponse;

    if (!data.is_playing || !data.item) {
      return jsonResponse({ isPlaying: false });
    }

    return jsonResponse({
      isPlaying: true,
      title: data.item.name,
      artist: data.item.artists.map((a) => a.name).join(', '),
      album: data.item.album.name,
      albumArt: data.item.album.images[0]?.url,
      trackUrl: data.item.external_urls.spotify,
    });
  } catch {
    return jsonResponse({ isPlaying: false });
  }
};

export const onRequestOptions = async (_context: PagesContext): Promise<Response> => {
  return new Response(null, { headers: corsHeaders });
};
