import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import { MultiSelect } from 'react-selectize';
import './index.css';
import '../node_modules/react-selectize/themes/default.css';

import CustomMultiSelect from './CustomMultiSelect';

//ReactDOM.render(
//  <App />,
//  document.getElementById('root')
//);


function Form(props) {

        var self = this, 
            options = ["apple", "mango", "grapes", "melon", "strawberry"].map(function(fruit){
                return {label: fruit, value: fruit}
            });
        return (<MultiSelect options = {options} placeholder = 'Select fruits' />);

}

ReactDOM.render(
  <CustomMultiSelect />,
  document.getElementById('root')
);
