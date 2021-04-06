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

interface Ityping {
	isTyping: boolean;
	isTypingTo: string;
}

export interface User {
	uid: string;
	role: UserRole;
	email: string;
	photo: string;
	user_name: string;
	isOnline: boolean;
	view?: number;
	key?: string;
	isTyping?: Ityping;
	last_send?: Date;
	blocked?: boolean;
}

export interface Conversation {
	message: string;
	user_uid_1: string;
	user_uid_2: string;
	isView: boolean;
	createdAt: Date;
}

export interface IUsers {
	users: User[];
	conversations: Conversation[];
	users_admin: User[];
	conversations_admin: Conversation[];
	test: any;
	pageVisit: number | null;
	tempo: boolean;
	openChatBox: boolean;
	messageView: number;
	isTyping: boolean;
}
