import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';
import * as soundCircleService from '../../services/soundCircleService';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { username } = useParams() || { username: user?.username }; // Fallback to current user if no param
  const [users, setUsers] = useState([]);
  const [soundBytes, setSoundBytes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  //const [progress, setProgress] = useState(0);
  const [bio, setBio] = useState('This user has no bio'); // Local bio state
  const [editingBio, setEditingBio] = useState(false);
  const [bioFormData, setBioFormData] = useState('');
  const [avatar, setAvatar] = useState('/src/assets/images/profile.png'); // Local avatar state
  const [editingAvatar, setEditingAvatar] = useState(false);
  const fileInputRef = useRef(null);
  const [hoveredFriend, setHoveredFriend] = useState(null);

  const currentTrack = soundBytes[currentIndex];
  const isOwnProfile = user && user.username === username;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch {
        // Error handled silently
      }
    };
    const fetchSoundBytes = async () => {
      try {
        const soundBytesData = await soundCircleService.index();
        const userSoundBytes = soundBytesData.filter(sb => sb.author === username);
        setSoundBytes(userSoundBytes);
      } catch {
        // Error handled silently
      }
    };
    if (user) {
      fetchUsers();
      fetchSoundBytes();
    }
  }, [user, username]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < soundBytes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleEditBio = () => {
    setBioFormData(bio);
    setEditingBio(true);
  };

  const handleBioChange = (evt) => {
    setBioFormData(evt.target.value);
  };

  const handleSubmitBio = (evt) => {
    evt.preventDefault();
    setBio(bioFormData); // Update locally
    setEditingBio(false);
  };

  const handleAvatarHover = () => {
    if (isOwnProfile) {
      setEditingAvatar(true);
    }
  };

  const handleAvatarLeave = () => {
    setEditingAvatar(false);
  };

  const handleAvatarClick = () => {
    if (isOwnProfile && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (evt) => {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result); // Preview locally
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    console.log('Edit clicked for', currentTrack?._id);
  };

  const handleDelete = async () => {
    if (currentTrack && currentTrack._id) {
      try {
        await soundCircleService.deleteSoundByte(currentTrack._id);
        const updatedSoundBytes = soundBytes.filter((sb) => sb._id !== currentTrack._id);
        setSoundBytes(updatedSoundBytes);
        if (currentIndex >= updatedSoundBytes.length) {
          setCurrentIndex(updatedSoundBytes.length - 1);
        }
      } catch (error) {
        console.log('Error deleting soundByte:', error);
      }
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.welcome}>Welcome, {username}</h1>
      <div className={styles.avatarContainer} onMouseEnter={handleAvatarHover} onMouseLeave={handleAvatarLeave} onClick={handleAvatarClick}>
        <img src={avatar} alt="Profile avatar" className={styles.profileAvatar} />
        {editingAvatar && <div className={styles.avatarOverlay}>Change Avatar</div>}
        <input type="file" ref={fileInputRef} onChange={handleAvatarChange} style={{ display: 'none' }} accept="image/*" />
      </div>
      <div className={styles.bioSection}>
        {editingBio ? (
          <form onSubmit={handleSubmitBio}>
            <textarea value={bioFormData} onChange={handleBioChange} />
            <button type="submit">Save</button>
          </form>
        ) : (
          <p>{bio}</p>
        )}
        {isOwnProfile && !editingBio && <button onClick={handleEditBio}>Edit Bio</button>}
      </div>
      <section className={styles.soundBytesSection}>
        <h2>SoundBytes</h2>
        {soundBytes.length === 0 ? (
          <p>No SoundBytes yet.</p>
        ) : (
          soundBytes.map((sb) => (
            <div key={sb._id} className={styles.soundByteItem}>
              <h3>{sb.title}</h3>
              <p>{sb.artist}</p>
              <audio controls src={`${sb.url}#t=0,30`} />
            </div>
          ))
        )}
      </section>
      {currentTrack && (
        <section className={styles.profileSection}>
          <img
            src={currentTrack.albumCover || '/src/assets/images/profile.png'}
            alt={`${currentTrack.title} cover`}
            className={styles.coverImage}
          />
          <div className={styles.trackInfo}>
            <h2>{currentTrack.title || 'Untitled'}</h2>
            <p>{currentTrack.artist || 'Unknown Artist'}</p>
            <p>{currentTrack.album || 'N/A'}</p>
            <div className={styles.controls}>
              <button onClick={handlePrevious}>Previous</button>
              <button onClick={handlePlayPause} className={styles.playButton}>{isPlaying ? 'Pause' : 'Play'}</button>
              <button onClick={handleNext}>Next</button>
            </div>
            {/* <div className={styles.progress}>
              <progress value={progress} max="100" />
              <span>0:00 / 3:33</span>
            </div> */}
          </div>
          <p className={styles.trackCount}>{currentIndex + 1} of {soundBytes.length}</p>
          {user && (
            <div className={styles.editDelete}>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </section>
      )}
      <div className={styles.userList}>
        <h2>Friends</h2>
        <ul>
          {users
            .filter(u => u.username !== username)
            .map((u) => (
              <li
                key={u._id}
                className={styles.userItem}
                onMouseEnter={() => setHoveredFriend(u.username)}
                onMouseLeave={() => setHoveredFriend(null)}
              >
                <Link to={`/profile/${u.username}`}>
                  <img
                    src={u.profileIcon || u.profileImage || '/src/assets/images/profile.png'}
                    alt={u.username + "'s profile"}
                    className={styles.userAvatar}
                  />
                  {u.username}
                </Link>
                {isOwnProfile && hoveredFriend === u.username && (
                  <button onClick={() => console.log(`Remove friend ${u.username} (not implemented)`)}>Remove Friend</button>
                )}
              </li>
            ))}
        </ul>
        <div className={styles.filters}>
          <button>Filter Tog</button>
          <button>Genre</button>
          <button>Region</button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;