"use client"

import React, { useState } from 'react';
import { userEmail, userRole } from '@/app/lib/auth';

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

  const user: Profile = {
    email: userEmail,
    role: userRole,
  };

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  const profileContent = (
    <>
      <h2 className="text-lg font-semibold mb-4 text-center">Profile</h2>
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-gray-500">Role</p>
          <p className="font-medium capitalize">{user.role}</p>
        </div>
      </div>
    </>
  );

  if (isModal || showModal) {
    return (
      <>
        {(isModal || showModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
              className="fixed inset-0 bg-black/50"
              onClick={handleClose}
            ></div>
            <div className="relative bg-blue-100 rounded-xl shadow-xl max-w-md w-full mx-4 p-6 z-10">
              {profileContent}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-blue-300 text-blue-950 rounded hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {profileContent}
    </div>
  );
}
