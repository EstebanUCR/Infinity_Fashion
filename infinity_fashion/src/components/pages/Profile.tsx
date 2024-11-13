import React, { useState, useEffect } from 'react';
import './Profile.css';
import { getUserProfile, updateUserProfile } from '../../services/apiService';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import img1 from '../../assets/Home/logoWithOutBackground.png';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    shipping_address: '',
    billing_address: '',
    profile_image: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserProfile(localStorage.getItem('email') || '');
      if (data) setUser(data);
    };
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const response = await updateUserProfile(user);
    if (response.success) alert('Profile updated successfully!');
    else alert('Failed to update profile');
  };

  return (
    <>
      <Container fluid className="logo-container">
        <img className="logo" src={img1} alt="Logo" onClick={() => navigate('/')} />
      </Container>
      <div className="profile-container">
        <div className="profile-left">
          <img
            src={
              user.profile_image ||
              'https://static.vecteezy.com/system/resources/previews/018/765/757/non_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg'
            }
            alt="Profile"
            className="profile-image"
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div className="profile-right">
          <h3>Profile Settings</h3>
          <div className="profile-form">
            <label>Name</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} />
            <label>Phone</label>
            <input type="text" name="phone" value={user.phone} onChange={handleChange} />
            <label>Shipping Address</label>
            <input type="text" name="shipping_address" value={user.shipping_address} onChange={handleChange} />
            <label>Billing Address</label>
            <input type="text" name="billing_address" value={user.billing_address} onChange={handleChange} />
            <button onClick={handleSave} className="save-button">Save Profile</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
