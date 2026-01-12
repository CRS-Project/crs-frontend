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

	return `${dateString}:00+07:00`;
}

export function formatDateForInput(
	dateString: string | undefined,
): string | undefined {
	if (!dateString) return undefined;

	try {
		const date = new Date(dateString);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return `${year}-${month}-${day}T${hours}:${minutes}`;
	} catch (error) {
		console.error("Error formatting date for input:", error);
		return undefined;
	}
}
