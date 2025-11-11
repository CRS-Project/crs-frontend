export type Concern = {
	id: string;
	review_focus: string;
	package: string;
	user_discipline: string;
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
