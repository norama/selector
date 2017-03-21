import React, { Component } from 'react';

class MenuItem extends Component {

    render() {
        return (<div>
                {this.props.item.icon && 
                 <div style={{float: 'left', marginRight: '5px'}}><img src={this.props.item.icon} alt='#' width='16' height='16'/></div>
                } <div>{this.props.item.label}</div>
               </div>);
    }
}

export default MenuItem;