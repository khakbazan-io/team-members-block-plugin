import { useCallback } from "react";

/**
 * Name of the cache storage used for the team members block plugin
 */
const CACHE_STORAGE_NAME = "team-members-block-plugin";

/**
 * Gets or creates a cache instance for the plugin
 * @returns Promise<Cache | null> - The cache instance or null if cache API is not available
 */
async function getCacheInstance() {
	try {
		return await caches.open(CACHE_STORAGE_NAME);
	} catch (error) {
		return null;
	}
}

/**
 * Custom hook for managing cache operations in the team members block plugin
 * Provides functions to get, store, and remove data from the browser's cache
 * 
 * @returns {Object} An object containing three cache management functions:
 * - getCachedData: Retrieves cached data if it exists and hasn't expired
 * - storeInCache: Stores data in the cache with a timestamp
 * - removeFromCache: Removes data from the cache
 */
export function useCache() {
	/**
	 * Retrieves cached data if it exists and hasn't exceeded the cache duration
	 * @param cacheKey - The unique key to identify the cached data
	 * @param cacheDuration - The duration in milliseconds for which the cache is valid
	 * @returns Promise<T | null> - The cached data if valid, null otherwise
	 */
	const getCachedData = useCallback(
		async (cacheKey: string, cacheDuration: number) => {
			try {
				const cache = await getCacheInstance();

				if (!cache) return null;

				const cachedResponse = await cache.match(cacheKey);

				if (cachedResponse) {
					const cachedData = await cachedResponse.json();
					const cachedTimestamp = cachedData.timestamp;
					const now = Date.now();

					// Check if the cached data is still valid based on the duration
					if (now - cachedTimestamp < cacheDuration) {
						return cachedData.data;
					}
				}
			} catch (error) {}
			return null;
		},
		[],
	);

	/**
	 * Stores data in the cache with a timestamp
	 * @param cacheKey - The unique key to identify the cached data
	 * @param data - The data to be cached
	 */
	const storeInCache = useCallback(async (cacheKey: string, data: unknown) => {
		try {
			const cache = await getCacheInstance();
			if (!cache) return;

			// Store data with a timestamp for cache invalidation
			const dataWithTimestamp = { data, timestamp: Date.now() };

			await cache.put(
				cacheKey,
				new Response(JSON.stringify(dataWithTimestamp)),
			);
		} catch (error) {}
	}, []);

	/**
	 * Removes data from the cache
	 * @param cacheKey - The unique key identifying the data to be removed
	 */
	const removeFromCache = useCallback(async (cacheKey: string) => {
		try {
			const cache = await getCacheInstance();
			if (!cache) return;

			await cache.delete(cacheKey);
		} catch (error) {}
	}, []);

	return { getCachedData, storeInCache, removeFromCache };
}
