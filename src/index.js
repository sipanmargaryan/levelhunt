import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-notifications/lib/notifications.css'
import 'cropperjs/dist/cropper.css'
import configureStore from './store'
import Root from './routes/Root'

require('dotenv').config()

async function init() {
	const history = createHistory()

	const store = await configureStore(history)

	ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'))
}

init()
