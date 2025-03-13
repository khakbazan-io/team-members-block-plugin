/**
 * Converts an array of unknown values into a string, with elements separated by a specified delimiter.
 * Objects in the array are stringified using JSON.stringify, while other values are converted using String().
 * 
 * @param value - Array of unknown values to convert to string
 * @param seperator - The delimiter to use between array elements (defaults to "-")
 * @returns A string containing all array elements joined by the separator
 * 
 * @example
 * arrayToString([1, "hello", { key: "value" }]) // Returns "1-hello-{\"key\":\"value\"}"
 * arrayToString(["a", "b", "c"], ", ") // Returns "a, b, c"
 */
export function arrayToString(value: unknown[], seperator = "-"): string {
	return value
		.map((element) => {
			// Handle objects by converting them to JSON strings
			if (typeof element === "object" && Boolean(element)) {
				return JSON.stringify(element);
			}

			// Convert non-object values to strings
			return String(element);
		})
		.join(seperator);
}
