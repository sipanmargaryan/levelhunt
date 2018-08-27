import React, { Component } from 'react'
import { connect } from 'react-redux'
import withRouter from 'react-router-dom/es/withRouter'
import * as reducers from '../reducers/index'
import LoginContainer from '../containers/LoginContainer'

export default function(ComposedComponent) {
	class Authenticate extends Component {
		status = false
		permissions = {
			'/home': ['isAuthenticated'],
			'/users/profile': ['isAuthenticated']
		}

		constructor(props) {
			super(props)
			this.status = true

			//remove last slash from url
			let path = this.props.location.pathname
            if(path.substr(-1) === '/') {
                path =  path.substr(0, path.length - 1);
            }

			const permissions = this.permissions[path]
			if (permissions) {
				let pass = []
				for (let i = permissions.length - 1; i >= 0; i--) {
					pass.push(this.props[permissions[i]])
				}

				if (
					Object.keys(pass).every(function(k) {
						return pass[k]
					})
				) {
					this.status = true
				} else {
					this.props.history.push('/login')
					this.status = false
				}
			} else {
                this.props.history.push('/login')
				this.status = false
			}
		}

		componentDidUpdate() {
			if (!this.props.isAuthenticated) {
				this.props.history.push('/')
			}
		}

		render() {
			if (this.status) {
				return <ComposedComponent />
			} else {
				return <LoginContainer />
			}
		}
	}

	function mapStateToProps(state) {
		return {
			isAuthenticated: reducers.isAuthenticated(state)
		}
	}

	return withRouter(connect(mapStateToProps)(Authenticate))
}
