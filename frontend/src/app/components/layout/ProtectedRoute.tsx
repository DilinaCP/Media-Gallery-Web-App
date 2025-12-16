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
	const { isAuthenticated, isAdmin, initializing } = useAuth();

	useEffect(() => {
		if (initializing) return;

		if (!isAuthenticated) {
			router.replace(redirectTo);
		} else if (requireAdmin && !isAdmin) {
			router.replace("/dashboard");
		}
	}, [initializing, isAuthenticated, requireAdmin, isAdmin, router, redirectTo]);

	if (initializing) return <Loader />;
	if (!isAuthenticated) return null;

	return <>{children}</>;
};

export default ProtectedRoute;
