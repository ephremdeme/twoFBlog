import { RootState } from '../../app/store'

export default {
	getAppTheme: (state: RootState): boolean => state.app.appTheme
}