import styles from './SoundByteList.module.css';


const SoundByteList = (props) => {
  return (
    <main className={styles.container}>
      {props.soundBytes.length === 0 && <p>No SoundBytes found.</p>}
      {props.soundBytex.map((soundByte, idx) => (
        <article key={soundByte.id || idx} className={styles.article}>
          <header>
            <h2> 
              {/* update to match SoundByte ERD */}
              {soundByte.title
                ? soundByte.title
                : soundByte.id
                  ? `SoundByte #${soundByte.id}`
                  : soundByte.text
                    ? 'SoundByte'
                    : 'Untitled SoundByte'}
            </h2>
          </header>
          <p>{soundByte.text || 'No text provided.'}</p>
        </article>
      ))}
    </main>
  );
};

export default SoundByteList;
