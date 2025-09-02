
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CommentForm.module.css';
import * as soundCircleService from '../../services/soundCircleService'
// import router from react-router;


import Icon from '../Icon/Icon';

const CommentForm = (props) => {
  const navigate = useNavigate();

  const { soundbyteId, commentId } = useParams();
  const [formData, setFormData] = useState(() => {
    if (soundbyteId && commentId && props.comment) {
      return { text: props.comment.text };
    }
    return { text: '' };
  });
// useEffect (() =>{ console.log(props)}, [props]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (commentId) {
      // props.handleUpdateComment(commentId, formData)
      // console.log(formData.text)
      {soundCircleService.updateComment(soundbyteId, commentId, formData); 
        navigate(`/soundbytes/${soundbyteId}`); }

    } else {
        props.handleAddComment(formData);
    }
    // setFormData({ text: '' });
  };



  if (soundbyteId && commentId ) return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Edit Comment</h1>
        <label htmlFor='text-input'>Your comment:</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <button type='submit'>
          <Icon category='Create' />
        </button>
      </form>
    </main>
  );


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your comment:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        author={formData.author}
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>
        <Icon category='Create' />
      </button>
    </form>
  );
};

export default CommentForm;