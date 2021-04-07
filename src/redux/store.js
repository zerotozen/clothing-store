import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

//ponemos looger en un array
const middlewares = [logger, thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



export const store = createStore(
	rootReducer, 
	composeEnhancer(applyMiddleware(...middlewares))
	);
	
export const persistor = persistStore(store);

export default { store, persistor };

