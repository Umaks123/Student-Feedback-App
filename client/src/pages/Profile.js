import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://possppole-backend.onrender.com/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProfile(res.data));
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <p>DOB: {profile.dob}</p>
      <p>Address: {profile.address}</p>
    </div>
  );
}

export default Profile;