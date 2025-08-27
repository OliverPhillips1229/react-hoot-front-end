import styles from './SoundByteList.module.css';
// import { Link } from 'react-router';


const SoundByteList = (props) => {
  console.log(props)
  return (

    <main>
      <h1>Here are all your SoundBytes!</h1>

      {props.soundBytes.map((soundByte) => (
        <p>{soundByte.artist}</p>
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
