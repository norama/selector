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

const data1 = [
    { 
        id: 'MainSources',
        title: 'SOURCES',
        type: 'source',

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
        id: 'MainTags',
        title: 'TAGS',
        type: 'tag',

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
        data={data1} 
        states={states} 
        handleChange={handleChange1} 
        maxGroupOptionsCount={3} 
    />,
    document.getElementById('root1')
);

const data2 = [
    { 
        id: 'Colors',
        type: 'tag',

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

const value2 = { and: [ 'red' ], not: [ 'blue' ] };


function handleChange2(value) {
    $('#value2').html(JSON.stringify(value, undefined, 4));
}

ReactDOM.render(
    <StatefulOptionsSelector 
        data={data2} 
        states={states} 
        handleChange={handleChange2} 
        value={value2} 
        placeholder='Select color tags' 
    />,
    document.getElementById('root2')
);