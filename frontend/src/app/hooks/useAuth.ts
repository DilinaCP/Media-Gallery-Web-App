"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import api, { ApiError } from "@/app/lib/api";
import { AuthUser, clearAuth, getStoredAuth, saveAuth } from "@/app/lib/auth";

type LoginPayload = { email: string; password: string };
type RegisterPayload = { name: string; email: string; password: string };

type AuthHookState = {
	user: AuthUser | null;
	token: string | null;
	initializing: boolean;
	isLoading: boolean;
	error: string | null;
	isAuthenticated: boolean;
	isAdmin: boolean;
	login: (payload: LoginPayload) => Promise<AuthUser>;
	register: (payload: RegisterPayload) => Promise<AuthUser>;
	logout: (redirectTo?: string) => void;
};

const defaultState: AuthHookState = {
	user: null,
	token: null,
	initializing: true,
	isLoading: false,
	error: null,
	isAuthenticated: false,
	isAdmin: false,
	login: async () => {
		throw new Error("Auth hook not initialized");
	},
	register: async () => {
		throw new Error("Auth hook not initialized");
	},
	logout: () => undefined,
};

const extractErrorMessage = (error: unknown) => {
	if (error instanceof ApiError) return error.message;
	if (error instanceof Error) return error.message;
	return "Unexpected error";
};

export const useAuth = (): AuthHookState => {
	const router = useRouter();
	const [user, setUser] = useState<AuthUser | null>(defaultState.user);
	const [token, setToken] = useState<string | null>(defaultState.token);
	const [initializing, setInitializing] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const stored = getStoredAuth();
		if (stored) {
			setUser(stored.user);
			setToken(stored.token);
		}
		setInitializing(false);
	}, []);

	const login = useCallback(async ({ email, password }: LoginPayload) => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await api.post<{
				token: string;
				user: AuthUser;
			}>("/auth/login", { email, password });

			if (!data.token || !data.user) {
				throw new Error("Invalid login response");
			}

			saveAuth(data.user, data.token);
			setUser(data.user);
			setToken(data.token);

			return data.user;
		} catch (err) {
			const message = extractErrorMessage(err);
			setError(message);
			throw err;
		} finally {
			setIsLoading(false);
		}
	}, []);

	const register = useCallback(
		async ({ name, email, password }: RegisterPayload) => {
			setIsLoading(true);
			setError(null);

			try {
				const data = await api.post<{
					user: AuthUser;
				}>("/auth/register", { name, email, password });

				if (!data.user) {
					throw new Error("Invalid registration response");
				}

				return data.user;
			} catch (err) {
				const message = extractErrorMessage(err);
				setError(message);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	const logout = useCallback(
		(redirectTo = "/auth/login") => {
			clearAuth();
			setUser(null);
			setToken(null);
			router.replace(redirectTo);
		},
		[router]
	);

	const isAuthenticated = useMemo(() => Boolean(token), [token]);
	const isAdmin = useMemo(
		() => (user?.role ?? "").toLowerCase() === "admin",
		[user?.role]
	);

	return {
		user,
		token,
		initializing,
		isLoading,
		error,
		isAuthenticated,
		isAdmin,
		login,
		register,
		logout,
	};
};

export default useAuth;
