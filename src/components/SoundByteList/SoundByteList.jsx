import styles from './SoundByteList.module.css';
import { Link } from 'react-router';


const SoundByteList = (props) => {
  return (
    <main className={styles.container}>
      {props.soundBytes.length === 0 && <p>No SoundBytes found.</p>}
      {props.soundBytes.map((soundByte, idx) => (
        <Link key={soundByte._id} to={`/soundbytes/${soundByte._id}`}>
          <article key={soundByte.id || idx} className={styles.article}>
            <header>
              <h1>
                {soundByte.title}
              </h1>
              <h2>by {soundByte.artist || 'No text provided.'}</h2>
            </header>
            <h3>Album: {soundByte.album} </h3>
            <h3> Link: {soundByte.url}</h3>
          </article>
        </Link>
      ))}
    </main>
  );

};
export default SoundByteList;
