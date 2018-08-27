import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setLocale, getLocale } from 'react-redux-localization'

class LanguageSwitcher extends Component {
	handleChange = event => {
		this.props.chooseLocale(event.target.value)
	}

	render() {
		const locales = ['en', 'arm', 'ru']
		return (
			<div>
				<select onChange={this.handleChange} value={this.props.locale}>
					{locales.map(loc => (
						<option key={loc} value={loc}>
							{loc}
						</option>
					))}
				</select>
			</div>
		)
	}
}

const mapStateToProps = state => ({ locale: getLocale(state) })
const mapDispatchToProps = dispatch => ({ chooseLocale: locale => dispatch(setLocale(locale)) })

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LanguageSwitcher)
