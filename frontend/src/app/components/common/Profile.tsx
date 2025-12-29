"use client"

import { useEffect, useMemo, useState } from 'react';
import Button from './Button';
import { useAuth } from '@/app/hooks/useAuth';
import { X, User, Shield } from 'lucide-react';

type Profile = {
  email: string;
  role: string;
};

interface ProfileCardProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ProfileCard({ isModal = false, isOpen = false, onClose = () => {} }: ProfileCardProps) {
  const [showModal, setShowModal] = useState(isOpen);
  const [mounted, setMounted] = useState(false);
  const { user: authUser } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const user: Profile = useMemo(() => ({
    email: authUser?.email ?? 'Unknown',
    role: (authUser?.role ?? 'user').toLowerCase(),
  }), [authUser]);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  // Prevent background scroll while modal is open
  useEffect(() => {
    if (isModal && isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isModal, isOpen]);

  const profileContent = (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <User className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Profile</h2>
          <p className="text-xs text-slate-500 capitalize font-semibold">{user.role}</p>
        </div>
      </div>
      <div className="space-y-4 text-sm">
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-slate-600 text-xs uppercase font-semibold mb-1">Email</p>
          <p className="font-semibold text-slate-900">{user.email}</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="text-purple-600" />
            <p className="text-slate-600 text-xs uppercase font-semibold">Role</p>
          </div>
          <p className="font-semibold text-slate-900 capitalize">{user.role}</p>
        </div>
      </div>
    </>
  );

  if (isModal || showModal) {
    return (
      <>
        {mounted && (isModal || showModal) && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
            ></div>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="profile-dialog-title"
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md md:max-w-xl lg:max-w-2xl p-4 sm:p-6 md:p-8 z-[70] border border-slate-200/50 max-h-[85vh] overflow-auto"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
              <div id="profile-dialog-title" className="sr-only">Profile</div>
              {profileContent}
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  onClick={handleClose}
                  variant="secondary"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200/50">
      {profileContent}
    </div>
  );
}
