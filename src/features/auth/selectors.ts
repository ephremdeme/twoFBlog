import { UserRole } from "./types";
import { RootState } from "app/store";

export default {
  selectBlocked: (state: RootState): boolean => state.auth.blocked??false,
  selectUserRole: (state: RootState): UserRole[] => [state.auth.role],
  selectUserAuthenticated: (state: RootState) => state.auth.authenticated,
  selectUserId: (state: RootState) => state.auth.uid,
}