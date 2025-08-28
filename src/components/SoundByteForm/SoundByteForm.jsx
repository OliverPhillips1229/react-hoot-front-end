import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './SoundByteForm.module.css';

import * as soundCircleService from '../../services/soundCircleService';

const SoundByteForm = (props) => {
  const { soundByteId } = useParams();
  const { user } = props;
  const [formData, setFormData] = useState({
    artist: '',
    title: '',
    album: '',
    url: '',
    notes: '',
  });

  useEffect(() => {
    const fetchSoundByte = async () => {
      const soundByteData = await soundCircleService.show(soundByteId);
      setFormData(soundByteData);
    };
    if (soundByteId) fetchSoundByte();

    // Add a cleanup function
    return () => setFormData({ artist: '', title: '', album: '', url: '', notes: '', });
  }, [soundByteId]);


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (soundByteId) {
      props.handleUpdateSoundByte(soundByteId, formData);
    } else {
      props.handleAddSoundByte(formData);
    }
  };


  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
      <h1>{soundByteId ? 'Edit SoundByte' : 'New SoundByte'}</h1>

        {/* Form labels and inputs */}
        <label htmlFor='artist-input'>Artist</label>
        <textarea
          required
          type='text'
          name='artist'
          id='artist-input'
          value={formData.artist}
          onChange={handleChange}
        />

        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor='album-input'>Album</label>
        <textarea
          required
          type='text'
          name='album'
          id='album-input'
          value={formData.album}
          onChange={handleChange}
        />

        <label htmlFor='url-input'>URL</label>
        <textarea
          required
          type='text'
          name='url'
          id='url-input'
          value={formData.url}
          onChange={handleChange}
        />

        <label htmlFor='notes-input'>Notes</label>
        <textarea
          required
          type='text'
          name='notes'
          id='notes-input'
          value={formData.notes}
          onChange={handleChange}
        />
        
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default SoundByteForm;