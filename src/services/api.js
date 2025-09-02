// src/services/api.js

// --- Base URL --------------------------------------------------------------
const rawBase = import.meta?.env?.VITE_BACK_END_SERVER_URL;

const BASE = (rawBase && String(rawBase).replace(/\/+$/, '')) || 'http://localhost:3000';

if (!rawBase) {
  console.warn('[api] Using default BASE', BASE, '(set VITE_API_URL or VITE_BACK_END_SERVER_URL to override)');
}

const join = (path) => `${BASE}${path.startsWith('/') ? path : `/${path}`}`;

// --- Auth header -----------------------------------------------------------
const authHeader = () => {
  const t = localStorage.getItem('token');
  return t ? { Authorization: `Bearer ${t}` } : {};
};

// --- Querystring helper ----------------------------------------------------
const qs = (query) => {
  if (!query || typeof query !== 'object') return '';
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    params.set(k, String(v));
  });
  const s = params.toString();
  return s ? `?${s}` : '';
};

// --- Fetch wrapper ---------------------------------------------------------
async function req(
  path,
  { method = 'GET', body, auth = false, query, headers = {}, timeout, cache } = {}
) {
  const url = join(path) + (query ? qs(query) : '');

  // If body is FormData, let fetch set the headers for us.
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const baseHeaders = isFormData ? {} : { 'Content-Type': 'application/json' };
  const hdrs = { ...baseHeaders, ...(auth ? authHeader() : {}), ...headers };

  // Optional timeout via AbortController
  let controller;
  if (timeout && typeof AbortController !== 'undefined') {
    controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
  }

  const res = await fetch(url, {
    method,
    headers: hdrs,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    signal: controller?.signal,
    // Avoid 304 responses that return no body by defaulting to no-store
    cache: cache || (method === 'GET' ? 'no-store' : undefined),
  });

  // Parse body (try JSON, then text, allow 204)
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const message = (data && (data.err || data.error || data.message)) || res.statusText;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// --- Public API ------------------------------------------------------------

export const api = {
  // auth
  signUp: (p) => req('/auth/sign-up', { method: 'POST', body: p }),
  signIn: (p) => req('/auth/sign-in', { method: 'POST', body: p }),

  // sBytes (protected)
  listSoundBytes: () => req('/sBytes', { auth: true }),
  getSoundByte: (id) => req(`/sBytes/${id}`, { auth: true }),
  createSoundByte: (p) => req('/sBytes', { method: 'POST', body: p, auth: true }),
  updateSoundByte: (id, p) => req(`/sBytes/${id}`, { method: 'PUT', body: p, auth: true }),
  deleteSoundByte: (id) => req(`/sBytes/${id}`, { method: 'DELETE', auth: true }),
  likeSoundByte: (id) => req(`/sBytes/${id}/like`, { method: 'POST', auth: true }),
  unlikeSoundByte: (id) => req(`/sBytes/${id}/unlike`, { method: 'POST', auth: true }),

  // tracks
  // Accepts either a string (q) or an object { q, limit, page, auth }
  listTracks: (arg) => {
    if (typeof arg === 'string') return req('/tracks', { query: { q: arg }, auth: true });
    const { q = '', limit = 10, page = 1, auth = true } = arg || {};
    return req('/tracks', { query: { q, limit, page }, auth });
  },
  getTrack: (id) => req(`/tracks/${id}`),
  createTrack: (p) => req('/tracks', { method: 'POST', body: p, auth: true }),
  updateTrack: (id, p) => req(`/tracks/${id}`, { method: 'PUT', body: p, auth: true }),
  deleteTrack: (id) => req(`/tracks/${id}`, { method: 'DELETE', auth: true }),

  // playlist endpoints
  getPlaylist: (userId, { auth = true } = {}) => req(`/users/${userId}/playlist`, { auth, cache: 'no-store' }),
  addToPlaylist: (userId, { trackId, track }) =>
    req(`/users/${userId}/playlist`, {
      method: 'POST',
      body: trackId ? { trackId } : { track },
      auth: true,
    }),
  removeFromPlaylist: (userId, trackId) =>
    req(`/users/${userId}/playlist/${trackId}`, { method: 'DELETE', auth: true }),
};

export default api;
