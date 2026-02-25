#!/usr/bin/env node
/**
 * get-spotify-token.mjs
 *
 * One-time helper to obtain a Spotify refresh token via the OAuth authorization
 * code flow. Run this once, save the refresh_token to Cloudflare, and you're done.
 *
 * Usage:
 *   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-spotify-token.mjs
 *
 * What it does:
 *   1. Prints an authorization URL — open it in your browser
 *   2. Starts a local server on port 3000 to catch Spotify's redirect
 *   3. Exchanges the auth code for tokens
 *   4. Prints the refresh_token
 */

import http from 'node:http';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:3000/callback';
const SCOPE = 'user-read-currently-playing';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Error: SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set.');
  console.error('');
  console.error('  SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-spotify-token.mjs');
  process.exit(1);
}

const authUrl = new URL('https://accounts.spotify.com/authorize');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('scope', SCOPE);

console.log('');
console.log('Step 1: Add this redirect URI to your Spotify app in the developer dashboard:');
console.log(`  ${REDIRECT_URI}`);
console.log('');
console.log('Step 2: Open this URL in your browser to authorize:');
console.log(`  ${authUrl.toString()}`);
console.log('');
console.log('Waiting for Spotify to redirect back to localhost:3000...');

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:3000`);

  if (url.pathname !== '/callback') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error || !code) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end(`<h1>Authorization failed</h1><p>${error ?? 'No code returned'}</p>`);
    server.close();
    console.error(`\nAuthorization failed: ${error ?? 'no code in redirect'}`);
    process.exit(1);
  }

  try {
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      throw new Error(`Token exchange failed (${tokenRes.status}): ${text}`);
    }

    const tokens = await tokenRes.json();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Success! You can close this tab.</h1><p>Check your terminal for the refresh token.</p>');
    server.close();

    console.log('');
    console.log('Success! Add these to Cloudflare Workers & Pages → alexrosenkranz → Settings → Variables:');
    console.log('');
    console.log(`  SPOTIFY_CLIENT_ID     = ${CLIENT_ID}`);
    console.log(`  SPOTIFY_CLIENT_SECRET = ${CLIENT_SECRET}`);
    console.log(`  SPOTIFY_REFRESH_TOKEN = ${tokens.refresh_token}`);
    console.log('');
    console.log('The refresh_token does not expire. Store it as an encrypted secret.');
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`<h1>Error</h1><p>${err.message}</p>`);
    server.close();
    console.error('\nFailed to exchange token:', err.message);
    process.exit(1);
  }
});

server.listen(3000, '127.0.0.1', () => {});
