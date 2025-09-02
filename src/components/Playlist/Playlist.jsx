// src/components/Playlist/Playlist.jsx
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';
import styles from './Playlist.module.css';
import noAlbumArt from '../../assets/images/no-album-art.jpg';

export default function Playlist() {
  const { user } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', artist: '' });
  const [err, setErr] = useState('');
  const [playing, setPlaying] = useState({ id: null, audio: null });

  useEffect(() => {
    (async () => {
      if (!user?._id) return;
      try {
        const data = await api.getPlaylist(user._id, { auth: true });
        setItems(Array.isArray(data) ? data : (data?.items || data?.tracks || []));
      } catch (err) {
        console.warn('Failed to load playlist', err);
        setErr(err?.message || 'Could not load playlist');
      }
    })();
  }, [user?._id]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onAdd = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      // Create the track, then add to playlist using trackId
      const created = await api.createTrack({ title: form.title, artist: form.artist });
      const id = created?._id || created?.id;
      if (!id) throw new Error('Could not resolve track id');
      const data = await api.addToPlaylist(user?._id, { trackId: id });
      setItems(Array.isArray(data) ? data : (data?.items || data?.tracks || []));
      setForm({ title: '', artist: '' });
    } catch (ex) {
      setErr(ex.message || 'Could not add track');
    }
  };

  const onRemove = async (id) => {
    try {
      const data = await api.removeFromPlaylist(user?._id, id);
      setItems(Array.isArray(data) ? data : (data?.items || data?.tracks || []));
    } catch (ex) {
      setErr(ex.message || 'Could not remove track');
    }
  };

  const onPlay = (t) => {
    if (!t?.soundClipUrl) return;
    // Pause current
    if (playing.audio) {
      try { playing.audio.pause(); } catch { /* no-op */ }
    }
    // Toggle if same track
    if (playing.id && (playing.id === (t._id || t.id))) {
      setPlaying({ id: null, audio: null });
      return;
    }
    const audio = new Audio(t.soundClipUrl);
    audio.play();
    setPlaying({ id: (t._id || t.id), audio });
  };

  return (
    <div className={styles.page}>
      <div className={styles.cardWrap}>
        <h1 className={styles.heading}>My Playlist</h1>
        {err && <div style={{ color: 'red' }}>{err}</div>}

        <div className={styles.formCard}>
          <form onSubmit={onAdd} className={styles.form}>
            <div className={styles.inputs}>
              <input name="title" value={form.title} onChange={onChange} placeholder="Song title" className={styles.textInput} />
              <input name="artist" value={form.artist} onChange={onChange} placeholder="Artist" className={styles.textInput} />
              {/* Only title and artist per requirements */}
            </div>
            <button className={styles.submit}>Add</button>
          </form>
        </div>

        <h2 className={styles.subheading}>Your Playlist</h2>
        {items.length === 0 ? (
          <div>Your playlist is empty.</div>
        ) : (
          <div className={styles.listWrap}>
            <ul className={styles.list}>
              {items.map((t, idx) => {
                const key = t._id || t.id || `${t.title}-${t.artist}-${idx}`;
                const img = t.coverArtUrl || noAlbumArt;
                const isPlaying = playing.id === (t._id || t.id);
                return (
                  <li key={key} className={styles.card}>
                    <div className={styles.art}>
                      <img src={img} alt="cover" />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.title}>{t.title}</div>
                      <div className={styles.artist}>{t.artist}</div>
                    </div>
                    <div className={styles.actions}>
                      <button type="button" className={`${styles.btn} ${styles.play}`} disabled={!t.soundClipUrl}
                        onClick={() => onPlay(t)}>
                        {isPlaying ? 'Pause' : 'Play'}
                      </button>
                      {/* Placeholder for future edit
                      <button type="button" className={`${styles.btn} ${styles.edit}`}>Edit</button>
                      */}
                      <button
                        type="button"
                        className={`${styles.btn} ${styles.delete} w-auto px-3 py-1 rounded border`}
                        onClick={() => onRemove(t._id || t.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
