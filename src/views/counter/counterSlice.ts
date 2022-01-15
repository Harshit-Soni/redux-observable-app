import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    asyncIncrementByAmount: (state, _action) => {
      state.status = 'loading';
    },
    // Epics run alongside the normal Redux dispatch channel,
    // after the reducers have already received them.
    // When you map an action to another one, you are not preventing
    // the original action from reaching the reducers, that action has already been through them!
    asyncIncrementByAmountSuccess: (state, action: PayloadAction<number>) => {
      state.status = 'idle';
      state.value += action.payload;
    },
    asyncIncrementByAmountFailed: (state) => {
      state.status = 'failed';
    }
  },
});

export const CounterAction = counterSlice.actions;

export default counterSlice.reducer;
