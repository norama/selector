import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import MenuItem from './MenuItem';

it('renders with label only', () => {
    const item = {
        label: 'label',
        value: 'value'
    };
    const div = document.createElement('div');
    ReactDOM.render(<MenuItem item={item} />, div);
});
    
it('renders with label and icon', () => {
    const item = {
        label: 'label',
        value: 'value',
        icon: 'icon'
    };
    const div = document.createElement('div');
    ReactDOM.render(<MenuItem item={item} />, div);
});
    
it('component DOM matches snapshot', () => {
    const item = {
        label: 'label',
        value: 'value',
        icon: 'icon'
    };
    const component = renderer.create(
        <MenuItem item={item} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});