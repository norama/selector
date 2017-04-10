import React, { Component } from 'react';
import _ from 'lodash';
import MenuItem from './MenuItem';

class SelectedItem extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.handleOptionStateChange(this.props.option);
	}

	render() {
		const stateless = (this.props.option.state.value === 'selected');
		return (<div disabled={stateless}
				className={['item', stateless ? 'stateless' : 'stateful', 'selected'].join(' ')}
				onClick={this.handleChange}
				title={this.props.option.state.label}>

					<MenuItem option={this.props.option} />

				</div>);
	}
}

export function selectedOptionStateClassName(option) {
	return _.camelCase(`${option.state.value}`);
}

export default SelectedItem;
