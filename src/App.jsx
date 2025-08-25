import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import SoundByteList from './components/SoundByteList/SoundByteList';
import SoundByteDetails from './components/SoundByteDetails/SoundByteDetails';
import SoundByteForm from './components/SoundByteForm/SoundByteForm';

import { UserContext } from './contexts/UserContext';

import * as soundByteService from './services/soundCircleService';

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [soundBytes, setSoundBytes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSoundBytes = async () => {
      const soundBytesData = await soundByteService.index();

      // update to set state:
      setSoundBytes(soundBytesData);
    };
    if (user) fetchAllSoundBytes();
  }, [user]);
  
  const handleAddSoundByte = async (soundByteFormData) => {
    const newSoundBytet = await soundCircleService.create(soundByteFormData);
    setSoundBytes([newSoundByte, ...soundBytes]);
    navigate('/soundbytes');
  };

  const handleDeleteSoundByte = async (soundByteId) => {
    const deletedSoundByte = await soundByteService.deleteSoundByte(soundByteId);
    setSoundBytes(soundBytes.filter((soundByte) => soundByte._id !== deletedSoundByte._id));
    navigate('/soundbytes');
  };

  const handleUpdateSoundByte = async (soundByteId, soundByteFormData) => {
  const updatedSoundByte = await soundCircleService.update(soundByteId, soundByteFormData);
  setSoundBytes(soundBytes.map((soundByte) => (soundByteId === soundByte._id ? updatedSoundByte : soundByte)));
  navigate(`/soundbhytes/${soundByteId}`);
};



  const handleSignOut = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <>
  <NavBar user={user} handleSignOut={handleSignOut}/>
      <Routes>
  <Route path='/' element={<Landing />} />
        {user ? (
          <>
            <Route path='/soundbytes' element={<SoundByteList soundBytes={soundBytes}/>} />
            <Route path='/soundBytes/:soundByteId' element={<SoundByteDetails handleDeleteSoundByte={handleDeleteSoundByte}/>} />
            <Route path='/soundbytes/new' element={<SoundByteForm handleAddSoundByte={handleAddSoundByte} />} />
            <Route path='/soundbytes/:soundByteId/edit' element={<SoundByteForm handleUpdateSoundByte={handleUpdateSoundByte}/>} />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
