import React from 'react';
import { shallow } from 'enzyme';
// import Colors from './Colors'

import Entry from './Entry';

function createTestProps (props) {
	return {
		// common props
		entryTime: "13:37",
		isExit: false,
		name: 'name',
		// allow to override common props
		...props,
	}
}

describe('rendering', () => {
	let wrapper;
	const createWrapper = props => shallow(<Entry {...props}/>);
	beforeEach(() => {
		const props = createTestProps()
		wrapper = createWrapper(props);
	});
	it('renders as expected', () => {
		expect(wrapper).toMatchSnapshot();
	});
	describe('With default props', () => {
		beforeEach(() => {
			wrapper = createWrapper();
		});
		it('has a default isExit set to false', () => {
			expect(wrapper.instance().props.isExit).toBe(false);
		});
	});
	describe('when isExit is set to false', () => {
		beforeEach(() => {
			const props = createTestProps({ isExit: false })
			wrapper = createWrapper(props);
		});
		it('says Entrada', () => {
			expect(wrapper.findWhere(node => node.prop('testID') === 'entry-message').props().text).toBe('Entrada');
		});
	});
	describe('when isExit is set to true', () => {
		beforeEach(() => {
			const props = createTestProps({ isExit: true })
			wrapper = createWrapper(props);
		});
		it('says Salida', () => {
			expect(wrapper.findWhere(node => node.prop('testID') === 'entry-message').props().text).toBe('Salida');
		});
	});
})

// describe('callbacks');
// describe('lifecycle');
