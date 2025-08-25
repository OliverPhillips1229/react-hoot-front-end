import AuthorInfo from '../AuthorInfo/AuthorInfo';
import { useParams, Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { useState, useEffect, useContext } from 'react';
import * as soundByteService from '../../services/soundByteService'; //confirm names align
import CommentForm from '../CommentForm/CommentForm';
import styles from './SoundByteDetails.module.css';//confirm names align
import Loading from '../Loading/Loading';
import { UserContext } from '../../contexts/UserContext';


const SoundByteDetails = ({ handleDeleteSoundByte }) => {
  const handleDeleteComment = async (commentId) => {
    console.log('commentId:', commentId);
    await soundByteService.deleteComment(soundByteId, commentId);
    setSoundByte({
      ...soundByte,
      comments: soundByte.comments.filter((comment) => comment._id !== commentId),
    });
  };
  const handleAddComment = async (commentFormData) => {
    const newComment = await soundByteService.createComment(soundByteId, commentFormData);
    setSoundByte({ ...soundByte, comments: [...soundByte.comments, newComment] });
  };
  const { soundByteId } = useParams();
  const [soundByte, setSoundByte] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchSoundByte = async () => { //confirm names align
      const soundByteData = await soundByteService.show(soundByteId);
      setSoundByte(soundByteData);
    };
    fetchSoundByte();
  }, [soundByteId]);

  console.log('soundByte state:', soundByte);

  if (!soundByte) return <Loading />;

  return (
    <main className={styles.container}>
      <section>
        <header>
          <p>{soundByte.category.toUpperCase()}</p>
          <h1>{soundByte.title}</h1>
          <div>
            {/* Removed duplicate author/date <p> tag, now only using AuthorInfo */}
      <AuthorInfo content={soundByte} />
            {soundByte.author._id === user._id && (
              <>
                <Link to={`/soundBytes/${soundByteId}/edit`}>
                  <Icon category='Edit' />
                </Link>
                <button onClick={() => handleDeleteSoundByte(soundByteId)}>
                  <Icon category='Trash' />
                </button>
              </>
            )}
          </div>
        </header>
        <p>{soundByte.text}</p>
      </section>
      {/* All updates are in the comments section! */}
      <section>
        <h2>Comments</h2>
        {/* Pass the handleAddComment function to the CommentForm Component */}
        <CommentForm handleAddComment={handleAddComment}/>
        {!soundByte.comments?.length && <p>There are no comments.</p>}
        {(soundByte.comments || []).map((comment) => (
          <article key={comment._id}>
            <header>
              <div>
                {/* Removed duplicate author/date <p> tag, now only using AuthorInfo */}
                  <AuthorInfo content={comment} />
                {comment.author._id === user._id && (
                  <>
                    <Link to={`/soundBytes/${soundByteId}/comments/${comment._id}/edit`}>
                      <Icon category='Edit' />
                    </Link>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      <Icon category='Trash' />
                    </button>
                  </>
                )}
              </div>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default SoundByteDetails;