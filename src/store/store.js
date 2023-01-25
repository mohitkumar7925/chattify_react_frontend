import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistConfig = {
      key: "root",
      storage,
};

const reducers = persistReducer(
      persistConfig,
      combineReducers({
            userReducer,
      })
);

export const store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                  serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                  },
            }),
});

export const persistor = persistStore(store);
