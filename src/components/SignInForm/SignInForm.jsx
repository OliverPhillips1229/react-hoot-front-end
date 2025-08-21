
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import styles from './SignInForm.module.css';
import LoginIcon from '../../assets/images/login.svg';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !username || !password;
  };

  return (
    <main className={styles.container}>
      <section>
        <img src={LoginIcon} alt='An owl with a login sign' />
      </section>
      <section>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <h1>Log In</h1>
          <p>{message}</p>
          <div>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              name='username'
              value={username}
              onChange={handleChange}
              required
              autoComplete='off'
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              required
              autoComplete='off'
            />
          </div>
          <button type='submit' disabled={isFormInvalid()}>Log In</button>
          <button type='button' onClick={() => navigate('/')}>Cancel</button>
        </form>
      </section>
    </main>
  );
};

export default SignInForm;
