import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { useLocation } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import CircleSignUpForm from './components/SignUpForm/CircleSignUpForm';
import CircleSignInForm from './components/SignInForm/CircleSignInForm';
import Landing from './components/Landing/Landing';
import SoundByteList from './components/SoundByteList/SoundByteList';
import SoundByteDetails from './components/SoundByteDetails/SoundByteDetails';
import SoundByteForm from './components/SoundByteForm/SoundByteForm';
import Playlist from './components/Playlist/Playlist';

import { UserContext } from './contexts/UserContext';

import * as soundCircleService from './services/soundCircleService';

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [soundBytes, setSoundBytes] = useState([]);
  const navigate = useNavigate();
  // const { pathname } = useLocation();

  useEffect(() => {
    const fetchAllSoundBytes = async () => {
      const soundBytesData = await soundCircleService.index();
      setSoundBytes(soundBytesData);
    };
    // Only prefetch on routes that use soundbytes, to avoid unnecessary fetches
    // if (user && (pathname.startsWith('/soundbytes') || pathname.startsWith('/soundBytes'))) {
    fetchAllSoundBytes();
    // }
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
  <NavBar user={user} handleSignOut={handleSignOut}/>
      <Routes>
  <Route path='/' element={<Landing />} />
        {user ? (
          <>
            <Route path='/soundbytes' element={<SoundByteList soundBytes={soundBytes}/>} />
            <Route path='/soundBytes/:soundByteId' element={<SoundByteDetails handleDeleteSoundByte={handleDeleteSoundByte}/>} />
            <Route path='/soundbytes/new' element={<SoundByteForm handleAddSoundByte={handleAddSoundByte} />} />
            <Route path='/soundbytes/:soundByteId/edit' element={<SoundByteForm handleUpdateSoundByte={handleUpdateSoundByte}/>} />
            <Route path={`/playlist/${user.username}`} element={<Playlist />} />
         
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<CircleSignUpForm />} />
            <Route path='/sign-in' element={<CircleSignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
