import './App.css';

import { Counter } from './views/counter/Counter';
import React from 'react';
import User from './views/user/User';

function App() {
  return (
    <div className="App">
      <Counter />
      <User />
    </div>
  );
}

export default App;
