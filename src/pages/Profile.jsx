import React, { useState, useEffect } from 'react';
import { User, MapPin, Shield, Edit2, Trash2, Plus, Star } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from '../api/client';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', phone: '' });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  // Address form state
  const [addressForm, setAddressForm] = useState({
    id: null, country: '', state: '', city: '', zipCode: '', street: '', isDefault: false
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  // Password form state
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const [userRes, addrRes] = await Promise.all([
        api.get('/api/users/me'),
        api.get('/api/users/me/addresses').catch(() => ({ data: [] }))
      ]);
      
      const userData = userRes.data?.data || userRes.data;
      setUser(userData);
      setProfileForm({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || ''
      });
      
      const addrData = addrRes.data?.data || addrRes.data || [];
      setAddresses(addrData);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await api.get('/api/users/me/addresses');
      setAddresses(res.data?.data || res.data || []);
    } catch (err) {
      toast.error('Failed to load addresses');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setProfileLoading(true);
      const res = await api.put('/api/users/me', profileForm);
      setUser(res.data?.data || res.data);
      setIsEditingProfile(false);
      toast.success('Profile updated successfully');
      
      // Update local storage if needed
      const storedUserStr = localStorage.getItem('medequip_user');
      if (storedUserStr) {
        const storedUser = JSON.parse(storedUserStr);
        localStorage.setItem('medequip_user', JSON.stringify({ ...storedUser, ...profileForm }));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      setAddressLoading(true);
      if (isEditingAddress && addressForm.id) {
        await api.put(`/api/users/me/addresses/${addressForm.id}`, addressForm);
        toast.success('Address updated successfully');
      } else {
        await api.post('/api/users/me/addresses', addressForm);
        toast.success('Address added successfully');
      }
      setShowAddressForm(false);
      fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save address');
    } finally {
      setAddressLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      await api.delete(`/api/users/me/addresses/${id}`);
      toast.success('Address deleted successfully');
      fetchAddresses();
    } catch (err) {
      toast.error('Failed to delete address');
    }
  };

  const handleSetDefaultAddress = async (address) => {
    if (address.isDefault) return;
    try {
      await api.put(`/api/users/me/addresses/${address.id}`, { ...address, isDefault: true });
      toast.success('Default address updated');
      fetchAddresses();
    } catch (err) {
      toast.error('Failed to update default address');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    
    try {
      setPasswordLoading(true);
      await api.put('/api/users/me/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword
      });
      toast.success('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const openAddressForm = (address = null) => {
    if (address) {
      setAddressForm(address);
      setIsEditingAddress(true);
    } else {
      setAddressForm({ id: null, country: '', state: '', city: '', zipCode: '', street: '', isDefault: false });
      setIsEditingAddress(false);
    }
    setShowAddressForm(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 text-center border-b border-gray-100 bg-gray-50">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <h2 className="font-semibold text-lg">{user?.firstName} {user?.lastName}</h2>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
            <div className="p-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <User className="w-5 h-5 mr-3" /> Profile Info
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'addresses' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <MapPin className="w-5 h-5 mr-3" /> Addresses
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'security' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Shield className="w-5 h-5 mr-3" /> Security
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-3/4">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile Information</h2>
                {!isEditingProfile && (
                  <button onClick={() => setIsEditingProfile(true)} className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                  </button>
                )}
              </div>
              
              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      className="input-field disabled:bg-gray-50 disabled:text-gray-500 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                      disabled={!isEditingProfile}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      className="input-field disabled:bg-gray-50 disabled:text-gray-500 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                      disabled={!isEditingProfile}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="input-field bg-gray-50 text-gray-500 w-full p-2 border border-gray-300 rounded-lg cursor-not-allowed" 
                      value={user?.email || ''}
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email address cannot be changed.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      className="input-field disabled:bg-gray-50 disabled:text-gray-500 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      disabled={!isEditingProfile}
                    />
                  </div>
                </div>
                
                {isEditingProfile && (
                  <div className="flex gap-4">
                    <button type="submit" disabled={profileLoading} className="btn-primary w-full md:w-auto px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      {profileLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={() => setIsEditingProfile(false)} className="px-8 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="card bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Saved Addresses</h2>
                {!showAddressForm && (
                  <button onClick={() => openAddressForm()} className="btn-primary flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-1" /> Add New
                  </button>
                )}
              </div>
              
              {showAddressForm ? (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                  <h3 className="font-semibold text-lg mb-4">{isEditingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                  <form onSubmit={handleAddressSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input type="text" required className="input-field w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={addressForm.street} onChange={(e) => setAddressForm({...addressForm, street: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input type="text" required className="input-field w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={addressForm.city} onChange={(e) => setAddressForm({...addressForm, city: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                        <input type="text" required className="input-field w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={addressForm.state} onChange={(e) => setAddressForm({...addressForm, state: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
                        <input type="text" required className="input-field w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={addressForm.zipCode} onChange={(e) => setAddressForm({...addressForm, zipCode: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input type="text" required className="input-field w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={addressForm.country} onChange={(e) => setAddressForm({...addressForm, country: e.target.value})} />
                      </div>
                      <div className="col-span-1 md:col-span-2 flex items-center mt-2">
                        <input type="checkbox" id="isDefault" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" checked={addressForm.isDefault} onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})} />
                        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">Set as default shipping address</label>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button type="submit" disabled={addressLoading} className="btn-primary px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        {addressLoading ? 'Saving...' : 'Save Address'}
                      </button>
                      <button type="button" onClick={() => setShowAddressForm(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                      <MapPin className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                      <p>You have not saved any addresses yet.</p>
                    </div>
                  ) : (
                    addresses.map((address) => (
                      <div key={address.id} className={`p-4 border rounded-lg flex flex-col md:flex-row justify-between md:items-center gap-4 ${address.isDefault ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{address.street}</span>
                            {address.isDefault && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-medium flex items-center"><Star className="w-3 h-3 mr-1 fill-current" /> Default</span>}
                          </div>
                          <p className="text-gray-600 text-sm">{address.city}, {address.state} {address.zipCode}</p>
                          <p className="text-gray-600 text-sm">{address.country}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {!address.isDefault && (
                            <button onClick={() => handleSetDefaultAddress(address)} className="text-sm text-blue-600 hover:text-blue-800 font-medium">Set as Default</button>
                          )}
                          <button onClick={() => openAddressForm(address)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteAddress(address.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="card bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Change Password</h2>
              <form onSubmit={handlePasswordUpdate} className="max-w-md">
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" required className="input-field w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" required className="input-field w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})} minLength={6} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input type="password" required className="input-field w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} minLength={6} />
                  </div>
                </div>
                <button type="submit" disabled={passwordLoading} className="btn-primary w-full md:w-auto px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
