import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import MenuItem from './MenuItem';

it('renders with label only', () => {
	const option = {
		label: 'label',
		value: 'value'
	};
	const div = document.createElement('div');
	ReactDOM.render(<MenuItem option={option} />, div);
});
	
it('renders with label and icon', () => {
	const option = {
		label: 'label',
		value: 'value',
		icon: 'icon'
	};
	const div = document.createElement('div');
	ReactDOM.render(<MenuItem option={option} />, div);
});
	
it('component DOM matches snapshot', () => {
	const option = {
		label: 'label',
		value: 'value',
		icon: 'icon'
	};
	const component = renderer.create(
		<MenuItem option={option} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});