import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { CounterEpics } from '../views/counter/CounterEpic';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from '../app/rtkServiceApi';
import counterReducer from '../views/counter/counterSlice';

// combined reducers
const rootReducers = combineReducers({
  counter: counterReducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
})

// combined epics
const rootEpics = combineEpics(CounterEpics)
const epicMiddleware = createEpicMiddleware()

// app's store
export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(contactsApi.middleware).concat(epicMiddleware)
  }
});

epicMiddleware.run(rootEpics)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
