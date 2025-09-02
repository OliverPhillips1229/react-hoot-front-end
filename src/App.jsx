// src/App.jsx
import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext';
import NavBar from './components/NavBar/NavBar';
import CircleSignUpForm from './components/SignUpForm/CircleSignUpForm';
import CircleSignInForm from './components/SignInForm/CircleSignInForm';
import Landing from './components/Landing/Landing';
import SoundByteList from './components/SoundByteList/SoundByteList';
import SoundByteDetails from './components/SoundByteDetails/SoundByteDetails';
import SoundByteForm from './components/SoundByteForm/SoundByteForm';
import Playlist from './components/Playlist/Playlist';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [soundBytes, setSoundBytes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSoundBytes = async () => {
      try {
        const soundBytesData = await soundCircleService.index();
        setSoundBytes(Array.isArray(soundBytesData) ? soundBytesData : []);
      } catch (error) {
        console.error('Fetch soundBytes error:', error);
      }
    };
    if (user) {
      fetchAllSoundBytes();
    }
  }, [user]);

  const handleAddSoundByte = async (soundByteFormData) => {
    try {
      const newSoundByte = await soundCircleService.create(soundByteFormData);
      setSoundBytes([newSoundByte, ...soundBytes]);
      navigate('/soundbytes');
    } catch (error) {
      console.error('Add soundByte error:', error);
    }
  };

  const handleDeleteSoundByte = async (soundByteId) => {
    try {
      const deletedSoundByte = await soundCircleService.deleteSoundByte(soundByteId);
      setSoundBytes(soundBytes.filter((soundByte) => soundByte._id !== deletedSoundByte._id));
      navigate('/soundbytes');
    } catch (error) {
      console.error('Delete soundByte error:', error);
    }
  };

  const handleUpdateSoundByte = async (soundByteId, soundByteFormData) => {
    try {
      const updatedSoundByte = await soundCircleService.update(soundByteId, soundByteFormData);
      setSoundBytes(soundBytes.map((soundByte) => (soundByteId === soundByte._id ? updatedSoundByte : soundByte)));
      navigate(`/soundbytes/${soundByteId}`);
    } catch (error) {
      console.error('Update soundByte error:', error);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route path='/' element={<Landing />} />
        {user ? (
          <>
            <Route path='/soundbytes' element={<SoundByteList soundBytes={soundBytes} />} />
            <Route path='/soundBytes/:soundByteId' element={<SoundByteDetails handleDeleteSoundByte={handleDeleteSoundByte} />} />
            <Route path='/soundbytes/new' element={<SoundByteForm handleAddSoundByte={handleAddSoundByte} />} />
            <Route path='/soundbytes/:soundByteId/edit' element={<SoundByteForm handleUpdateSoundByte={handleUpdateSoundByte} />} />
            <Route path='/playlist/:username' element={<Playlist />} />
            <Route path='/profile/:username' element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<CircleSignUpForm />} />
            <Route path='/sign-in' element={<CircleSignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;