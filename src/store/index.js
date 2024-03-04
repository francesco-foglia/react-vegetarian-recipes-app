import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import reducer from './reducers';

const store = configureStore({ reducer }, applyMiddleware(thunk));

export default store;
