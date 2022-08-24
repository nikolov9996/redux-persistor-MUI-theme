import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import authReducer, { AUTH_SLICE } from "../features/authSlice";
import accountsReducer, {
  ACCOUNTS_SLICE,
} from "../features/Accounts/accountsSlice";
import agentsReducer, { AGENTS_SLICE } from "../features/Agents/agentsSlice";
import profileReducer, {
  PROFILE_SLICE,
} from "../features/Profile/profileSlice";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "charts_v_1",
  version: 1,
  storage,
  blacklist: [ACCOUNTS_SLICE, AGENTS_SLICE, PROFILE_SLICE],
  whitelist: [AUTH_SLICE],
};

export const rootReducer = combineReducers({
  [AUTH_SLICE]: authReducer,
  [ACCOUNTS_SLICE]: accountsReducer,
  [AGENTS_SLICE]: agentsReducer,
  [PROFILE_SLICE]: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
