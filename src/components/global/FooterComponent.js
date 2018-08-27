import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class FooterComponent extends Component {
	render() {
		return (
			<div className="footer">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<p className="small">
								<Link to="/about">About us </Link>
								<Link className="border-0" to="/contact-us">
									Contact us{' '}
								</Link>
								<Link to="#">Privacy policy </Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default FooterComponent
