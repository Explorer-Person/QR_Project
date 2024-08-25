import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer} from './slices';

export const store = configureStore({
  reducer: {
    user: userReducer
    //[setAuthStatus.reducerPath]: apiSlice.reducer,
  },
  //middleware: (getDefaultMiddleware) =>
   // getDefaultMiddleware().concat(apiSlice.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
