import React, { Component } from 'react';
import _ from 'lodash';


class SelectedItem extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.handleOptionStateChange(this.props.option);
    }
    
    className() {
        return _.camelCase(`${this.props.option.state.value}`);
    }

    render() {
        const stateless = (this.props.option.state.value === 'selected');
        return (<button disabled={stateless} 
                className={['item',  this.className(), stateless ? 'stateless' : 'stateful'].join(' ')} 
                onClick={this.handleChange} 
                title={this.props.option.state.label}>
                    {this.props.option.label}
                </button>);
    }
}

export default SelectedItem;