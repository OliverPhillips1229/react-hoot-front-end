import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './HootForm.module.css';

import * as hootService from '../../services/hootService';

const HootForm = (props) => {
  // Destructure hootId from the useParams hook
  const { hootId } = useParams();
  const { user } = props;
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'News',
    createdAt: new Date().toISOString(),
    author: user ? user.username : 'Anonymous',
  });

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setFormData(hootData);
    };
    if (hootId) fetchHoot();

    // Add a cleanup function
    return () => setFormData({ title: '', text: '', category: 'News' });
  }, [hootId]);


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
  evt.preventDefault();
  const hootData = {
    ...formData,
    createdAt: new Date().toISOString(),
    author: user ? user.username : 'Anonymous',
  };
  if (hootId) {
    props.handleUpdateHoot(hootId, hootData);
  } else {
    props.handleAddHoot(hootData);
  }
};


  return (
    <main className={styles.container}>
      {/* Add a heading */}
      <h1>{hootId ? 'Edit Hoot' : 'New Hoot'}</h1>
      <form onSubmit={handleSubmit}>
        {/* Form labels and inputs */}
        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='text-input'>Text</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor='category-input'>Category</label>
        <select
          required
          name='category'
          id='category-input'
          value={formData.category}
          onChange={handleChange}
        >
          <option value='News'>News</option>
          <option value='Games'>Games</option>
          <option value='Music'>Music</option>
          <option value='Movies'>Movies</option>
          <option value='Sports'>Sports</option>
          <option value='Television'>Television</option>
        </select>
        <button type='submit' disabled={!formData.title || !formData.text}>SUBMIT</button>
      </form>
    </main>
  );
};

export default HootForm;