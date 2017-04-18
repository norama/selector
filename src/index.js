import React from 'react';
import ReactDOM from 'react-dom';
import './selector.css'
import './states.css'
import '../node_modules/react-selectize/themes/default.css';
import $ from 'jquery';


import StatefulOptionsSelector from './StatefulOptionsSelector';

const states = [
	{
		value: 'or',
		label: 'OR'
	},
	{
		value: 'and',
		label: 'AND'
	},
	{
		value: 'not',
		label: 'NOT'
	}
];

const groups1 = [
	{
		id: 'sources',
		title: 'SOURCES',
		count: 3,

		options: [
			{
				value: 'Aeronet.cz'
			},
			{
				value: 'ParlamentniListy.cz'
			},
			{
				value: 'Novinky.cz'
			},
			{
				value: 'Blesk.cz'
			},
			{
				value: 'Lidovky.cz'
			},
			{
				value: 'Ihned.cz'
			},
		]

	},

	{
		id: 'tags',
		title: 'TAGS',
		style: 'source',
		filter: 'none',

		options: [
			{
				value: 'CzechNews',
				icon: 'img/blue.png'
			},
			{
				value: 'Troll',
				icon: 'img/red.png'
			},
			{
				value: 'Propaganda',
				icon: 'img/green.png'
			}
		]

	}
];


function handleChange1(value) {
	$('#value1').html(JSON.stringify(value, undefined, 4));
}

ReactDOM.render(
	<StatefulOptionsSelector
		groups={groups1}
		states={states}
		handleChange={handleChange1}
		placeholder=''
	/>,
	document.getElementById('root1')
);

const groups2 = [
	{
		id: 'tags',
		style: 'tag',

		options: [
			{
				label: 'Red',
				value: 'red',
				icon: 'img/red.png'
			},
			{
				label: 'Green',
				value: 'green',
				icon: 'img/green.png'
			},
			{
				label: 'Blue',
				value: 'blue',
				icon: 'img/blue.png'
			}
		]

	}
];

const value2 = { 
	value: { tags: { and: [ 'red' ], not: [ 'blue' ] } },
	order: [ 'blue', 'red' ]
};


function handleChange2(value) {
	$('#value2').html(JSON.stringify(value, undefined, 4));
}

ReactDOM.render(
	<StatefulOptionsSelector
		groups={groups2}
		states={states}
		handleChange={handleChange2}
		value={value2}
		placeholder='Select color tags'
		noResultsFound='NO RESULTS!'
		open={true}
	/>,
	document.getElementById('root2')
);
