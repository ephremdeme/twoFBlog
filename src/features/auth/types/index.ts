export enum UserRole {
	USER = 'USER',
	GUEST = 'GUEST',
	ADMIN = 'ADMIN',
	SELLER = 'SELLER',
	EDITOR = 'EDITOR',
	BLOGGER = 'BLOGGER',
	CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
	SHOPE_ADMIN = 'SHOPE_ADMIN',
	SHOPE_BRANCH_ADMIN = 'SHOPE_BRANCH_ADMIN',
	SHOPE_BRANCH_SELLER = 'SHOPE_BRANCH_SELLER',
}

export interface User {
	uid: string;
	role: UserRole;
	email: string;
	photo: string;
	user_name: string;
	authenticating: boolean;
	authenticated: boolean;
	isGuest: boolean;
	error: boolean;
	errorMessage?: string;
	loaded: boolean;
	blocked?: boolean;
}
