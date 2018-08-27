import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'
import { apiMiddleware, ApiError } from 'redux-api-middleware';
import configureMockStore from 'redux-mock-store'
import * as skillsActions from '../skills'
import  * as fromSkills from '../../reducers/skills'

const createStore = configureMockStore([thunk, apiMiddleware])
const store = createStore(fromSkills.initialState)

describe('skills actions', () => {

    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('creates getFavoriteSkills {SKILLS_REQUEST} action', () => {
        const response = [
            {
                cover: 'http://localhost:8000/images/6e0c4f335bd6.jpg',
                icon: 'http://localhost:8000/images/6e0c4f335bd6.jpg',
                name: 'python',
                slug: 'python',
                url: 'http://localhost:8000/skills/1/'
            },
            {
                cover: 'http://localhost:8000/images/6e0c4f335bd6.jpg',
                icon: 'http://localhost:8000/images/6e0c4f335bd6.jpg',
                name: 'javascript',
                slug: 'javascript',
                url: 'http://localhost:8000/skills/2/'
            }
        ]

        fetchMock.getOnce('/skills/?limit=6',
                { body: { results: response }})

        const expectedActions = [
            { type: skillsActions.SKILLS_REQUEST, payload: undefined},
            { type: skillsActions.SKILLS_SUCCESS, payload: { results: response }}
        ]

        store.dispatch(skillsActions.getFavoriteSkills())
             .then(() => {
                 expect(store.getActions()).toEqual(expectedActions)
             })
    })
})