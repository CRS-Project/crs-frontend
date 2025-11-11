export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	token: string;
	role: string;
};

export type UserResponse = {
	personal_info: {
		id: string;
		name: string;
		email: string;
		initial: string;
		institution: string;
		photo_profile: string | null;
		role: string;
	};
	user_discipline_info: {
		discipline: string;
		number: number;
		initial: string;
	};
	package_access: {
		id: string;
		name: string;
		description: string;
	} | null;
};
