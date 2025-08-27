import styles from './SoundByteList.module.css';
// import { Link } from 'react-router';


const SoundByteList = (props) => {
  console.log(props)
  return (


    <main className={styles.container}>
      {props.soundBytes.length === 0 && <p>No SoundBytes found.</p>}
      {props.soundBytes.map((soundByte, idx) => (
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

    // <main className={styles.container}>
    //   {/* {props.soundBytes.length === 0 && <p>No SoundBytes found.</p>} */}
    //   {props.soundBytes.map((soundByte) => (
    //     // <Link key={soundByte._id} to {`/soundBytes/${soundByte._id}`}>
    //     <article 
    //     key={soundByte._id} className={styles.article}>
    //       <header>
    //         <h2> 
    //           {soundByte.artist}</h2>
    //       </header>
    //       {/* <p>{soundByte.text || 'No text provided.'}</p> */}
    //     </article>
    //   ))}
    // </main>
  );
  
  
};
  export default SoundByteList;
