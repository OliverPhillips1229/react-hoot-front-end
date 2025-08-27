import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ user, handleSignOut }) => {
  const location = useLocation();

  const onSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberUser');
    handleSignOut && handleSignOut();
  };

  const isActive = (path) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <nav className={styles.container}>
      <div className={styles.brand}>
        <Link to='/'>
          <span className={styles.brandText}>SoundCircle</span>
        </Link>
      </div>

      <div className={styles.navContent}>
        {user ? (
          <>
            <ul className={styles.mainNav}>
              <li><Link to={`/playlist/${user.username}`} className={isActive('/')}>PLAYLIST</Link></li>
              <li>
                <Link to='/' className={isActive('/')}>
                  FEED
                </Link>
              </li>
              <li>
                <Link to='/discover' className={isActive('/discover')}>
                  DISCOVER
                </Link>
              </li>
              <li>
                <Link
                  to='/soundbytes/new'
                  className={`${styles.newPostBtn} ${isActive('/soundbytes/new')}`}
                >
                  + NEW SOUND
                </Link>
              </li>
            </ul>

            <div className={styles.userSection}>
              <div className={styles.profile}>
                <Link to={`/profile/${user.username}`}>
                  <div className={styles.avatar}>
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className={styles.username}>{user.displayName || user.username}</span>
                </Link>
                <button onClick={onSignOut} className={styles.signOutBtn}>
                  Sign Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <ul className={styles.authNav}>
            <li>
              <Link to='/' className={isActive('/')}>
                HOME
              </Link>
            </li>
            <li>
              <Link to='/discover' className={isActive('/discover')}>
                DISCOVER
              </Link>
            </li>
            <li>
              <Link
                to='/sign-in'
                className={`${styles.loginBtn} ${isActive('/sign-in')}`}
              >
                LOG IN
              </Link>
            </li>
            <li>
              <Link
                to='/sign-up'
                className={`${styles.signupBtn} ${isActive('/sign-up')}`}
              >
                SIGN UP
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;