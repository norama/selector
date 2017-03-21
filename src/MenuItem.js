import React, { Component } from 'react';

class MenuItem extends Component {

    render() {
        return (<span>{this.props.item.label}</span>);
    }
}

export default MenuItem;