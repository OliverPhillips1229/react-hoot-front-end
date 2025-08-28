// src/services/playlistService.js
// Front-end only service for Playlist. No jukebox usage.

const rawBase = (import.meta?.env?.VITE_API_URL || import.meta?.env?.VITE_BACK_END_SERVER_URL || 'http://localhost:3000');
const BASE = String(rawBase).replace(/\/+$/, ''); // no trailing slash

const authHeader = () => {
  const t = localStorage.getItem('token');
  return t ? { Authorization: `Bearer ${t}` } : {};
};

async function request(path, { method = 'GET', body } = {}) {
  const url = `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: body ? JSON.stringify(body) : undefined,
    cache: method === 'GET' ? 'no-store' : undefined,
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const err = new Error((data && (data.err || data.message)) || res.statusText);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function getPlaylist(userId) {
  if (!userId) return [];
  return request(`/users/${userId}/_playlist`);
}

export async function addToPlaylist(userId, { title, artist, coverArtUrl, soundClipUrl, sourceUrl, genre }) {
  if (!userId) throw new Error('Missing user id');
  if (!title?.trim() || !artist?.trim()) throw new Error('Title and artist are required');

  // a) Try to create the track
  let trackDoc;
  try {
    trackDoc = await request('/tracks', {
      method: 'POST',
      body: { title: title.trim(), artist: artist.trim(), coverArtUrl, soundClipUrl, sourceUrl, genre },
    });
  } catch (err) {
    if (err.status !== 409) throw err; // not a duplicate — rethrow
    // b) On 409 duplicate, fallback to search and take first result
    const q = `${title} ${artist}`.trim();
    const params = new URLSearchParams({ q, limit: '1', page: '1' });
    const results = await request(`/tracks?${params.toString()}`);
    const list = Array.isArray(results) ? results : (results?.items || results?.tracks || results?.data || []);
    if (!list.length) throw new Error('Track already exists but search returned no results');
    trackDoc = list[0];
  }

  const id = trackDoc?._id || trackDoc?.id;
  if (!id) throw new Error('Could not resolve track id');

  // c) Add to the user playlist via _playlist using { trackId }
  await request(`/users/${userId}/_playlist`, { method: 'POST', body: { trackId: id } });
}

export async function removeFromPlaylist(userId, itemId) {
  if (!userId || !itemId) throw new Error('Missing parameters');
  return request(`/users/${userId}/_playlist/${itemId}`, { method: 'DELETE' });
}
