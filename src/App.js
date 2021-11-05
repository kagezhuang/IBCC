import { object } from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import Routes from './Routes';

function App({ history, store }) {
  return (
    <Provider store={store}>
      <Routes history={history} />
    </Provider>
  );
}

App.propTypes = {
  history: object.isRequired,
  store: object.isRequired,
};

export default App;
