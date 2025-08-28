// src/services/playlistService.js
import api from './api';

// ---- Fallback storage (when /users/:id/playlist is not implemented) ----
const keyForUser = (userId) => `sc_playlist_${userId || 'guest'}`;
const readLocal = (userId) => {
  try { return JSON.parse(localStorage.getItem(keyForUser(userId)) || '[]'); }
  catch { return []; }
};
const writeLocal = (userId, items) => localStorage.setItem(keyForUser(userId), JSON.stringify(items));

// Remember if backend playlist endpoints are available to reduce console noise
let playlistApiAvailable = null; // null=unknown, true/false=known

/**
 * Playlist service backed by the API playlist endpoints.
 * Note: use a userId (not username) when calling these.
 */

export const list = async (userId) => {
  if (!userId) return [];
  // If we already know API isn't available, use local
  if (playlistApiAvailable === false) return readLocal(userId);
  try {
    const res = await api.getPlaylist(userId, { auth: true });
    playlistApiAvailable = true;
    if (Array.isArray(res)) return res;
    return res?.items || res?.tracks || res?.data || [];
  } catch (err) {
    if (err?.status === 404) {
      playlistApiAvailable = false;
      return readLocal(userId);
    }
    throw err;
  }
};

export const add = async (
  userId,
  { title, artist, coverArtUrl, soundClipUrl, sourceUrl, genre }
) => {
  if (!userId) throw new Error('Missing user id');
  if (!title?.trim() || !artist?.trim()) throw new Error('Title and artist are required');

  // 1) Ensure the track exists
  const track = await api.createTrack({
    title: title.trim(),
    artist: artist.trim(),
    coverArtUrl,
    soundClipUrl,
    sourceUrl,
    genre,
  });
  const createdId = track?._id || track?.id;

  // 2) Try to add to the user's playlist (API) if available
  if (playlistApiAvailable !== false) {
    try {
      await api.addToPlaylist(userId, { trackId: createdId, track });
      playlistApiAvailable = true;
      // 3) Return the updated playlist from API
      return list(userId);
    } catch (err) {
      if (err?.status !== 404) throw err;
      playlistApiAvailable = false;
      // fall through to local below
    }
  }

  // Backend playlist not available — use local fallback
  const items = readLocal(userId);
  if (!items.find((t) => (t?._id || t?.id) === createdId)) {
    items.unshift(track);
    writeLocal(userId, items);
  }
  return items;
};

export const remove = async (userId, trackId) => {
  if (!userId) throw new Error('Missing user id');
  if (playlistApiAvailable !== false) {
    try {
      await api.removeFromPlaylist(userId, trackId);
      playlistApiAvailable = true;
      return list(userId);
    } catch (err) {
      if (err?.status !== 404) throw err;
      playlistApiAvailable = false;
      // fall through to local below
    }
  }
  const items = readLocal(userId).filter((t) => (t?._id || t?.id) !== trackId);
  writeLocal(userId, items);
  return items;
};

export const clear = async (_userId) => {
  // Not supported on API yet; keep client clear as no-op
  return [];
};
