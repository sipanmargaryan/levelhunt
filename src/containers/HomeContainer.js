import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { func } from 'prop-types'
import HomeComponent from '../components/home/HomeComponent'
import { getSkills } from '../reducers'
import { getFavoriteSkills } from '../actions/skills'

class HomeContainer extends Component {
	componentDidMount() {
		this.props.getFavoriteSkills()
	}

	render() {
		return <HomeComponent skillsData={this.props.skillsData} name="sipan" />
	}
}

HomeContainer.propTypes = {
    getFavoriteSkills: func.isRequired
}

const mapStateToProps = state => ({
	skillsData: getSkills(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ getFavoriteSkills }, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeContainer)
