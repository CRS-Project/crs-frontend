export type Document = {
	id: string;
	document_number: string;
	document_title: string;
	company_document_number: string;
	document_serial_number: string;
	document_url?: string;
	document_file?: File;
	document_type: string;
	document_category: string;
	contractor_document_number: string;
	due_date?: string;
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
	due_date?: string;
	ctr_number: string;
	wbs: string;
	discipline: string;
	sub_discipline: string;
	package: string;
	status: string;
};

export type EditDocumentRequest = {
	company_document_number?: string;
	document_title?: string;
	document_serial_number?: string;
	document_url?: string;
	document_file?: File;
	document_type?: string;
	document_category?: string;
	contractor_document_number?: string;
	due_date?: string;
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
