"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import ProfileCard from '../common/Profile';
import Button from '../common/Button';
import { useAuth } from '@/app/hooks/useAuth';

const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    logout('/auth/login');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

    return(
        <>
        <header className="fixed top-0 left-64 right-0 h-16 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-lg flex justify-center items-center px-6 z-30 border-b border-purple-700/20">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Media Gallery
          </h1>
          <div className="flex items-center gap-4 absolute right-6">
            {mounted && (
              <button 
                onClick={handleProfileClick}
                className="text-sm text-slate-300 hover:text-white cursor-pointer transition-all duration-200 px-3 py-1.5 rounded-lg hover:bg-white/10"
              >
              {user?.email ?? 'Profile'}
              </button>
            )}
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