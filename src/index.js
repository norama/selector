import React from 'react';
import ReactDOM from 'react-dom';
import './selector.css'
import '../node_modules/react-selectize/themes/default.css';
import $ from 'jquery';


import SourcesTagsSelector from './SourcesTagsSelector';

const data1 = [
    { 
        id: 'MainSources',
        title: 'SOURCES',
        type: 'source',

        items: [
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

        items: [
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
    <SourcesTagsSelector data={data1} handleChange={handleChange1} />,
    document.getElementById('root1')
);

const data2 = [
    { 
        id: 'Colors',
        title: 'COLOR TAGS',
        type: 'tag',

        items: [
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

const value2 = { AND: [ 'red' ], NOT: [ 'blue' ] };


function handleChange2(value) {
    $('#value2').html(JSON.stringify(value, undefined, 4));
}

ReactDOM.render(
    <SourcesTagsSelector data={data2} handleChange={handleChange2} value={value2} placeholder='Select color tags' />,
    document.getElementById('root2')
);