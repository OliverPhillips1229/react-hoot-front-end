
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import styles from './CircleSignUpForm.module.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConf: '',
  });

  const { email, username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
    console.log(formData);
  };

  const isFormInvalid = () => {
    return !email || !username || !password || password !== passwordConf;
  };

  return (
    <main className={styles.container}>
      <section>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <h1>Sign Up</h1>
          <p>{message}</p>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete='off'
            />
          </div>
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
          <div>
            <label htmlFor='passwordConf'>Confirm Password:</label>
            <input
              type='password'
              name='passwordConf'
              value={passwordConf}
              onChange={handleChange}
              required
              autoComplete='off'
            />
          </div>
          <button type='submit' disabled={isFormInvalid()}>Sign Up</button>
          <button type='button' onClick={() => navigate('/')}>Cancel</button>
        </form>
      </section>
    </main>
  );
};

export default SignUpForm;
