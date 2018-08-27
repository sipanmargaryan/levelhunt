import raf from './tempPolyfills'
import Enzyme, { shallow, render, mount } from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

Enzyme.configure({ adapter: new ReactSixteenAdapter() })

global.shallow = shallow
global.render = render
global.mount = mount
global.toJson = toJson

// Fail __tests__ on any warning
console.error = message => {
	throw new Error(message)
}
