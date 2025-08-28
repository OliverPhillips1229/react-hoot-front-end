// src/components/Playlist/Playlist.jsx
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as playlist from '../../services/playlistService';
import styles from './Playlist.module.css';
import noAlbumArt from '../../assets/images/no-album-art.jpg';

export default function Playlist() {
  const { user } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', artist: '', coverArtUrl: '', soundClipUrl: '' });
  const [err, setErr] = useState('');
  const [playing, setPlaying] = useState({ id: null, audio: null });

  useEffect(() => {
    (async () => {
      const data = await playlist.list(user?._id);
      setItems(data);
    })();
  }, [user?._id]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onAdd = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const data = await playlist.add(user?._id, form);
      setItems(data);
      setForm({ title: '', artist: '', coverArtUrl: '', soundClipUrl: '' });
    } catch (ex) {
      setErr(ex.message || 'Could not add track');
    }
  };

  const onRemove = async (id) => {
    const data = await playlist.remove(user?._id, id);
    setItems(data);
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
    <div className={styles.container}>
      <h1 className={styles.heading}>My Playlist</h1>
      {err && <div style={{ color: 'red' }}>{err}</div>}

      <form onSubmit={onAdd}>
        <div className={styles.inputs}>
          <input name="title" value={form.title} onChange={onChange} placeholder="Song title" className={styles.textInput} />
          <input name="artist" value={form.artist} onChange={onChange} placeholder="Artist" className={styles.textInput} />
          <input name="coverArtUrl" value={form.coverArtUrl} onChange={onChange} placeholder="Cover Art URL (optional)" className={styles.textInput} />
          <input name="soundClipUrl" value={form.soundClipUrl} onChange={onChange} placeholder="Sound Clip URL (optional)" className={styles.textInput} />
        </div>
        <button className={styles.submit}>Add</button>
      </form>

      <h2 className={styles.subheading}>Your Playlist</h2>
      {items.length === 0 ? (
        <div>Your playlist is empty.</div>
      ) : (
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
                  <button type="button" className={`${styles.btn} ${styles.delete}`} onClick={() => onRemove(t._id || t.id)}>Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
