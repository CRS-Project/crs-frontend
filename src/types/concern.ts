import type { Consolidator, ConsolidatorUser } from "./consolidator";
import type { Document } from "./document";

export type AreaOfConcern = {
	id: string;
	package: string;
	document: Document;
	area_of_concern_id?: string;
	description?: string;
	consolidators?: Consolidator[];
};

export type Concern = {
	id: string;
	review_focus: string;
	package: string;
	user_discipline: string;
	discipline_initial?: string;
	discipline_group_consolidators?: Consolidator[];
};

export type CreateAreaOfConcernRequest = {
	document_id?: string;
	consolidators?: ConsolidatorUser[];
	consolidator_select?: string;
	package_id: string;
};

export type EditAreaOfConcernRequest = {
	document_id?: string;
	consolidators?: ConsolidatorUser[];
	consolidator_select?: string;
	package_id: string;
};

export type CreateConcernRequest = {
	user_discipline: string;
	discipline_initial: string;
	review_focus: string;
	discipline_group_consolidators: ConsolidatorUser[];
	consolidator_select?: string;
};

export type EditConcernRequest = {
	user_discipline?: string;
	discipline_initial?: string;
	review_focus?: string;
	discipline_group_consolidators?: ConsolidatorUser[];
	consolidator_select?: string;
};
