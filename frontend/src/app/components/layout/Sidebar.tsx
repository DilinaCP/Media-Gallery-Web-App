"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { LayoutDashboard, Images, Upload, Mail, Archive, Users, MessageSquare } from "lucide-react";

const Sidebar = () => {
  const { isAdmin } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <div className="min-h-screen fixed left-0 top-0 z-40">
        <div className="flex-1 flex flex-col">
          <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 flex flex-col min-h-screen items-stretch">
            <div className="mb-12 pt-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">PixelHub</h2>
            </div>
            <nav className="flex flex-1 flex-col gap-3 justify-start">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-purple-600/30 hover:text-white transition-all duration-200 font-medium">
                <LayoutDashboard size={20} /> Dashboard
              </Link>
              <Link href="/gallery" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-purple-600/30 hover:text-white transition-all duration-200 font-medium">
                <Images size={20} /> Gallery
              </Link>
              <Link href="/upload" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-purple-600/30 hover:text-white transition-all duration-200 font-medium">
                <Upload size={20} /> Upload
              </Link>
              <Link href="/contact" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-purple-600/30 hover:text-white transition-all duration-200 font-medium">
                <Mail size={20} /> Contact
              </Link>
              <Link href="/zip" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-purple-600/30 hover:text-white transition-all duration-200 font-medium">
                <Archive size={20} /> Download
              </Link>
            </nav>
            {mounted && isAdmin && (
              <div className="border-t border-slate-700 mt-6 pt-6 flex flex-col gap-3">
                <p className="text-xs uppercase text-slate-400 font-semibold px-4 mb-2">Admin Tools</p>
                <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-200 font-medium">
                  <Users size={20} /> Users
                </Link>
                <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-200 font-medium">
                  <MessageSquare size={20} /> Messages
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;