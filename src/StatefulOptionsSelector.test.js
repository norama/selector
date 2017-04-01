import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';

import StatefulOptionsSelector, { limitOptions } from './StatefulOptionsSelector';

const states = [
    {
        value: 'OR',
    },
    {
        value: 'AND',
    },
    {
        value: 'NOT',
    }
];

const data = [
    { 
        id: 'MainSources',
        title: 'SOURCES',
        type: 'source',

        options: [
            {
                value: 'Aeronet.cz'
            },
            {
                label: 'ParlamentniListy.cz',
                value: 'ParlamentniListy.cz'
            }
        ]
        
    },
    
    { 
        id: 'MainTags',
        title: 'TAGS',
        type: 'tag',

        options: [
            {
                value: 'Troll'
            },
            {
                label: 'Propaganda',
                value: 'Propaganda',
                icon: 'img/green.png'
            }
        ]
        
    }
];

const value0 = { selected: [ 'Aeronet.cz' ] };

const value1 = { OR: [ 'Aeronet.cz' ] };

const value2 = { OR: [ 'Aeronet.cz' ], AND: [ 'Troll' ] };


it('renders without data', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StatefulOptionsSelector />, div);
});
    
it('renders with data', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StatefulOptionsSelector data={data} states={states} />, div);
});
    
it('no states', () => {  
    const handleChange = function(value) {
        expect(value).toEqual({ selected: [ 'Aeronet.cz' ] }); 
    };
    
    const component = mount(
        <StatefulOptionsSelector data={data} handleChange={handleChange} value={value0} />
    );
    
    component.find('button.selected').first().simulate('click');
    component.find('button.selected').first().simulate('click');
    component.find('button.selected').first().simulate('click');  
});   
    
it('select 1 item', () => {
    const handleChange = function(value) {
        expect(value).toEqual({ AND: [], OR: [ 'Aeronet.cz' ], NOT: [] });
    };
    
    const component = mount(
        <StatefulOptionsSelector data={data} handleChange={handleChange} value={value1} states={states} />
    );
});    

it('select 1 item with state change', () => {
    
    let counter = 0;
    const handleChange = function(value) {
        switch (counter % 3) {
            case 0: expect(value).toEqual({ AND: [], OR: [ 'Aeronet.cz' ], NOT: [] }); break;
            case 1: expect(value).toEqual({ AND: [ 'Aeronet.cz' ], OR: [], NOT: [] }); break;
            case 2: expect(value).toEqual({ AND: [], OR: [], NOT: [ 'Aeronet.cz' ] }); break;  
        };
        counter++;
    };
    
    const component = mount(
        <StatefulOptionsSelector data={data} handleChange={handleChange} value={value1} states={states} />
    );
    
    component.find('button.or').first().simulate('click');
    component.find('button.and').first().simulate('click');
    component.find('button.not').first().simulate('click');
    
});   
    
it('select 2 items', () => {
    const handleChange = function(value) {
        expect(value).toEqual({ AND: [ 'Troll' ], OR: [ 'Aeronet.cz' ], NOT: [] });
    };
    
    const component = mount(
        <StatefulOptionsSelector data={data} handleChange={handleChange} value={value2} states={states} />
    );
});   
 
it('select 2 items with logic change', () => {
    
    let counter = 0;
    const handleChange = function(value) {
        value.AND.sort();
        switch (counter % 3) {
            case 0: expect(value).toEqual({ AND: [ 'Troll' ], OR: [ 'Aeronet.cz' ], NOT: [] }); break;
            case 1: expect(value).toEqual({ AND: [ 'Aeronet.cz', 'Troll' ], OR: [], NOT: [] }); break;
            case 2: expect(value).toEqual({ AND: [ 'Troll' ], OR: [], NOT: [ 'Aeronet.cz' ] }); break;  
        };
        counter++;
    };
    
    const component = mount(
        <StatefulOptionsSelector data={data} handleChange={handleChange} value={value2} states={states} />
    );
    
    component.find('div.source button.or').first().simulate('click');
    component.find('div.source button.and').first().simulate('click');
    component.find('div.source button.not').first().simulate('click');
    
});    
    
it('unselect item with x', () => {
    let counter = 0;
    const handleChange = function(value) {
    switch (counter) {
            case 0: expect(value).toEqual({ AND: [], OR: [ 'Aeronet.cz' ], NOT: [] }); break;
            case 1: expect(value).toEqual({ AND: [], OR: [], NOT: [] }); break;
        };
        counter++;
    };
    
    const component = mount(
        <StatefulOptionsSelector data={data} handleChange={handleChange} value={value1} states={states} />
    );
    component.find('span.x').first().simulate('click');
    
});
    

it('unselect all', () => {
    let counter = 0;
    const handleChange = function(value) {
    switch (counter) {
            case 0: expect(value).toEqual({ AND: [ 'Troll' ], OR: [ 'Aeronet.cz' ], NOT: [] }); break;
            case 1: expect(value).toEqual({ AND: [], OR: [], NOT: [] }); break;
        };
        counter++;
    };
    
    const component = mount(
        <StatefulOptionsSelector data={data} handleChange={handleChange} value={value2} states={states} />
    );
    component.find('svg.react-selectize-reset-button').first().simulate('click');
    
});
    
it('maxGroupOptionsCount', () => {
    const options = [
        {value: 'opt11', groupId: 'g1'}, 
        {value: 'opt12', groupId: 'g1'}, 
        {value: 'opt13', groupId: 'g1'},
        {value: 'opt21', groupId: 'g2'}
    ];
    
    const limited = limitOptions(options, 2);
    
    expect(limited).toEqual([ 
        { value: 'opt11', groupId: 'g1' },
        { value: 'opt12', groupId: 'g1' },
        { value: '...', label: '...', selectable: false, groupId: 'g1' },
        { value: 'opt21', groupId: 'g2' } 
    ]);
});
