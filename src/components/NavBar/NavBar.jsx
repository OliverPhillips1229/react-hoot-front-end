import { Link } from 'react-router-dom';

const NavBar = ({ user, handleSignOut }) => {

  const onSignOut = () => {
    localStorage.removeItem('token');
    SpeechSynthesisUtterance(null);
    handleSignOut && handleSignOut();
  }
  return (
    <nav>
      {user ? (
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/hoots'>HOOTS</Link></li>
          <li><link to='/hoots/new'>NEW HOOT</link></li>
          <li><Link to='/' onClick={onSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/sign-in'>SIGN IN</Link></li>
          <li><Link to='/sign-up'>SIGN UP</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;