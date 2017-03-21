import React, { Component } from 'react';


class SelectedItem extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.handleLogicChange(this.props.item.value, this.next(this.props.item.logic));
    }
    
    next(logic) {
        switch (logic) {
            case 'OR': return 'AND';
            case 'AND': return 'NOT';
            case 'NOT': return 'OR';
            default: throw new RangeError('Unknown logic: ' + logic);
        }
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