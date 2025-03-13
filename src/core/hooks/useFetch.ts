import { useEffect, useMemo, useState } from "react";
import type { Nullable } from "../types/helpers";
import { arrayToString } from "../utils/arrayToString";
import { useStableCallback } from "./useStableCallback";
import { useCache } from "./useCache";

/**
 * Type definition for a query function that returns a Promise
 * @template T - The type of data that the query function returns
 */
export type QueryFunction<T> = () => Promise<T>;

/**
 * Type definition for a query key array
 * First element must be a string, followed by any additional parameters
 */
export type QueryKey = [string, ...any[]];

/**
 * Options for configuring the useFetch hook
 * @template T - The type of data that will be fetched
 */
export type UseFetchOptions<T = any> = {
	/** Function that performs the actual data fetching */
	queryFn: QueryFunction<T>;
	/** Unique key array to identify and cache the query */
	queryKey: QueryKey;
	/** Whether the query should execute automatically */
	enabled?: boolean;
	/** Duration in milliseconds to keep the data in cache (default: 24 hours) */
	cacheDuration?: number;
	/** Callback function called when the query succeeds */
	onSuccess?: (response: T) => void;
	/** Callback function called when the query fails */
	onError?: (error: Error) => void;
};

/**
 * Result object returned by the useFetch hook
 * @template T - The type of data that was fetched
 */
export type UseFetchResult<T> = {
	/** The fetched data, null if not yet fetched or on error */
	data: Nullable<T>;
	/** Error object if the query failed, null otherwise */
	error: Nullable<Error>;
	/** Whether the query is currently in progress */
	isFetching: boolean;
	/** Whether the query completed successfully */
	isSuccess: boolean;
	/** Whether the query failed */
	isError: boolean;
};

/**
 * A custom hook for fetching data with caching support
 * 
 * This hook provides a way to fetch data with automatic caching, loading states,
 * and error handling. It supports both automatic and manual fetching through
 * the enabled option.
 * 
 * @example
 * ```tsx
 * const { data, error, isFetching } = useFetch({
 *   queryKey: ['user', userId],
 *   queryFn: () => fetchUser(userId),
 *   enabled: true,
 *   onSuccess: (data) => console.log('Data fetched:', data),
 *   onError: (error) => console.error('Error:', error)
 * });
 * ```
 * 
 * @template T - The type of data that will be fetched
 * @param {UseFetchOptions<T>} options - Configuration options for the hook
 * @returns {UseFetchResult<T>} Object containing the query state and results
 */
export function useFetch<T>({
	queryKey,
	queryFn,
	cacheDuration = 84000, // 24 hours in milliseconds
	enabled = true,
	onSuccess,
	onError,
}: UseFetchOptions<T>) {
	// State management for the query results and status
	const [data, setData] = useState<Nullable<T>>(null);
	const [error, setError] = useState<Nullable<Error>>(null);
	const [isError, setIsError] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isFetching, setIsFetching] = useState<boolean>(false);

	// Create a stable cache key from the query key array
	const cacheKey = useMemo(() => arrayToString(queryKey), [queryKey]);
	const { getCachedData, storeInCache } = useCache();

	/**
	 * Handles the data fetching process including cache checking and error handling
	 * This function is memoized to prevent unnecessary re-renders
	 */
	const handleQueryFn = useStableCallback(async () => {
		// Reset query state
		setIsFetching(true);
		setIsError(false);
		setIsSuccess(false);

		if (!queryFn) {
			setIsFetching(false);
			return;
		}

		try {
			// Check cache first
			const cachedData = await getCachedData(cacheKey, cacheDuration);
			if (cachedData !== null) {
				setData(cachedData);
				setIsFetching(false);
				setIsSuccess(true);
				onSuccess?.(cachedData);
				return;
			}

			// If not in cache, fetch fresh data
			const freshData = await queryFn();
			await storeInCache(cacheKey, freshData);

			setData(freshData);
			setIsSuccess(true);
			onSuccess?.(freshData);
		} catch (error) {
			setIsError(true);
			setIsSuccess(false);
			setError(error as Error);
			onError?.(error as Error);
		} finally {
			setIsFetching(false);
		}
	}, [
		cacheKey,
		cacheDuration,
		queryFn,
		getCachedData,
		storeInCache,
		onSuccess,
		onError,
	]);

	// Execute the query when enabled or when cache key changes
	useEffect(() => {
		if (enabled) {
			handleQueryFn();
		}
	}, [cacheKey, enabled]);

	return {
		data: data,
		error,
		isFetching,
		isSuccess,
		isError,
	};
}
