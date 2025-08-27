import styles from './Landing.module.css';
import logo from '../../assets/images/SC-Transparent.png'

const Landing = () => {
  return (
    <>
      <main className={styles.container}>
        <img src={logo} alt='Sound Circle Logo'></img>
        <section className={styles.about}>
          <header>
            <h3>About us</h3>
            <h1>What is SoundCircle?</h1>
          </header>
          <article>
            <p>
            SoundCircle is more than just a media platform—it’s a 
            vibrant hub where your love of music finds its community. 
            Here, your unique tastes aren’t just appreciated, they’re 
            celebrated. Whether you’re discovering a hidden gem or 
            replaying your all-time favorite track, SoundCircle gives 
            you a space to share those moments with people who truly get it. 
            It’s where friendships begin through a single song, and where 
            playlists become personal soundtracks that connect hearts across the globe.
            By joining SoundCircle, you’re not only staying up to date with 
            the latest trends—you’re shaping them. Every song you share, 
            every playlist you curate, and every friend you connect with 
            adds to the collective rhythm of this community. It’s a place 
            to inspire and be inspired, to explore the music that moves 
            others, and to build bonds that go beyond the screen. 
            With SoundCircle, your passion for music doesn’t just stay 
            with you—it grows, evolves, and resonates with a world of 
            like-minded listeners.
            </p>
          </article>
        </section>

        <section className={styles.testimonial}>
          <header>
            <h3>But why music?</h3>
            <h1>And why now?!</h1>
          </header>
          <article>
            <header>
              <h4>All will be answered below...</h4>
            </header>
            <p>
            Music has always held the power to connect people across 
            cultures, backgrounds, and experiences. From the earliest 
            drumbeats shared around a fire to the global concerts streamed 
            across continents today, music has been the language of unity. 
            It transcends words, creating bonds where there might otherwise 
            be silence, and reminding us that at the core of our humanity, 
            rhythm and melody are things we all share. Every note has the 
            ability to stir emotion, bring back memories, and create moments 
            of joy that are felt collectively, no matter who you are or where 
            you come from.
            Now, by contributing to this community, you’re carrying that same 
            tradition forward. You’re not just listening—you’re participating 
            in a movement that celebrates connection, creativity, and belonging. 
            Your presence here helps strengthen the bonds between people who may 
            have never crossed paths otherwise, turning this space into something 
            more than just a gathering—it becomes a family. With every interaction, 
            story, or shared song, you’re helping to weave a richer tapestry of voices 
            and experiences, ensuring that the music doesn’t just play, but resonates.
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
