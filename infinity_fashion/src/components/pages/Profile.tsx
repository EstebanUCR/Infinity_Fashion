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
    profile_picture: '',
  });

  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [newImage, setNewImage] = useState<File | null>(null); // New image file

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserProfile(localStorage.getItem('email') || '');
      if (data) setUser(data);
    };

    fetchUserData();
  }, []);

  const handleImageClick = () => {
    setModalOpen(true); // Open the modal
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
      setUser({ ...user, profile_picture: URL.createObjectURL(e.target.files[0]) });
    }
  };

const handleSaveImage = async () => {
  if (newImage) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      if (typeof base64Image === 'string') { // Ensure base64Image is a string
        // Update the user profile with the new image
        const response = await updateUserProfile({ ...user, profile_picture: base64Image });
        
        if (response.success) {
          alert('Profile image updated successfully!');
          setUser({ ...user, profile_picture: base64Image }); // Update the local user state
        } else {
          alert('Failed to update profile image');
        }
        
        setModalOpen(false); // Close the modal
      } else {
        alert('Failed to process image');
      }
    };

    reader.readAsDataURL(newImage);
  }
};

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
              user.profile_picture ||
              'https://static.vecteezy.com/system/resources/previews/018/765/757/non_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg'
            }
            alt="Profile"
            className="profile-image"
            onClick={handleImageClick} // Trigger modal on click
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

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Change Profile Picture</h2>
            <input type="file" onChange={handleImageChange} accept="image/*" />
             <div className="button-container">
            <button onClick={handleSaveImage} className="save-button">Save Image</button>
            <button className="close-button" onClick={() => setModalOpen(false)}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default Profile;
