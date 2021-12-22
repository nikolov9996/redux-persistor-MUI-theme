import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import landingReducer, { LANDING_SLICE } from '../features/Landing/landingSlice';
import layoutReducer, { LAYOUT_SLICE } from '../features/Layout/layoutSlice';

const persistConfig = {
  key: "charts_v_1",
  version: 1,
  storage,
  blacklist: [LANDING_SLICE, LAYOUT_SLICE],
  whitelist: []
};

export const rootReducer = combineReducers({
  [LANDING_SLICE]: landingReducer,
  [LAYOUT_SLICE]: layoutReducer
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