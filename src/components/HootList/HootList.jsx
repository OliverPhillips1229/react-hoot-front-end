import styles from './HootList.module.css';


const HootList = (props) => {
  return (
    <main className={styles.container}>
      {props.hoots.length === 0 && <p>No hoots found.</p>}
      {props.hoots.map((hoot, idx) => (
        <article key={hoot.id || idx} className={styles.article}>
          <header>
            <h2>
              {hoot.title
                ? hoot.title
                : hoot.id
                  ? `Hoot #${hoot.id}`
                  : hoot.text
                    ? 'Hoot'
                    : 'Untitled Hoot'}
            </h2>
          </header>
          <p>{hoot.text || 'No text provided.'}</p>
        </article>
      ))}
    </main>
  );
};

export default HootList;
