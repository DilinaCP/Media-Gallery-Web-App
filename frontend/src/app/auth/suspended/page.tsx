"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/common/Button";
import { useAuth } from "@/app/hooks/useAuth";

export default function SuspendedPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout("/auth/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-red-100 p-8 text-center space-y-4">
        <div className="flex flex-col items-center gap-2">
          <div className="text-5xl">🚫</div>
          <h1 className="text-2xl font-semibold text-gray-900">Account Suspended</h1>
          <p className="text-sm text-gray-600">
            Your account has been suspended. Please contact an administrator if you believe this is an error.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="secondary" onClick={() => router.push("/contact")}>Contact Support</Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
}
