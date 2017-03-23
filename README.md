This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).<br>
Refer to its [guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for a detailed description of common tasks.


## Table of Contents

- [Sources and Tags Selector](#sources-and-tags-selector)
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


## Sources and Tags Selector

Sources and Tags Selector is a multiple selector component written in [React](https://facebook.github.io/react/).
The component is based on [react-selectize](https://github.com/furqanZafar/react-selectize/).

Each selected option has a logic state: `OR` (initial), `AND` or `NOT` and the value of the selector is a 
JSON composed by the selected options and their assigned logic state:
```
{
  "AND": [item],
  "OR": [item],
  "NOT": [item]
}
```

As options are selected, they are removed from the menu and displayed among the selected items with corresponding logic state: 
* `OR` (green, initial state)
* `AND` (red)
* `NOT` (gray)

The state of the selected options can be changed by clicking on the button in their widget.
Options can be unselected by clicking on the `X` sign in their widget.

Options are added to `source` or `tag` groups:
* `source` groups are filtered by fulltext search upon typing in the multiselect control and only the filtered list of options are shown in the dropdown menu 
* `tag` groups are not filtered but always shown comletely
   
## Demo

Demo with sample configuration in [src/index.js](https://github.com/norama/selector/blob/master/src/index.js) can be seen [here](https://norama.github.io/selector).

## Install

```
npm install sources-tags-selector --save
```
Import component:

```
import SourcesTagsSelector from 'sources-tags-selector';
```

Import styles:

```
import '../node_modules/sources-tags-selector/lib/selector.css';
import '../node_modules/react-selectize/themes/default.css';
```

**Reference**

[Distributing React Components](http://krasimirtsonev.com/blog/article/distributing-react-components-babel-browserify-webpack-uglifyjs)


## Usage (jsx)

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/sources-tags-selector/lib/selector.css'
import '../node_modules/react-selectize/themes/default.css';

import SourcesTagsSelector from 'sources-tags-selector';

const data = [
    { 
        id: 'Sources',
        title: 'SOURCES',
        type: 'source',

        items: [
            {
                value: 'Aeronet.cz'
            },
            {
                value: 'ParlamentniListy.cz'
            }
        ]
        
    },  
    { 
        id: 'Tags',
        title: 'COLORS',
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

const value = { AND: [ 'red', 'green' ], NOT: [ 'blue' ] };

function handleChange(value) {
    console.log(JSON.stringify(value, undefined, 4));
}

ReactDOM.render(
    <SourcesTagsSelector data={data} handleChange={handleChange} value={value} placeholder='Select color' />,
    document.getElementById('root')
);
```

## Configuration

```html
<SourcesTagsSelector data={data} handleChange={handleChange} value={value} placeholder='Select color tags' />
```

### ```data``` - mandatory

JSON of grouped options, each group has the following structure (attributes are mandatory unless declared optional):

* **id**: unique identifier
* **title**: display title
* **type**: `source` or `tag` 
* **items**: list of elements:
  * **label**: displayed text (optional, default: value)
  * **value**: identifier, also used in the item lists of component value 
  * **icon**: link to icon image to be displayed in menu (optional, default: none)
  
### ```handleChange``` - optional (default: none)

Callback function for value change, accepts a single parameter with the current value in JSON:

```
{
  "AND": [item],
  "OR": [item],
  "NOT": [item]
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

### ```placeholder``` - optional (default: 'Select sources and tags')

Placeholder in the selected options widget.

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
    SourcesTagsSelector.js
    SourcesTagsSelector.test.js
    index.js
    selector.css
```

* `README.md`: this file
* `package.json`: npm project configuration file
* `node_modules/`: installed npm packages
* `public/`: HTML and resources for demo
* `index.js`: demo application 
* `SourcesTagsSelector.js`: selector component
* `selector.css`: selector styles
* `Filter.js`: filter configuration for `source` and `tag` groups
* `Logic.js`: logic state transition
* `MenuItem.js`: option in menu component
* `SelectedItem.js`: selected option with logic state component
* `__snapshots__/, *.test.js`: test files
