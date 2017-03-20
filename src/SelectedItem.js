import React, { Component } from 'react';


class SelectedItem extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { logic: 'OR' };
    }
    
    componentDidMount() {
        this.props.handleLogicChange(this.props.item, this.state.logic);
    }
    
    handleChange(e) {
        e.preventDefault();
        this.setState((prevState, props) => {
            const logic = this.next(prevState.logic);
            this.props.handleLogicChange(this.props.item, logic);
            return { logic: logic };
        });
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
    
    logic() {
        return this.state.logic;
    }
    

    render() {
        return (<button className={['item', 'selected-item', this.className(this.state.logic)].join(' ')} onClick={this.handleChange}>{this.props.item.label}</button>);
    }
}

export default SelectedItem;