import type { Consolidator } from "./consolidator";

export type Concern = {
	id: string;
	area_of_concern_id: string;
	description: string;
	package: string;
	consolidators: Consolidator[];
};
