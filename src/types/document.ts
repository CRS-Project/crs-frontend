export type Document = {
	id: string;
	document_name: string;
	package: string;
	discipline: string;
};

export type CreateDocumentRequest = {
	document_name: string;
	package_id: string;
	discipline_id: string;
};

export type EditDocumentRequest = {
	document_name?: string;
	package_id?: string;
	discipline_id?: string;
};
export type WithToken = {
	token: string;
};
