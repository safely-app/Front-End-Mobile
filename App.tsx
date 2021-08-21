import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import EntryPoint from './EntryPoint';

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <EntryPoint />
    </Provider>
  );
};

export default App;
