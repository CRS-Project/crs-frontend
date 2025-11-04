export default function parseToFormData(
	data: Record<string, string | Blob>,
): FormData {
	const formData = new FormData();
	for (const key in data) {
		formData.append(key, data[key]);
	}
	return formData;
}
