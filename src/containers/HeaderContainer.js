import React, { Component } from 'react'
import HeaderComponent from '../components/global/HeaderComponent'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isAuthenticated } from '../reducers'
import { logout } from '../actions/auth'
import { func } from 'prop-types'

class HeaderContainer extends Component {
	render() {
		return <HeaderComponent logout={this.logout} isAuthenticated={this.props.isAuthenticated} />
	}

	logout = () => {
		this.props.logout()
	}
}

HeaderContainer.propTypes = {
	logout: func.isRequired
}

const mapStateToProps = state => ({
	isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(HeaderContainer)
)
