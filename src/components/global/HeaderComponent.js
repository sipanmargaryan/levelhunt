import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HeaderComponent extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link className="navbar-brand" to="#">
					Navbar
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<form className="form-inline my-2 my-lg-0">
						<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
							Search
						</button>
					</form>
					<ul className="navbar-nav float-right">
						<li className="nav-item active">
							<Link className="nav-link" to="/">
								Home <span className="sr-only">(current)</span>
							</Link>
						</li>
						{this.props.isAuthenticated ? (
							<li className="nav-item" onClick={this.props.logout}>
								<Link className="nav-link disabled" to="#">
									Logout
								</Link>
							</li>
						) : (
							<div className="d-inline-flex">
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										Sign In
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link disabled" to="/registration">
										Sign Up
									</Link>
								</li>
							</div>
						)}
					</ul>
				</div>
			</nav>
		)
	}
}

export default HeaderComponent
