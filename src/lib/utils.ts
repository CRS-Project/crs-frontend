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
