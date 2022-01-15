import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import {CounterAction} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const dispatch = useAppDispatch();
  const counterState = useAppSelector(state => state.counter)
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  const getValue = () => {
    if (counterState.status === 'loading') return 'Loading'
    else return 'Add Async'
  }

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(CounterAction.decrement())}
        >
          -
        </button>
        <span className={styles.value}>{counterState.value}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(CounterAction.increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(CounterAction.incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(CounterAction.asyncIncrementByAmount(incrementValue))}
        >
          {getValue()}
        </button>
      </div>
    </div>
  );
}
