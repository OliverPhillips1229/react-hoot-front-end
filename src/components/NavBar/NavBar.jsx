import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './NavBar.module.css';

const NavBar = ({ user, handleSignOut }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const onSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberUser');
    handleSignOut && handleSignOut();
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <nav className={styles.container}>
      <div className={styles.brand}>
        <Link to='/' onClick={closeMobileMenu}>
          <span className={styles.brandText}>SoundCircle</span>
        </Link>
      </div>

      <button 
        className={styles.mobileMenuToggle}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${styles.navContent} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        {user ? (
          <>
            <ul className={styles.mainNav}>
              <li>
                <Link 
                  to='/' 
                  className={isActive('/')}
                  onClick={closeMobileMenu}
                >
                  FEED
                </Link>
              </li>
              <li>
                <Link 
                  to='/discover' 
                  className={isActive('/discover')}
                  onClick={closeMobileMenu}
                >
                  DISCOVER
                </Link>
              </li>
              <li>
                <Link 
                  to='/sound-bytes/new' 
                  className={`${styles.newPostBtn} ${isActive('/sound-bytes/new')}`}
                  onClick={closeMobileMenu}
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
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to='/settings' 
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      Settings
                    </Link>
                    <Link 
                      to='/my-sounds' 
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      My Sounds
                    </Link>
                    <Link 
                      to='/following' 
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        closeMobileMenu();
                      }}
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
              <Link 
                to='/' 
                className={isActive('/')}
                onClick={closeMobileMenu}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link 
                to='/discover' 
                className={isActive('/discover')}
                onClick={closeMobileMenu}
              >
                DISCOVER
              </Link>
            </li>
            <li>
              <Link 
                to='/sign-in' 
                className={`${styles.loginBtn} ${isActive('/sign-in')}`}
                onClick={closeMobileMenu}
              >
                LOG IN
              </Link>
            </li>
            <li>
              <Link 
                to='/sign-up' 
                className={`${styles.signupBtn} ${isActive('/sign-up')}`}
                onClick={closeMobileMenu}
              >
                SIGN UP
              </Link>
            </li>
          </ul>
        )}
      </div>

      {isMobileMenuOpen && <div className={styles.overlay} onClick={closeMobileMenu}></div>}
    </nav>
  );
};

export default NavBar;