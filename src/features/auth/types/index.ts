export interface Roles {
	isUser: boolean;
	isGuest: boolean;
	isAdmin: boolean;
	isSeller: boolean;
	isEditor: boolean;
	isBlogger: boolean;
	isShopeAdmin: boolean;
	isBranchAdmin: boolean;
	isBranchSeller: boolean;
	isCustomerService: boolean;
}

export enum UserRole {
	USER = 'USER',
	GUEST = 'GUEST',
	ADMIN = 'ADMIN',
	SELLER = 'SELLER',
	EDITOR = 'EDITOR',
	BLOGGER = 'BLOGGER',
	SHOPE_ADMIN = 'SHOPE_ADMIN',
	CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
	SHOPE_BRANCH_ADMIN = 'SHOPE_BRANCH_ADMIN',
	SHOPE_BRANCH_SELLER = 'SHOPE_BRANCH_SELLER',
}

export enum AppEdition {
	STARTER = 'STARTER',
	BASIC = 'BASIC',
	PREMIUM = 'PREMIUM'
}

export interface User {
	uid: string;
	role: Roles;
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
	isOnline?: boolean;
	edition: AppEdition;
}

export interface IAuthState {
	user: User;
	authError: string;
}
