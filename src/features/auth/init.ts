import Cookies from "js-cookie";
import { UserRole, IAuthState } from "./types";

export const initialState: IAuthState = {
	user: {
		uid: '',
		role: Cookies.get('user')
			? JSON.parse(`${Cookies.get('user')}`).role
			: UserRole.GUEST,
		email: '',
		photo: '',
		user_name: '',
		authenticating: false,
		authenticated: false,
		isGuest: true,
		error: false,
		loaded: false,
		blocked: false
	},
	authError: ""
};