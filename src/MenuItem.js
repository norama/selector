import React, { Component } from 'react';

class MenuItem extends Component {

    render() {
        return (<div>
                {this.props.option.icon && 
                 <div style={{float: 'left', marginRight: '5px'}}><img src={this.props.option.icon} alt='#' width='16' height='16'/></div>
                } <div>{this.props.option.label}</div>
               </div>);
    }
}

export default MenuItem;