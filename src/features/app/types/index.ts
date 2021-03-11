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
}