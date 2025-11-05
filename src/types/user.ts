export type User = {
	id: string;
	name: string;
	email: string;
	initial: string;
	institution: string;
	photo_profile: string | null;
	package: string;
	discipline: string;
	role: string;
};

export type CreateUserRequest = {
	name: string;
	email: string;
	password: string;
	initial: string;
	institution: string;
	role: string;
	package_id: string;
	discipline_id: string;
	//   photo_profile: File;
};

export type EditUserRequest = {
	name?: string;
	email?: string;
	password?: string;
	initial?: string;
	institution?: string;
	role?: string;
	package_id?: string;
	discipline_id?: string;
	//   photo_profile?: File;
};
export type WithToken = {
	token: string;
};
