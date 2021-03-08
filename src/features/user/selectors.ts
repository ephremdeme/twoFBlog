import { IAppState } from './index'

export default {
	getLogged: (state: IAppState): boolean => state.logged
}