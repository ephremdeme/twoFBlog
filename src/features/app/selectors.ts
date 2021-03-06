import { IAppState } from './index'

export default {
	getAppTheme: (state: IAppState): boolean => state.appTheme
}