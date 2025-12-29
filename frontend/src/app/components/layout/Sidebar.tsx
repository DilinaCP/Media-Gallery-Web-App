"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { LayoutDashboard, Images, Upload, Mail, Archive, Users, MessageSquare, Menu, X } from "lucide-react";

const Sidebar = () => {
  const { isAdmin } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button - Mobile Only */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-slate-800/90 text-white hover:bg-slate-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-50"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <aside className="w-64 bg-linear-to-b from-slate-900 to-slate-800 text-white p-4 sm:p-6 flex flex-col h-full items-stretch">
          <nav className="flex flex-1 flex-col gap-2 sm:gap-3 justify-start overflow-y-auto">
            <Link 
              href="/dashboard" 
              onClick={closeSidebar}
              className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-slate-300 hover:bg-purple-600/30 hover:text-white transition-all duration-200 font-medium text-sm sm:text-base"
            >
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link 
              href="/gallery" 
              onClick={closeSidebar}
              className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-slate-300 hover:bg-purple-600/30 hover:text-white transition-all duration-200 font-medium text-sm sm:text-base"
            >
              <Images size={20} /> Gallery
            </Link>
            <Link 
              href="/upload" 
              onClick={closeSidebar}
              className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-slate-300 hover:bg-purple-600/30 hover:text-white transition-all duration-200 font-medium text-sm sm:text-base"
            >
              <Upload size={20} /> Upload
            </Link>
            <Link 
              href="/contact" 
              onClick={closeSidebar}
              className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-slate-300 hover:bg-purple-600/30 hover:text-white transition-all duration-200 font-medium text-sm sm:text-base"
            >
              <Mail size={20} /> Contact
            </Link>
            <Link 
              href="/zip" 
              onClick={closeSidebar}
              className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-slate-300 hover:bg-purple-600/30 hover:text-white transition-all duration-200 font-medium text-sm sm:text-base"
            >
              <Archive size={20} /> Download
            </Link>
          </nav>
          {mounted && isAdmin && (
            <div className="border-t border-slate-700 mt-4 sm:mt-6 pt-4 sm:pt-6 flex flex-col gap-2 sm:gap-3">
              <p className="text-xs uppercase text-slate-400 font-semibold px-3 sm:px-4 mb-1 sm:mb-2">Admin Tools</p>
              <Link 
                href="/admin/users" 
                onClick={closeSidebar}
                className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-slate-300 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                <Users size={20} /> Users
              </Link>
              <Link 
                href="/admin/messages" 
                onClick={closeSidebar}
                className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-slate-300 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                <MessageSquare size={20} /> Messages
              </Link>
            </div>
          )}
        </aside>
      </div>
    </>
  )
}

export default Sidebar;