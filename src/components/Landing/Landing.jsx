import styles from './Landing.module.css';

const Landing = () => {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.splash}>
        </section>
        <section className={styles.about}>
          <header>
            <h3>This is a test area</h3>
            <h1>This is a test area</h1>
          </header>
          <article>
            <p>
            This is a test area
            </p>
          </article>
        </section>

        <section className={styles.testimonial}>
          <header>
            <h3>This is a test area</h3>
            <h1>This is a test area</h1>
          </header>
          <article>
            <header>
              <h4>This is a test area</h4>
              <p>This is a test area</p>
            </header>
            <p>
            This is a test area
            </p>
            <footer>git 
            </footer>
          </article>
        </section>
      </main>

      <footer className={styles.footer}>
      </footer>
    </>
  );
};

export default Landing;
