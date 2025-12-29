"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/common/Loader";
import { useAuth } from "@/app/hooks/useAuth";

type ProtectedRouteProps = {
	children: ReactNode;
	requireAdmin?: boolean;
	redirectTo?: string;
};

const ProtectedRoute = ({
	children,
	requireAdmin = false,
	redirectTo = "/auth/login",
}: ProtectedRouteProps) => {
	const router = useRouter();
	const { isAuthenticated, isAdmin, isSuspended, initializing, logout } = useAuth();

	useEffect(() => {
		if (initializing) return;

		if (!isAuthenticated) {
			router.replace(redirectTo);
			return;
		}

		if (isSuspended) {
			logout("/auth/suspended");
			return;
		}

		if (requireAdmin && !isAdmin) {
			router.replace("/dashboard");
		}
	}, [initializing, isAuthenticated, isSuspended, requireAdmin, isAdmin, router, redirectTo, logout]);

	if (initializing) return <Loader />;
	if (!isAuthenticated || isSuspended) return null;

	return <>{children}</>;
};

export default ProtectedRoute;
