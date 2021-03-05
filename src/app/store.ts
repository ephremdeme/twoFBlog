import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import editorReducer from '../features/editor';
import productReducer from '../features/product';
import appReducer from '../features/app'

export const store = configureStore({
  reducer: {
    app: appReducer,
    editor: editorReducer,
    product: productReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
