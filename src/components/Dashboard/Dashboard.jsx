import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch {
        // Error handled silently
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is your profile page where you can see your most recent add.
      </p>
        {/* Recently Added Song/Album Section */}
        {/*
          TODO: Display the most recently added song or album here.
          - Show album cover image
          - Show title
          - Show artist
          - Show genre
          Layout, will look something like this, we will have to collab for this to work:
          <div className="recent-add">
            <img src={albumCoverUrl} alt="Album Cover" />
            <div>
              <h2>{title}</h2>
              <p>{artist}</p>
              <p>{genre}</p>
            </div>
          </div>
        */}
      <ul>
          {users.map(u => (
            <li key={u._id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img
                src={u.profileIcon || u.profileImage || '/src/assets/images/profile.png'}
                alt={u.username + "'s profile"}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
              />
              {u.username}
            </li>
          ))}
      </ul>
    </main>
  );
};

export default Dashboard;
