import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';

import SelectedItem from './SelectedItem';
import Logic from './Logic'

it('renders with label only', () => {
    const item = {
        label: 'label',
        logic: 'OR'
    };
    const div = document.createElement('div');
    ReactDOM.render(<SelectedItem item={item} />, div);
});
    
it('renders with label and icon', () => {
    const item = {
        label: 'label',
        icon: 'icon',
        logic: 'NOT'
    };
    const div = document.createElement('div');
    ReactDOM.render(<SelectedItem item={item} />, div);
});
    
it('handleLogicChange single', () => {
    const item = {
        label: 'label',
        value: 'value',
        logic: 'OR'
    };
    const handleLogicChange = function(value, logic) {
        expect(value).toEqual(item.value);
        expect(logic).toEqual('AND');
    }
    const component = shallow(
        <SelectedItem item={item} handleLogicChange={handleLogicChange} />
    );
    component.find('button').simulate('click');
});
    
it('handleLogicChange multiple', () => {

    for (let currentLogic = 'OR', i=0; 
         i < 3; 
         currentLogic =  Logic.next(currentLogic), ++i) {

        const item = {
            label: 'label',
            value: 'value',
            logic: currentLogic
        };
        const handleLogicChange = function(value, logic) {
            expect(logic).toEqual(Logic.next(currentLogic));
        }
        const component = shallow(
            <SelectedItem item={item} handleLogicChange={handleLogicChange} />
        );
        component.find('button').simulate('click');
    }    
});