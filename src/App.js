import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';

import reducer from './reducers';

import AppStack from './routes';

const CLIENT = axios.create({
  responseType: 'json',
});

const STORE = createStore(
  reducer,
  applyMiddleware(
    axiosMiddleware(
      CLIENT,
    ),
  ),
);

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={STORE}>
        <AppStack />
      </Provider>
    );
  }
}

export default App;
