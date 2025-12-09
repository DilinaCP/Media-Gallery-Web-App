"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '../common/Modal';

const Header = () => {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
        <header className="h-16 bg-white shadow flex justify-center items-center px-6 relative">
          <h1 className="text-2xl font-bold">Media Gallery</h1>
          <div className="flex items-center gap-4 absolute right-6">
            <span className="text-sm text-gray-600">Hi, User</span>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
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