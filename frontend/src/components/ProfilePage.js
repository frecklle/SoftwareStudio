import React, { useState, useEffect } from 'react';
import { Form, Button, Image } from 'react-bootstrap';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ name: '', bio: '', profilePicture: '' });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/profile', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('bio', profile.bio);
    if (file) {
      formData.append('profilePicture', file);
    }

    try {
      const response = await fetch('/profile', {
        method: 'PUT',
        headers: {
          'Authorization': localStorage.getItem('token')
        },
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            value={profile.name} 
            onChange={(e) => setProfile({...profile, name: e.target.value})}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={profile.bio} 
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
        {profile.profilePicture && (
          <Image src={profile.profilePicture} roundedCircle style={{width: '100px', height: '100px'}} />
        )}
        <Button variant="primary" type="submit" className="mt-3">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default ProfilePage;