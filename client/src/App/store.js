import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/reducer/reducer';
import taskReducer from '../features/reducer/taskReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

// const userPersistReducer = persistReducer(persistConfig, userReducer);
// const taskPersistReducer = persistReducer(persistConfig, taskReducer);
const rootReducer = combineReducers({
  user: userReducer,
  UserTask: taskReducer,
});
const reducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), //For Error Prevention
});

export const persistor = persistStore(store);

export default store;
