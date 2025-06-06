import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import auth from 'src/app/slices/authSlice';
import { api } from './services/api';
import { rtkQueryErrorLogger } from './services/api/middlewares';

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getRootState = () => store.getState();
