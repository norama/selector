import React, { Component } from 'react';

class MenuItem extends Component {

    render() {
        return (
            <div style={{margin: '4px 4px 0px 4px'}}>
                {this.props.option.icon && 
                 <div style={{display: 'inline', marginRight: '5px', paddingTop: '5px'}}><img src={this.props.option.icon} alt='#' width='16' height='16'/></div>} 
                <div style={{display: 'inline', verticalAlign: 'top'}}>{this.props.option.label}</div>
            </div>);
    }
}

export default MenuItem;