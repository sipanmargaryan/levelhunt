import storage from 'redux-persist/es/storage'
import { applyMiddleware, createStore } from 'redux'
import { createFilter } from 'redux-persist-transform-filter'
import { persistReducer, persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import createRavenMiddleware from 'raven-for-redux'
import * as Raven from 'raven-js'

import apiMiddleware from './middleware'
import rootReducer from './reducers'
import rootSaga from './sagas'

export default history => {
	const persistedFilter = createFilter('auth', ['access', 'refresh', 'user'])
	const middlewareHistory = routerMiddleware(history)
    const sagaMiddleware = createSagaMiddleware()
	const reducer = persistReducer(
		{
			key: 'levelhunt',
			storage: storage,
			whitelist: ['auth', 'locale'],
			transforms: [persistedFilter]
		},
		rootReducer
	)
	const middlewares = [apiMiddleware, middlewareHistory, sagaMiddleware]
	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger)
	} else {
		Raven.config(process.env.REACT_APP_RAVEN_DSN).install()
		middlewares.push(createRavenMiddleware(Raven, {}))
	}

	const store = createStore(
		reducer,
		{},
		//TODO will be deleted in production mode
		composeWithDevTools(applyMiddleware(...middlewares))
	)

    sagaMiddleware.run(rootSaga)

	return new Promise((resolve, reject) => {
		persistStore(store, null, () => {
			resolve(store)
		})
	})
}
