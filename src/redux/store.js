import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

//ponemos looger en un array
const middlewares = [logger];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const store = createStore(
	rootReducer, 
	composeEnhancer(applyMiddleware(...middlewares))
    );

export default store;

