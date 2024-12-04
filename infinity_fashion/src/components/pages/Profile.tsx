import React, { useState, useEffect } from 'react';
import './Profile.css';
import { getUserProfile, updateUserProfile } from '../../services/apiService';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import img1 from '../../assets/Home/logoWithOutBackground.png';
import { userData } from '../../types/types';
import useValidation from '../../hooks/useValidation';

const Profile = () => {
  const navigate = useNavigate();

  const { errors, validateProfile } = useValidation();

  const [user, setUser] = useState<userData>({
    name: '',
    email: '',
    password: '',
    phone: null,
    shipping_address: null,
    billing_address: null,
    profile_picture: null,
  });

  const [tempUser, setTempUser] = useState<userData>({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [isImageEditing, setIsImageEditing] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);

  const [messageModal, setMessageModal] = useState<{
    isOpen: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserProfile(localStorage.getItem('email') || '');
      if (data) {
        setUser(data);
        setTempUser(data);
      }
      // localStorage.setItem('name', 'bri');
      //   localStorage.setItem('email', 'brita@gmail.com');
    };
    fetchUserData();
  }, []);

  const showMessage = (message: string, type: 'success' | 'error') => {
    setMessageModal({ isOpen: true, message, type });
  };

  const closeMessage = () => {
    setMessageModal({ isOpen: false, message: '', type: 'success' });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
      setTempUser({
        ...tempUser,
        profile_picture: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSaveImage = async () => {
    if (newImage) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        if (typeof base64Image === 'string') {
          try {
            const response = await updateUserProfile({
              ...user,
              profile_picture: base64Image,
            });
            if (response.success) {
              showMessage('Profile image updated successfully!', 'success');
              setUser({ ...user, profile_picture: base64Image });
            } else {
              showMessage(response.message || 'Failed to update profile image.', 'error');
            }
          } catch (error) {
            showMessage('Error updating image. Check console for details.', 'error');
            console.error('Error updating image:', error);
          }
        } else {
          showMessage('Invalid image format.', 'error');
        }
        setIsImageEditing(false);
      };
      reader.readAsDataURL(newImage);
    } else {
      showMessage('No image selected.', 'error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleSave = async () => {
    const isValid = validateProfile({
      name: tempUser.name || '',
      phone: tempUser.phone || '',
      shipping_address: tempUser.shipping_address || '',
      billing_address: tempUser.billing_address || '',
    });

    if (!isValid) {
      showMessage('Please correct the errors before saving.', 'error');
      return;
    }

    const response = await updateUserProfile(tempUser);
    if (response.success) {
      showMessage('Profile updated successfully!', 'success');
      setUser(tempUser);
      localStorage.setItem('name', tempUser.name);
      localStorage.setItem('email', tempUser.email);
      setIsEditing(false);
    } else {
      showMessage('Failed to update profile.', 'error');
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Si el usuario cancela, restablece tempUser al valor original
      setTempUser({ ...user });
    }
    setIsEditing(!isEditing);
  };
  return (
    <>
      <Container fluid className="logo-container-profile">
        <img className="logo" src={img1} alt="Logo" onClick={() => navigate('/')} />
      </Container>
      <div className="profile-container">
        <div className="profile-left">
          <div className="image-container">
            <img
              src={
                tempUser.profile_picture ||
                'https://static.vecteezy.com/system/resources/previews/018/765/757/non_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg'
              }
              alt="Profile"
              className="profile-image"
              onClick={() => setIsImageEditing(true)}
            />
          </div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div className="profile-right">
          <h3>Profile Settings</h3>
          <div className="profile-form">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={tempUser.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {isEditing && errors.name && <p className="error">{errors.name}</p>}

            <div className="phone-input-container">
              <label>Phone</label>
              <div className="phone-input-wrapper">
                <span className="prefix">+506</span>
                <div className="separator"></div>
                <input
                  type="text"
                  name="phone"
                  value={tempUser.phone || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              {isEditing && errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <label>Shipping Address</label>
            <textarea
              name="shipping_address"
              value={tempUser.shipping_address || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="textarea-input"
            />
            {isEditing && errors.shipping_address && <p className="error">{errors.shipping_address}</p>}

            <label>Billing Address</label>
            <textarea
              name="billing_address"
              value={tempUser.billing_address || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="textarea-input"
            />
            {isEditing && errors.billing_address && <p className="error">{errors.billing_address}</p>}

            {isEditing ? (
              <>
                <button onClick={handleSave} className="save-button">
                  Save Profile
                </button>
                <button onClick={toggleEdit} className="cancel-button">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={toggleEdit} className="edit-button">
                Edit Profile
              </button>
            )}
            <button onClick={() => navigate('/history')} className="history-button">
                History of purchases
            </button>
          </div>
        </div>
      </div>

      {isImageEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Change Profile Picture</h2>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <div className="button-container">
              <button onClick={handleSaveImage} className="save-button">
                Save Image
              </button>
              <button className="close-button" onClick={() => setIsImageEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {messageModal.isOpen && (
        <div className="modal">
          <div className={`modal-content ${messageModal.type}`}>
            <p>{messageModal.message}</p>
            <button className="modal-close" onClick={closeMessage}>
              X
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Profile;
