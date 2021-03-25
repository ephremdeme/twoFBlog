export enum UserRole {
	ADMIN = 'ADMIN',
	BLOGGER = "BLOGGER",
	CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
	USER = 'USER',
	GUEST = 'GUEST',
	SHOPE_ADMIN = 'SHOPE_ADMIN',
	SELLER = 'SELLER'
}

export interface User {
	uid: string;
	role: UserRole;
	email: string;
	photo: string;
	user_name: string;
	isOnline: boolean;
	view: number;
}

export interface Conversation {
	message: string,
	user_uid_1: string,
	user_uid_2: string,
	isView: boolean,
	createdAt: Date
}

export interface IUsers {
	users: User[],
	conversations: Conversation[],
	users_admin: User[],
	conversations_admin: Conversation[],
	test: any,
	pageVisit: number | null
}