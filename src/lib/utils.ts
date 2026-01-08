export function parseToFormData(data: Record<string, string | Blob>): FormData {
	const formData = new FormData();
	for (const key in data) {
		formData.append(key, data[key]);
	}
	return formData;
}

export function parseError(text: string): string {
	return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function trimText(text: string, maxLength: number): string {
	if (text.length <= maxLength) {
		return text;
	}
	return `${text.slice(0, maxLength)}...`;
}

export function formatDateForRequest(
	dateString: string | undefined,
): string | undefined {
	if (!dateString) return undefined;

	try {
		const date = dateString + ":00Z";
		const isoDate = new Date(date).toISOString();
		return isoDate;
	} catch (error) {
		console.error("Error formatting date for request:", error);
		return undefined;
	}
}

export function formatDateForInput(
	dateString: string | undefined,
): string | undefined {
	if (!dateString) return undefined;

	try {
		const date = new Date(dateString);
		const year = date.getUTCFullYear();
		const month = String(date.getUTCMonth() + 1).padStart(2, "0");
		const day = String(date.getUTCDate()).padStart(2, "0");
		const hours = String(date.getUTCHours()).padStart(2, "0");
		const minutes = String(date.getUTCMinutes()).padStart(2, "0");

		return `${year}-${month}-${day}T${hours}:${minutes}`;
	} catch (error) {
		console.error("Error formatting date for input:", error);
		return undefined;
	}
}
