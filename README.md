This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).<br>
Refer to its [guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for a detailed description of common tasks.


## Table of Contents

- [Stateful Options Selector](#stateful-options-selector)
- [Demo](#demo)
- [Install](#install)
- [Usage](#usage-jsx)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [Folder Structure](#folder-structure)


## Stateful Options Selector

Stateful Options Selector is a multiple selector component written in [React](https://facebook.github.io/react/),
where each selected option can have an associated user selected state. The set of possible states is configurable.
The component is based on [react-selectize](https://github.com/furqanZafar/react-selectize/).

The state of the selected options can be changed by clicking on the button in their widget.
Options can be unselected by clicking on the `X` sign in their widget.

Options can also be divided into option groups, each group having an ID and a display title.
   
## Demo

Demo with sample configuration in [src/index.js](https://github.com/norama/selector/blob/master/src/index.js) can be seen [here](https://norama.github.io/selector).

In this example each selected option has a logic state: `OR` (initial), `AND` or `NOT` and the value of the selector is a 
JSON composed by the selected options and their assigned states:
```
{
  "AND": [option],
  "OR": [option],
  "NOT": [option]
}
```

As options are selected, they are removed from the menu and displayed among the selected options with corresponding state: 
* `OR` (green, initial state)
* `AND` (red)
* `NOT` (gray)

Options are added to `source` or `tag` groups:
* `source` groups are filtered by fulltext search upon typing in the multiselect control and only the filtered list of options are shown in the dropdown menu 
* `tag` groups are not filtered but always shown comletely

## Install

```
npm install stateful-options-selector --save
```
Import component:

```
import StatefulOptionsSelector from 'stateful-options-selector';
```

Import styles:

```
import '../node_modules/stateful-options-selector/lib/selector.css';
import '../node_modules/stateful-options-selector/lib/states.css'
import '../node_modules/react-selectize/themes/default.css';
```

**Reference**

[Distributing React Components](http://krasimirtsonev.com/blog/article/distributing-react-components-babel-browserify-webpack-uglifyjs)


## Usage (jsx)

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/stateful-options-selector/lib/selector.css'
import '../node_modules/stateful-options-selector/lib/states.css'
import '../node_modules/react-selectize/themes/default.css';

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

const groups = [
	{ 
		id: 'sources',
		style: 'source',
		title: 'SOURCES',
		filter: 'full-text-search',
		count: 20,

		options: [
			{
				render: () => (<div className="custom-label">AERONET</div>),
				label: 'aeronet',
				value: 'Aeronet.cz'
			},
			{
				label: 'Parlamentni Listy',
				value: 'ParlamentniListy.cz'
			}
		]
		
	},  
	{ 
		id: 'tags',
		style: 'tag',
		title: 'COLORS',
		filter: 'none',

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

const value = {
	value: { tags: {and: [ 'red', 'green' ], not: [ 'blue' ] }},
	order: [ 'red', 'green', 'blue' ]
};

function handleChange(value) {
	console.log(JSON.stringify(value, undefined, 4));
}

ReactDOM.render(
	<StatefulOptionsSelector 
		groups={groups} 
		states={states}
		handleChange={handleChange} 
		value={value} 
		placeholder='Select color' 
		noResultsFound='No results'
	/>,
	document.getElementById('root')
);
```

## Configuration

```html
<StatefulOptionsSelector 
	groups={groups} 
	states={states}
	handleChange={handleChange} 
	value={value} 
	placeholder='Select color tags' 
	noResultsFound='No results'
/>
```

### ```groups``` - mandatory

JSON of grouped options, each group has the following structure (attributes are mandatory unless declared optional):

* **id**: unique group identifier
* **title**: display title (optional, default: none)
* **style**: style name for customization (`source` and `tag` is specified in selector.css, optional, default: `source`) 
* **filter**: filter to be used to filter options by label (`full-text-search` or `none`, optional, default: `full-text-search`)
* **count**: max. number of options shown in menu (optional, default: all options shown)
* **options**: list of elements:
  * **render**: rendering function for custom JSX (optional, used instead of **label** if specified)
  * **label**: displayed text if **render** is omitted, also used for filtering (whisper) 
               even if  **render** determines the displayed text (optional, default: value)
  * **value**: identifier, also used in the option lists of component value 
  * **icon**: link to icon image to be displayed in menu (optional, default: none)
  
### ```states``` - optional (default: {value: 'selected', label: 'selected'})

List of states, selected options change their states according to this configuration.
If omitted, options are considered stateless and a placeholder 'selected' state is used
as key of selected options list in the component value.

State attributes:

* **label**: displayed text in tooltip (optional, default: value)
* **value**: identifier, key in component value to group selected items of the same state 

  
### ```handleChange``` - optional (default: none)

Callback function for value change, accepts a single parameter with the current value in JSON:

```
{
  group1: {
	<state1>: [option],
	<state2>: [option],
	...
	<stateN>: [option]
  },
  group1: {
	<state1>: [option],
	<state2>: [option],
	...
	<stateN>: [option]
  },
  ...
  groupK: {
	<state1>: [option],
	<state2>: [option],
	...
	<stateN>: [option]
  }
}
```

in case of stateless options:

```
{
  group1: {
	selected: [option]
  },
  group2: {
	selected: [option]
  },
  ...
  groupK: {
	selected: [option]
  }
}
```

### ```value``` - optional (default: empty)

Initial value in JSON. 

Example:
```
{ 
  "AND": [ 'red', 'green' ], 
  "NOT": [ 'blue' ] 
}
```

in case of stateless options:

```
{
  selected: [ 'red', 'green' ]
}
```

### ```placeholder``` - optional (default: 'Select options')

Placeholder in the selected options widget.

### ```noResultsFound``` - optional (default: 'No results found')

Text shown in menu when no results found.

## Available Scripts

This section is based on the [available scripts](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#available-scripts) section of the [guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

After cloning / downloading this project, in the root directory you can run the scripts listed below.

### `npm start`

Runs the  [src/index.js](https://github.com/norama/selector/blob/master/src/index.js) demo app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section in [guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) about [running tests](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Folder Structure

```
selector/
  README.md
  package.json
  node_modules/
  public/
	img/
	index.html
	favicon.ico
  src/
	__snapshots__/
	Filter.js
	Logic.js
	MenuItem.js
	MenuItem.test.js
	SelectedItem.js
	SelectedItem.test.js
	StatefulOptionsSelector.js
	StatefulOptionsSelector.test.js
	index.js
	selector.css
```

* `README.md`: this file
* `package.json`: npm project configuration file
* `node_modules/`: installed npm packages
* `public/`: HTML and resources for demo
* `index.js`: demo application 
* `StatefulOptionsSelector.js`: selector component
* `selector.css`: selector styles
* `Filter.js`: filter configuration for `source` and `tag` groups
* `Logic.js`: logic state transition
* `MenuItem.js`: option in menu component
* `SelectedItem.js`: selected option with logic state component
* `__snapshots__/, *.test.js`: test files
