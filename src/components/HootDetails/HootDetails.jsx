import AuthorInfo from '../AuthorInfo/AuthorInfo';
import { useParams, Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { useState, useEffect, useContext } from 'react';
import * as hootService from '../../services/hootService';
import CommentForm from '../CommentForm/CommentForm';
import styles from './HootDetails.module.css';
import Loading from '../Loading/Loading';
import { UserContext } from '../../contexts/UserContext';


const HootDetails = ({ handleDeleteHoot }) => {
  const handleDeleteComment = async (commentId) => {
    console.log('commentId:', commentId);
    await hootService.deleteComment(hootId, commentId);
    setHoot({
      ...hoot,
      comments: hoot.comments.filter((comment) => comment._id !== commentId),
    });
  };
  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);

  console.log('hoot state:', hoot);

  if (!hoot) return <Loading />;

  return (
    <main className={styles.container}>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <div>
            {/* Removed duplicate author/date <p> tag, now only using AuthorInfo */}
      <AuthorInfo content={hoot} />
            {hoot.author._id === user._id && (
              <>
                <Link to={`/hoots/${hootId}/edit`}>
                  <Icon category='Edit' />
                </Link>
                <button onClick={() => handleDeleteHoot(hootId)}>
                  <Icon category='Trash' />
                </button>
              </>
            )}
          </div>
        </header>
        <p>{hoot.text}</p>
      </section>
      {/* All updates are in the comments section! */}
      <section>
        <h2>Comments</h2>
        {/* Pass the handleAddComment function to the CommentForm Component */}
        <CommentForm handleAddComment={handleAddComment}/>
        {!hoot.comments?.length && <p>There are no comments.</p>}
        {(hoot.comments || []).map((comment) => (
          <article key={comment._id}>
            <header>
              <div>
                {/* Removed duplicate author/date <p> tag, now only using AuthorInfo */}
                  <AuthorInfo content={comment} />
                {comment.author._id === user._id && (
                  <>
                    <Link to={`/hoots/${hootId}/comments/${comment._id}/edit`}>
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

export default HootDetails;