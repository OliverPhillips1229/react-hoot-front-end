import styles from './Discover.module.css';

const Landing = () => {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.about}>
          <header>
            <h1>Discover is where SoundCircle truly comes alive.</h1>
          </header>
          <article>
            <p>
            Here, every soundbyte tells a story—an instant glimpse into 
            what moves listeners across the globe. It’s more than just 
            browsing songs; it’s stepping into a living stream of musical 
            moments, each one shared openly by people who love 
            music as much as you do.
            On Discover, you’re not just scrolling—you’re connecting. 
            Every playlist preview, every lyric snippet, every hidden 
            gem introduces you to someone new, someone whose tastes 
            might mirror your own or spark an entirely fresh obsession. 
            This is the page where chance encounters turn into lasting 
            connections, and where your feed becomes a mixtape curated 
            by the world.
            By exploring Discover, you’re joining in on a global 
            conversation written in melodies and rhythms. It’s where 
            individuality shines through sound, and where community 
            is built one song at a time.
            </p>
          </article>
        </section>

        <section className={styles.contentBox}>
          <header>
            <h1>Discover is where the world’s soundtrack unfolds before your eyes</h1>
          </header>
          <article>
            <p>
            Here, every scroll reveals voices and songs you may never 
            have found otherwise—each soundbyte a glimpse into someone’s 
            story, mood, or memory. You’ll stumble on hidden gems, 
            rediscover classics through a fresh perspective, and 
            connect with the energy of music lovers from every corner o
            f the globe.
            This is more than a feed; it’s a living archive of what 
            moves people right now. Each public soundbyte is an open 
            invitation to listen closer, laugh, reflect, or dance along. 
            By exploring, you’re not just hearing what others are playing—you’re 
            sharing in their moments.
            On Discover, you might find…
            •   🎵 “This track got me through finals week—still gives me chills.”
            •   🎶 “An underrated gem from 2010. How did we all sleep on this?”
            •   🎤 “This chorus feels like summer evenings with friends.”
            Every soundbyte adds another thread to the tapestry of SoundCircle, 
            and every interaction keeps the rhythm going. Here, music doesn’t 
            just play—it resonates, amplifying the voices of a global family 
            united through song.
            </p>
            <footer>
            </footer>
          </article>
        </section>
      </main>

      <footer className={styles.footer}>
        © SoundCircle 2025
      </footer>
    </>
  );
};

export default Landing;

