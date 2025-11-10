export type User = {
	id: string;
	name: string;
	email: string;
	initial: string;
	institution: string;
	photo_profile: string | null;
	package: string;
	discipline: string;
	package_id: string;
	discipline_id: string | null;
	discipline_number: number;
	role: string;
};

export type UserComment = {
	name: string;
	photo_profile: string | null;
	role: string;
};

export type CreateUserRequest = {
	name: string;
	email: string;
	password: string;
	initial: string;
	institution: string;
	role: string;
	discipline_number: number;
	photo_profile: string;
	package_id: string;
	discipline_id?: string;
};

export type EditUserRequest = {
	name?: string;
	email?: string;
	password?: string;
	initial?: string;
	institution?: string;
	role?: string;
	discipline_number?: number;
	photo_profile?: string;
	package_id?: string;
	discipline_id?: string;
};
export type WithToken = {
	token: string;
};
