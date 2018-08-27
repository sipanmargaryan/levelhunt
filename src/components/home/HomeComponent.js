import React, { Component } from 'react'
import { localize } from 'react-redux-localization'
import translations from '../../translations/home.json'

class HomeComponent extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.l('hello', this.props.name)}</h1>
				{this.props.skillsData && this.props.skillsData.length > 0
					? this.props.skillsData.map(skill => {
							return (
								<div key={skill.name}>
									<p key={skill.name}>{skill.name}</p>
									<img key={skill.icon} src={skill.icon} alt="Oops it's seems we lose something " />
								</div>
							)
					  })
					: ''}
			</div>
		)
	}
}

export default localize(translations)(HomeComponent)
