// Lightweight, browser-safe helpers for storing and retrieving auth state.

export type AuthUser = {
	id: string;
	name: string;
	email: string;
	role?: string;
};

const TOKEN_KEY = "token";
const USER_KEY = "user";

const isBrowser = () => typeof window !== "undefined";

export const saveAuth = (user: AuthUser, token: string) => {
	if (!isBrowser()) return;
	localStorage.setItem(TOKEN_KEY, token);
	localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = (): string | null => {
	if (!isBrowser()) return null;
	return localStorage.getItem(TOKEN_KEY);
};

export const getUser = (): AuthUser | null => {
	if (!isBrowser()) return null;

	const rawUser = localStorage.getItem(USER_KEY);
	if (!rawUser) return null;

	try {
		return JSON.parse(rawUser) as AuthUser;
	} catch (error) {
		// If parsing fails, clear broken data so subsequent calls start clean.
		clearAuth();
		return null;
	}
};

export const getStoredAuth = () => {
	const token = getToken();
	const user = getUser();

	if (!token || !user) return null;

	return { token, user };
};

export const clearAuth = () => {
	if (!isBrowser()) return;
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
};

export const isAdmin = () => getUser()?.role?.toLowerCase() === "admin";