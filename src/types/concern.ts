import type { Consolidator, ConsolidatorUser } from "./consolidator";

export type AreaOfConcern = {
	id: string;
	area_of_concern_id: string;
	description: string;
	package: string;
	consolidators: Consolidator[];
};

export type Concern = {
	id: string;
	review_focus: string;
	package: string;
	user_discipline: string;
};

export type CreateAreaOfConcernRequest = {
	area_of_concern_id: string;
	description: string;
	consolidators: ConsolidatorUser[];
	consolidator_select?: string;
	package_id: string;
};

export type EditAreaOfConcernRequest = {
	area_of_concern_id: string;
	description: string;
	consolidators: ConsolidatorUser[];
	consolidator_select?: string;
	package_id: string;
};

export type CreateConcernRequest = {
	review_focus: string;
	package: string;
	user_discipline: string;
};

export type EditConcernRequest = {
	review_focus?: string;
	package?: string;
	user_discipline?: string;
};

export type ConcernPageParams = Promise<{ id: string }>;
