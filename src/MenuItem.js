import React, { Component } from 'react';
import _ from 'underscore';

class MenuItem extends Component {

	render() {
		return (
			<div className='flex-container'>
				{this.props.option.icon && 
				 <div className='menuitem-icon'><img src={this.props.option.icon} alt='#' width='16' height='16'/></div>} 
				<div className='menuitem-label'>{this.props.option.render ? this.props.option.render() : this.props.option.label}</div>
			</div>);
	}
}

export default MenuItem;