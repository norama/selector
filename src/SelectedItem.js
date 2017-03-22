import React, { Component } from 'react';
import Logic from './Logic';

class SelectedItem extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.handleLogicChange(this.props.item.value, Logic.next(this.props.item.logic));
    }
    
    className(logic) {
        switch (logic) {
            case 'OR': return 'logic-or';
            case 'AND': return 'logic-and';
            case 'NOT': return 'logic-not';
            default: throw new RangeError('Unknown logic: ' + logic);
        }
    }

    render() {
        return (<button className={['item',  this.className(this.props.item.logic)].join(' ')} onClick={this.handleChange} title={this.props.item.logic}>{this.props.item.label}</button>);
    }
}

export default SelectedItem;