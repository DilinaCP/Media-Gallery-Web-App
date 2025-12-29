// Minimal fetch wrapper with sensible defaults for this app.

import { clearAuth, getToken } from "./auth";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiRequestConfig<TBody> = {
	method?: HttpMethod;
	data?: TBody;
	headers?: HeadersInit;
	token?: string;
	cache?: RequestCache;
	skipAuth?: boolean;
};

export class ApiError extends Error {
	status?: number;
	body?: unknown;

	constructor(message: string, status?: number, body?: unknown) {
		super(message);
		this.status = status;
		this.body = body;
	}
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

async function request<TResponse, TBody = unknown>(
	path: string,
	config: ApiRequestConfig<TBody> = {}
): Promise<TResponse> {
	const { method = "GET", data, headers, token, cache = "no-store", skipAuth = false } = config;

	const authToken = !skipAuth ? (token ?? getToken()) : undefined;

	const mergedHeaders: HeadersInit = {
		"Content-Type": "application/json",
		...(headers ?? {}),
	};

	if (authToken) {
		(mergedHeaders as Record<string, string>).Authorization = `Bearer ${authToken}`;
	}

	const response = await fetch(`${API_BASE_URL}${path}`, {
		method,
		headers: mergedHeaders,
		body: data ? JSON.stringify(data) : undefined,
		cache,
	});

	const text = await response.text();
	const body = text ? safeJsonParse(text) : null;

	if (!response.ok) {
		const message = (body as { message?: string })?.message ?? "Request failed";

		if (
			response.status === 403 &&
			typeof window !== "undefined" &&
			message === "Account suspended"
		) {
			clearAuth();
			window.location.href = "/auth/suspended";
			return null as unknown as TResponse;
		}

		throw new ApiError(message, response.status, body);
	}

	return body as TResponse;
}

const safeJsonParse = (value: string) => {
	try {
		return JSON.parse(value);
	} catch (error) {
		return value;
	}
};

const api = {
	request,
	get: <TResponse>(path: string, headers?: HeadersInit, skipAuth?: boolean) =>
		request<TResponse>(path, { method: "GET", headers, skipAuth }),
	post: <TResponse, TBody = unknown>(path: string, data: TBody, headers?: HeadersInit, skipAuth?: boolean) =>
		request<TResponse, TBody>(path, { method: "POST", data, headers, skipAuth }),
	put: <TResponse, TBody = unknown>(path: string, data: TBody, headers?: HeadersInit, skipAuth?: boolean) =>
		request<TResponse, TBody>(path, { method: "PUT", data, headers, skipAuth }),
	patch: <TResponse, TBody = unknown>(path: string, data: TBody, headers?: HeadersInit, skipAuth?: boolean) =>
		request<TResponse, TBody>(path, { method: "PATCH", data, headers, skipAuth }),
	delete: <TResponse>(path: string, headers?: HeadersInit, skipAuth?: boolean) =>
		request<TResponse>(path, { method: "DELETE", headers, skipAuth }),
};

export default api;
