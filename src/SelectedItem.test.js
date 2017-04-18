import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';

import SelectedItem from './SelectedItem';
import OptionStates from './OptionStates'

it('renders with label only', () => {
	const option = {
		label: 'label',
		state: {value: 'OR', label: 'OR'}
	};
	const div = document.createElement('div');
	ReactDOM.render(<SelectedItem option={option} />, div);
});
	
it('renders with label and icon', () => {
	const option = {
		label: 'label',
		icon: 'icon',
		state: {value: 'NOT', label: 'NOT'}
	};
	const div = document.createElement('div');
	ReactDOM.render(<SelectedItem option={option} />, div);
});
	
it('handleStateChange', () => {
	const option = {
		label: 'label',
		value: 'value',
		state: {value: 'OR', label: 'OR'}
	};
	const handleOptionStateChange = function(selectedOption) {
		expect(option.value).toEqual(selectedOption.value);
		expect(selectedOption.state.value).toEqual('OR');
	}
	const component = shallow(
		<SelectedItem option={option} handleOptionStateChange={handleOptionStateChange} />
	);
	component.find('div.item').simulate('click', 
		{preventDefault: function() {}, stopPropagation: function() {}});
});
