"use client"

import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";

const Sidebar = () => {
  const { isAdmin } = useAuth();
  return (
    <div>
      <div className="min-h-screen fixed">
        <div className="flex-1 flex flex-col">
          <aside className="w-50 bg-blue-950 text-white p-6 flex flex-col min-h-screen items-center">
            <nav className="flex flex-1/5 flex-col gap-8 justify-start pt-32 text-center">
            <Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            <Link href="/gallery" className="hover:text-blue-400">Gallery</Link>
            <Link href="/upload" className="hover:text-blue-400">Upload</Link>
            <Link href="/contact" className="hover:text-blue-400">Contact</Link>
            <Link href="/zip" className="hover:text-blue-400">Zip</Link>
            </nav>
            {isAdmin && (
              <div className="border-t border-gray-700 w-50 mt-auto pt-4 flex flex-col gap-2 items-center">
                <Link href="/admin/users" className="hover:text-yellow-400">User Management</Link>
                <Link href="/admin/messages" className="hover:text-yellow-400">Messages</Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;