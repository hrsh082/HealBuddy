import React, { useState, useEffect } from 'react';
import { FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    medicalHistory: [],
    medications: [],
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    try {
      const storedProfile = localStorage.getItem('userProfile');
      const defaultProfile = storedProfile
        ? JSON.parse(storedProfile)
        : {
            name: 'Health User',
            age: '',
            gender: '',
            phone: '',
            medicalHistory: [],
            medications: [],
            role: 'Patient',
          };

      setProfile(defaultProfile);
      setFormData({
        name: defaultProfile.name || '',
        age: defaultProfile.age || '',
        gender: defaultProfile.gender || '',
        phone: defaultProfile.phone || '',
        medicalHistory: defaultProfile.medicalHistory || [],
        medications: defaultProfile.medications || [],
      });
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load profile');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    try {
      const updatedProfile = {
        ...profile,
        ...formData,
      };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FiLoader className="text-4xl animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="card max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <button
            onClick={() => setEditing(!editing)}
            className={editing ? 'btn-secondary' : 'btn-primary'}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {!editing ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase">Name</h3>
              <p className="text-lg text-gray-800">{profile?.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase">Age</h3>
                <p className="text-lg text-gray-800">{profile?.age || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase">Gender</h3>
                <p className="text-lg text-gray-800">{profile?.gender || 'Not specified'}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase">Phone</h3>
              <p className="text-lg text-gray-800">{profile?.phone || 'Not specified'}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Role</h3>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {profile?.role || 'Patient'}
              </div>
            </div>
          </div>
        ) : (
          <form className="space-y-4">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="form-input">
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={handleSave} className="btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
