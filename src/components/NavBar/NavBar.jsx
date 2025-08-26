import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './NavBar.module.css';
import Logo from '../../assets/images/logo.svg';

const NavBar = ({ user, handleSignOut }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const onSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberUser');
    handleSignOut && handleSignOut();
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <nav className={styles.container}>
      <div className={styles.brand}>
        <Link to='/'>
          <img src={Logo} alt='SoundCircle Logo' />
          <span className={styles.brandText}>SoundCircle</span>
        </Link>
      </div>

      <div className={styles.navContent}>
        {user ? (
          <>
            <ul className={styles.mainNav}>
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
                  to='/sound-bytes/new'
                  className={`${styles.newPostBtn} ${isActive('/sound-bytes/new')}`}
                >
                  + NEW SOUND
                </Link>
              </li>
            </ul>

            <div className={styles.userSection}>
              <div className={styles.profileDropdown}>
                <button
                  className={styles.profileButton}
                  onClick={toggleProfileDropdown}
                  aria-label="User menu"
                >
                  <div className={styles.avatar}>
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className={styles.username}>{user.displayName || user.username}</span>
                  <span className={styles.dropdownArrow}>▼</span>
                </button>

                {isProfileDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link
                      to={`/profile/${user.username}`}
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to='/settings'
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      to='/my-sounds'
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      My Sounds
                    </Link>
                    <Link
                      to='/following'
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Following
                    </Link>
                    <hr />
                    <button onClick={onSignOut} className={styles.signOutBtn}>
                      Sign Out
                    </button>
                  </div>
                )}
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