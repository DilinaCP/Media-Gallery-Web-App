"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '../common/Modal';
import ProfileCard from '../common/Profile';
import { userEmail } from '@/app/lib/auth';
import Button from '../common/Button';

const Header = () => {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    router.push('/auth/login');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

    return(
        <>
        <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex justify-center items-center px-6 z-50">
          <h1 className="text-2xl font-bold">Media Gallery</h1>
          <div className="flex items-center gap-4 absolute right-6">
            <button 
              onClick={handleProfileClick}
              className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
            >
            {userEmail}
            </button>
            {showProfileModal && (
              <ProfileCard 
                isModal={true} 
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
              />
            )}
            
            <Button
              onClick={handleLogoutClick}
              variant='danger'
            >
              Logout
            </Button>
          </div>
        </header>

        <Modal
          isOpen={showLogoutModal}
          onClose={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          confirmText="Yes, Logout"
          cancelText="Cancel"
        />
        </>
    )
}

export default Header;