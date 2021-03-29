import { IUsers } from "./types";

export const initialState: IUsers = {
	users: [],
	conversations: [],
	users_admin: [],
	conversations_admin: [],
	test: [],
	pageVisit: null,
	tempo: false,
	openChatBox: false,
	messageView: 0,
	isTyping: false
};

export interface Iuser {
	uid: string;
	view: number;
}