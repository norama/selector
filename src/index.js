import React from 'react';
import ReactDOM from 'react-dom';
import './selector.css'
import '../node_modules/react-selectize/themes/default.css';
import $ from 'jquery';


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
            },
            {
                label: 'Novinky.cz',
                value: 'Novinky.cz'
            },
            {
                label: 'Blesk.cz',
                value: 'Blesk.cz'
            },
            {
                label: 'Lidovky.cz',
                value: 'Lidovky.cz'
            },
            {
                label: 'Ihned.cz',
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
                label: 'CzechNews',
                value: 'CzechNews',
                icon: 'img/blue.png'
            },
            {
                label: 'Troll',
                value: 'Troll',
                icon: 'img/red.png'
            },
            {
                label: 'Propaganda',
                value: 'Propaganda',
                icon: 'img/green.png'
            }
        ]
        
    }
];

function handleChange(value) {
    $('#value').html(JSON.stringify(value, undefined, 4));
}

let component = ReactDOM.render(
    <SourcesTagsSelector data={data} handleChange={handleChange} />,
    document.getElementById('root')
);

