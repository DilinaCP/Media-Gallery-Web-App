"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import api, { ApiError } from "@/app/lib/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type UseFetchOptions<TBody> = {
	method?: HttpMethod;
	body?: TBody;
	headers?: HeadersInit;
	immediate?: boolean;
	cache?: RequestCache;
};

type UseFetchState<TResponse, TBody> = {
	data: TResponse | null;
	error: string | null;
	isLoading: boolean;
	refetch: (override?: Partial<UseFetchOptions<TBody>>) => Promise<TResponse>;
};

const extractErrorMessage = (error: unknown) => {
	if (error instanceof ApiError) return error.message;
	if (error instanceof Error) return error.message;
	return "Unexpected error";
};

export function useFetch<TResponse = unknown, TBody = unknown>(
	path: string,
	options: UseFetchOptions<TBody> = {}
): UseFetchState<TResponse, TBody> {
	const { method = "GET", body, headers, immediate = true, cache } = options;

	const [data, setData] = useState<TResponse | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const serializedBody = useMemo(() => JSON.stringify(body ?? null), [body]);

	const refetch = useCallback(
		async (override: Partial<UseFetchOptions<TBody>> = {}) => {
			setIsLoading(true);
			setError(null);

			const requestBody = override.body ?? body;

			try {
				const response = await api.request<TResponse, TBody>(path, {
					method: override.method ?? method,
					data: requestBody,
					headers: override.headers ?? headers,
					cache: override.cache ?? cache,
				});

				setData(response);
				return response;
			} catch (err) {
				const message = extractErrorMessage(err);
				setError(message);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[body, cache, headers, method, path]
	);

	useEffect(() => {
		if (immediate) {
			void refetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [path, method, serializedBody, immediate, refetch]);

	return { data, error, isLoading, refetch };
}

export default useFetch;
