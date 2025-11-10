import type { User } from "./user";

export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	token: string;
	role: string;
};

export type UserResponse = {
	personal_info: User;
	user_discipline_info: {
		discipline: string;
		number: number;
		initial: string;
	};
	package_access: null | string;
};
