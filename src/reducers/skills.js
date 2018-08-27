import * as skills from '../actions/skills'

const initialState = {
	skillsData: [],
	errors: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case skills.SKILLS_SUCCESS:
			return {
				...state,
				skillsData: action.payload.results
			}
		case skills.SKILLS_FAILURE:
			return {
				...state,
				errors: action.payload.response
			}
		default:
			return state
	}
}

export function getSkills(state) {
	return state.skillsData
}
