import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import StatefulOptionsSelector, { limitOptions } from './StatefulOptionsSelector';

Enzyme.configure({ adapter: new Adapter() });

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

const groups = [
	{
		id: 'Sources',
		title: 'SOURCES',

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
		id: 'Tags',
		title: 'TAGS',

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

const value0 = {
	value: { Sources: { selected: [ 'Aeronet.cz' ] } },
};

const value1 = {
	value: { Sources: { OR: [ 'Aeronet.cz' ] } },
};

const value2 = { 
	value: { Sources: { OR: [ 'Aeronet.cz' ] }, Tags: { AND: [ 'Troll' ] } },
	order: [ 'Aeronet.cz', 'Troll' ]
};


it('renders without data', () => {
	const div = document.createElement('div');
	ReactDOM.render(<StatefulOptionsSelector />, div);
});

it('renders with data', () => {
	const div = document.createElement('div');
	ReactDOM.render(<StatefulOptionsSelector groups={groups} states={states} />, div);
});

it('no states', () => {
	const handleChange = function(value) {
		expect(value.value).toEqual({Sources: {selected: ["Aeronet.cz"]}, Tags: {selected: []}});
		expect(value.order).toEqual(["Aeronet.cz"]);
	};

	const component = mount(
		<StatefulOptionsSelector groups={groups} handleChange={handleChange} value={value0} />
	);

	component.find('div.item.stateless').first().simulate('click');
	component.find('div.item.stateless').first().simulate('click');
	component.find('div.item.stateless').first().simulate('click');
});

it('select 1 item', () => {
	const handleChange = function(value) {
		expect(value.value.Sources).toEqual({ AND: [], OR: [ 'Aeronet.cz' ], NOT: [] });
	};

	const component = mount(
		<StatefulOptionsSelector groups={groups} handleChange={handleChange} value={value1} states={states} />
	);
});

it('select 1 item with state change', () => {

	let counter = 0;
	const handleChange = function(value) {
		switch (counter % 3) {
			case 0: expect(value.value.Sources).toEqual({ AND: [], OR: [ 'Aeronet.cz' ], NOT: [] }); break;
			case 1: expect(value.value.Sources).toEqual({ AND: [ 'Aeronet.cz' ], OR: [], NOT: [] }); break;
			case 2: expect(value.value.Sources).toEqual({ AND: [], OR: [], NOT: [ 'Aeronet.cz' ] }); break;
		};
		counter++;
	};

	const component = mount(
		<StatefulOptionsSelector groups={groups} handleChange={handleChange} value={value1} states={states} />
	);

	component.find('.item').first().simulate('click');
	component.find('.item').first().simulate('click');
	component.find('.item').first().simulate('click');

});

it('select 2 items', () => {
	const handleChange = function(value) {
		expect(value.value).toEqual({ Sources: { AND: [], OR: [ 'Aeronet.cz' ], NOT: [] }, Tags: { AND: [ 'Troll' ], OR: [], NOT: [] }});
	};

	const component = mount(
		<StatefulOptionsSelector groups={groups} handleChange={handleChange} value={value2} states={states} />
	);
});

it('select 2 items with state change', () => {

	let counter = 0;
	const handleChange = function(value) {

		switch (counter % 3) {
			case 0: expect(value.value).toEqual({ Sources: { AND: [], OR: ['Aeronet.cz'], NOT: [] }, Tags: { AND: [ 'Troll' ], OR: [], NOT: [] }}); break;
			case 1: expect(value.value).toEqual({ Sources: { AND: ['Aeronet.cz'], OR: [], NOT: [] }, Tags: { AND: [ 'Troll' ], OR: [], NOT: [] }}); break;
			case 2: expect(value.value).toEqual({ Sources: { AND: [], OR: [], NOT: ['Aeronet.cz'] }, Tags: { AND: [ 'Troll' ], OR: [], NOT: [] }}); break;
		};
		counter++;
	};

	const component = mount(
		<StatefulOptionsSelector groups={groups} handleChange={handleChange} value={value2} states={states} />
	);

	component.find('.item').first().simulate('click');
	component.find('.item').first().simulate('click');
	component.find('.item').first().simulate('click');

});

it('unselect item with x', () => {
	let counter = 0;
	const handleChange = function(value) {
		switch (counter) {
			case 0: expect(value.value.Sources).toEqual({ AND: [], OR: [ 'Aeronet.cz' ], NOT: [] }); break;
			case 1: expect(value.value.Sources).toEqual({ AND: [], OR: [], NOT: [] }); break;
		};
		counter++;
	};

	const component = mount(
		<StatefulOptionsSelector groups={groups} handleChange={handleChange} value={value1} states={states} />
	);
	component.find('.x').first().simulate('click');

});


it('unselect all', () => {
	let counter = 0;
	const handleChange = function(value) {
	switch (counter) {
			case 0: expect(value.value).toEqual({ Sources: { AND: [], OR: ['Aeronet.cz'], NOT: [] }, Tags: { AND: [ 'Troll' ], OR: [], NOT: [] }}); break;
			case 1: expect(value.value).toEqual({ Sources: { AND: [], OR: [], NOT: [] }, Tags: { AND: [], OR: [], NOT: [] }}); break;
		};
		counter++;
	};

	const component = mount(
		<StatefulOptionsSelector groups={groups} handleChange={handleChange} value={value2} states={states} />
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

	const limited = limitOptions(options, {'g1': 2, 'g2': 2});

	expect(limited).toEqual([
		{ value: 'opt11', groupId: 'g1' },
		{ value: 'opt12', groupId: 'g1' },
		{ value: '...', label: '...', selectable: false, groupId: 'g1' },
		{ value: 'opt21', groupId: 'g2' }
	]);
});
