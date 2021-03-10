import { IAppState } from './index'

export default {
	getLogged: (state: IAppState): boolean => state.logged,
	getRole: (state: IAppState): string => state.role,
	getEmail: (state: IAppState): string => state.email
}