export enum UserRole {
	ADMIN = 'ADMIN',
	CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
	USER = 'USER',
	GUEST = 'GUEST',
	SHOPE_ADMIN = 'SHOPE_ADMIN',
	SHOPE_EMPLOYEE = 'SHOPE_EMPLOYEE'
}

export interface User {
	uid: string;
	role: UserRole;
	email: string;
	photo: string;
	user_name: string;
	isOnline: string;
}