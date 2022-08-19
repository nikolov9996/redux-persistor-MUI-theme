import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from "redux-persist";
import landingReducer, { AUTH_SLICE } from '../features/authSlice';
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "charts_v_1",
  version: 1,
  storage,
  blacklist: [AUTH_SLICE],
  whitelist: []
};

export const rootReducer = combineReducers({
  [AUTH_SLICE]: landingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export const persistor = persistStore(store);