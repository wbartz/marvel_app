import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import HeroesList from '../components/HeroesList';

import reducer from '../reducers';

import devtools from 'remote-redux-devtools';

const CLIENT = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  responseType: 'json'
});

const STORE = createStore(reducer, applyMiddleware(axiosMiddleware(CLIENT)));

class List extends React.Component {
  render () {
    return (
      <Provider store={STORE}>
        <HeroesList />
      </Provider>
    )
  }
}

export default List;