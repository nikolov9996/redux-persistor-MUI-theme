import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from "redux-persist";
import landingReducer, { LANDING_SLICE } from '../features/Landing/landingSlice';
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "charts_v_1",
  version: 1,
  storage,
  blacklist: [LANDING_SLICE],
  whitelist: []
};

export const rootReducer = combineReducers({
  [LANDING_SLICE]: landingReducer
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