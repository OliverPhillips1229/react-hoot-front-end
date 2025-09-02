import AuthorInfo from '../AuthorInfo/AuthorInfo';
import { useParams, Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { useState, useEffect, useContext } from 'react';
import * as soundCircleService from '../../services/soundCircleService';
import CommentForm from '../CommentForm/CommentForm';
import styles from './SoundByteDetails.module.css';
import Loading from '../Loading/Loading';
import { UserContext } from '../../contexts/UserContext';


const SoundByteDetails = ({ handleDeleteSoundByte }) => {
  const handleDeleteComment = async (commentId) => {
    console.log('commentId:', commentId);
    await soundCircleService.deleteComment(soundByteId, commentId);
    setSoundByte({
      ...soundByte,
      comments: soundByte.comments.filter((comment) => comment._id !== commentId),
    });
  };
  const handleAddComment = async (commentFormData) => {
    const newComment = await soundCircleService.createComment(soundByteId, commentFormData);
    setSoundByte({ ...soundByte, comments: [...soundByte.comments, newComment] });
  };
  const handleUpdateComment = async (commentId) => {
    const updatedComment = await soundCircleService.updateComment(soundByteId, commentFormData);
    setSoundByte({ ...soundByte, comments: [...soundByte.comment, updatedComment] });
  };

  const { soundByteId } = useParams();
  const [soundByte, setSoundByte] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchSoundByte = async () => {
      const soundByteData = await soundCircleService.show(soundByteId);
      setSoundByte(soundByteData);
    };
    fetchSoundByte();
  }, [soundByteId]);

  if (!soundByte) return <Loading />;


  return (
    <main className={styles.container}>
      <section>
        <header>
          <h1>{soundByte.title}</h1>
          <h3>{soundByte.artist}</h3>
          <h3>{soundByte.album}</h3>
          <h4>{soundByte.url}</h4>
          <h5>{soundByte.notes}</h5>
          <div>
            <AuthorInfo content={soundByte} />
            {soundByte.author?._id === user._id && (
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

      <section>
        <h2>Comments</h2>
        <CommentForm
          handleAddComment={handleAddComment}
          handleUpdateComment={handleUpdateComment}
        />

        {!soundByte.comments?.length && <p>There are no comments.</p>}

        {(soundByte.comments || []).map((comment) => (
          <article key={comment._id}>
            <header>
              <div>
                <AuthorInfo content={comment} />
                {console.log(soundByte)}
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