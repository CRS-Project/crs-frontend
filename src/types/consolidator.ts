export type Consolidator = {
	id: string;
	name: string;
	discipline_group_consolidator_id: string;
};

export type ConsolidatorSelectOption = {
	value: string;
	label: string;
};

export type ConsolidatorUser = {
	user_id?: string;
	discipline_group_consolidator_id?: string;
	name?: string;
};
