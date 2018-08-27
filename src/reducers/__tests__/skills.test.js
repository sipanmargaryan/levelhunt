import * as skillsActions from '../../actions/skills'
import skills, * as fromSkills from '../skills'

describe('skills Reducer', () => {
	it('adds skills when receiving SKILLS_SUCCESS action', () => {
		const currentState = fromSkills.initialState
		const action = {
			type: skillsActions.SKILLS_SUCCESS,
			payload: {
				results: [
					{
						cover: 'http://localhost:8000/media/images/skills/skill/6e0c4f335bd6.jpg',
						icon: 'http://localhost:8000/media/images/skills/skill/6e0c4f335bd6.jpg',
						name: 'python',
						slug: 'python',
						url: 'http://localhost:8000/skills/1/'
					},
					{
						cover: 'http://localhost:8000/media/images/skills/skill/6e0c4f335bd6.jpg',
						icon: 'http://localhost:8000/media/images/skills/skill/6e0c4f335bd6.jpg',
						name: 'javascript',
						slug: 'javascript',
						url: 'http://localhost:8000/skills/2/'
					}
				]
			}
		}

		const nextState = skills(currentState, action)
		expect(nextState.skillsData).toEqual(action.payload.results)
	})
})
