import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { CounterEpics } from '../views/counter/CounterEpic';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../views/counter/counterSlice';

// combined reducers
const rootReducers = combineReducers({
  counter: counterReducer,
})

// combined epics
const rootEpics = combineEpics(CounterEpics)
const epicMiddleware = createEpicMiddleware()

// app's store
export const store = configureStore({
  reducer: rootReducers,
  middleware: [ epicMiddleware ]
});

epicMiddleware.run(rootEpics)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
