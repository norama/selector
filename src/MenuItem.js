import React, { Component } from 'react';

class MenuItem extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (<span>{this.props.item.label}</span>);
    }
}

export default MenuItem;