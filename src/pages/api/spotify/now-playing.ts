import type { APIContext } from 'astro';

export const prerender = false;

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

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
  const credentials = btoa(`${clientId}:${clientSecret}`);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data = (await response.json()) as SpotifyTokenResponse;
  return data.access_token;
}

export async function GET({ locals, url }: APIContext): Promise<Response> {
  const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret, SPOTIFY_REFRESH_TOKEN: refreshToken } = locals.runtime.env;
  const debug = url.searchParams.has('debug');

  if (!clientId || !clientSecret || !refreshToken) {
    const missing = ['SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET', 'SPOTIFY_REFRESH_TOKEN'].filter(
      (k) => !locals.runtime.env[k as keyof typeof locals.runtime.env]
    );
    return new Response(JSON.stringify({ isPlaying: false, error: 'missing_env', missing }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);

    const response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (debug) {
      const body = response.status !== 204 ? await response.text() : '(no body — 204)';
      return new Response(JSON.stringify({ status: response.status, body }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return new Response(JSON.stringify({ isPlaying: false, error: message }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { headers: corsHeaders });
}
