import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./slices";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger"; // Optional for debugging

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: "v1",
    version: 0.1,
    storage,
    whitelist: ["login"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(sagaMiddleware, logger), // Add logger for debugging
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
