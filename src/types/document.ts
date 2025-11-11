export type Document = {
	id: string;
	company_document_number: string;
	document_title: string;
	document_serial_number: string;
	document_url?: string;
	document_file?: File;
	document_type: string;
	document_category: string;
	contractor_document_number: string;
	ctr_number: string;
	wbs: string;
	discipline: string;
	sub_discipline: string;
	package: string;
	status: string;
};

export type CreateDocumentRequest = {
	company_document_number: string;
	document_title: string;
	document_serial_number: string;
	document_url?: string;
	document_file?: File;
	document_type: string;
	document_category: string;
	contractor_document_number: string;
	ctr_number: string;
	wbs: string;
	discipline: string;
	sub_discipline: string;
	package: string;
	status: string;
};

export type EditDocumentRequest = {
	document_title?: string;
	document_serial_number?: string;
	document_url?: string;
	document_file?: File;
	document_type?: string;
	document_category?: string;
	company_document_number?: string;
	contractor_document_number?: string;
	ctr_number?: string;
	wbs?: string;
	discipline?: string;
	sub_discipline?: string;
	status?: string;
};

export type ImportDocumentRequest = {
	file: File;
};

export type WithToken = {
	token: string;
};

export type DocumentPageParams = Promise<{ id: string }>;
