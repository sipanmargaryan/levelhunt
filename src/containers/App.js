import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NotificationContainer } from 'react-notifications'
import LanguageSwitcher from '../utils/LanguageSwitcher'

class App extends Component {
	render() {
		return (
			<div>
				<NotificationContainer />
				<LanguageSwitcher />
			</div>
		)
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
)
