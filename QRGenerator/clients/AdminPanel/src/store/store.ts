import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { infoReducer} from './slices';

export const store = configureStore({
  reducer: {
    info: infoReducer,
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
