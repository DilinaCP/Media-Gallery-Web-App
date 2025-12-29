"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import ProfileCard from '../common/Profile';
import Button from '../common/Button';
import { useAuth } from '@/app/hooks/useAuth';
import { User, LogOut } from 'lucide-react';

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
        <header className="fixed top-0 left-0 md:left-64 right-0 h-14 md:h-16 bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 shadow-lg grid grid-cols-[1fr_auto_1fr] items-center px-3 sm:px-4 md:px-6 z-30 border-b border-purple-700/20">
          {/* Left spacer to truly center title */}
          <div />
          {/* Title centered without overlap */}
          <h1 className="justify-self-center text-base sm:text-lg md:text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            PixelHub
          </h1>
          
          {/* User actions */}
          <div className="justify-self-end flex items-center gap-2 sm:gap-3 md:gap-4">
            {mounted && (
              <button 
                onClick={handleProfileClick}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-300 hover:text-white cursor-pointer transition-all duration-200 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-white/10"
              >
                {/* Icon on mobile only */}
                <User size={16} className="md:hidden" />
                {/* Email visible from md and up */}
                <span className="hidden lg:inline truncate max-w-[180px]">
                  {user?.email ?? 'Profile'}
                </span>
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
              className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-1.5"
            >
              <LogOut size={16} className="md:hidden" />
              <span className="hidden md:inline">Logout</span>
              <span className="md:hidden">Exit</span>
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