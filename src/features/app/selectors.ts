import { RootState } from '../../app/store'

export default {
	getAppTheme: (state: RootState): boolean => state.app.appTheme,
	getProfileMenu: (state: RootState): boolean => state.app.profileMenu
}