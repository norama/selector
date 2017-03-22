import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';

import SourcesTagsSelector from './SourcesTagsSelector';

const data = [
    { 
        id: 'MainSources',
        title: 'SOURCES',
        type: 'source',

        items: [
            {
                label: 'Aeronet.cz',
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

        items: [
            {
                label: 'Troll',
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

const value1 = { OR: [ 'Aeronet.cz' ] };

const value2 = { OR: [ 'Aeronet.cz' ], AND: [ 'Troll' ] };


it('renders without data', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SourcesTagsSelector />, div);
});
    
it('renders with data', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SourcesTagsSelector data={data} />, div);
});
    
it('select 1 item', () => {
    const handleChange = function(value) {
        expect(value).toEqual({ AND: [], OR: [ 'Aeronet.cz' ], NOT: [] });
    };
    
    const component = mount(
        <SourcesTagsSelector data={data} handleChange={handleChange} value={value1} />
    );
});    

it('select 1 item with logic change', () => {
    
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
        <SourcesTagsSelector data={data} handleChange={handleChange} value={value1} />
    );
    
    component.find('button.logic-or').first().simulate('click');
    component.find('button.logic-and').first().simulate('click');
    component.find('button.logic-not').first().simulate('click');
    
});    
    
it('select 2 items', () => {
    const handleChange = function(value) {
        expect(value).toEqual({ AND: [ 'Troll' ], OR: [ 'Aeronet.cz' ], NOT: [] });
    };
    
    const component = mount(
        <SourcesTagsSelector data={data} handleChange={handleChange} value={value2} />
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
        <SourcesTagsSelector data={data} handleChange={handleChange} value={value2} />
    );
    
    component.find('div.source button.logic-or').first().simulate('click');
    component.find('div.source button.logic-and').first().simulate('click');
    component.find('div.source button.logic-not').first().simulate('click');
    
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
        <SourcesTagsSelector data={data} handleChange={handleChange} value={value1} />
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
        <SourcesTagsSelector data={data} handleChange={handleChange} value={value2} />
    );
    component.find('svg.react-selectize-reset-button').first().simulate('click');
    
});

