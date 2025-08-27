import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import CircleSignUpForm from './components/SignUpForm/CircleSignUpForm';
import CircleSignInForm from './components/SignInForm/CircleSignInForm';
import Landing from './components/Landing/Landing';
import SoundByteList from './components/SoundByteList/SoundByteList';
import SoundByteDetails from './components/SoundByteDetails/SoundByteDetails';
import SoundByteForm from './components/SoundByteForm/SoundByteForm';
import Profile from './components/Dashboard/Dashboard';

import { UserContext } from './contexts/UserContext';

import * as soundCircleService from './services/soundCircleService';

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [soundBytes, setSoundBytes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSoundBytes = async () => {
      const soundBytesData = await soundCircleService.index();
      setSoundBytes(soundBytesData);
    };
    if (user) fetchAllSoundBytes();
  }, [user]);

  const handleAddSoundByte = async (soundByteFormData) => {
    const newSoundByte = await soundCircleService.create(soundByteFormData);
    setSoundBytes([newSoundByte, ...soundBytes]);
    navigate('/soundbytes');
  };

  const handleDeleteSoundByte = async (soundByteId) => {
    const deletedSoundByte = await soundCircleService.deleteSoundByte(soundByteId);
    setSoundBytes(soundBytes.filter((soundByte) => soundByte._id !== deletedSoundByte._id));
    navigate('/soundbytes');
  };

  const handleUpdateSoundByte = async (soundByteId, soundByteFormData) => {
    const updatedSoundByte = await soundCircleService.update(soundByteId, soundByteFormData);
    setSoundBytes(soundBytes.map((soundByte) => (soundByteId === soundByte._id ? updatedSoundByte : soundByte)));
    navigate(`/soundbytes/${soundByteId}`);
  };

  const handleSignOut = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<Landing />} />
        {user ? (
          <>
            <Route path="/soundbytes" element={<SoundByteList soundBytes={soundBytes} />} />
            <Route path="/soundbytes/:soundByteId" element={<SoundByteDetails handleDeleteSoundByte={handleDeleteSoundByte} />} />
            <Route path="/soundbytes/:soundByteId/edit" element={<SoundByteForm handleUpdateSoundByte={handleUpdateSoundByte} />} />
            <Route path="/soundbytes/new" element={<SoundByteForm handleAddSoundByte={handleAddSoundByte} />} />
            <Route path="/profile/:username" element={<Profile />} /> {/* Add this route */}
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<CircleSignUpForm />} />
            <Route path="/sign-in" element={<CircleSignInForm />} />
          </>
        )}
        <Route path="/discover" element={<div>Discover Page (Placeholder)</div>} /> {/* Add this route with a placeholder */}
      </Routes>
    </>
  );
};

export default App;
