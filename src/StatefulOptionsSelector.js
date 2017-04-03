import React, { Component } from 'react';
import { MultiSelect } from 'react-selectize';
import _ from 'underscore';
import MenuItem from './MenuItem';
import SelectedItem from './SelectedItem';
import Filter from './Filter';
import OptionStates from './OptionStates';

class StatefulOptionsSelector extends Component {

    constructor(props) {
        super(props);
        this.handleOptionStateChange = this.handleOptionStateChange.bind(this);
        this.state = {selectedOptions: []};
        this.init(props);
    }

    init(props) {

        const self = this;

        let data = props.groups ? props.groups : [];

        this.optionStates = new OptionStates(props.states);

        data = data.map(function(group) {
            if (group.count) {
                let newGroup = _.clone(group);
                newGroup.options = _.clone(group.options);
                newGroup.options.push(limitSignOption(group.id));
                return newGroup;
            } 
            return group;
        });

        this.groups = data.map(function(group) {
            return {
                groupId: group.id,
                title: group.title
            }
        });

        this.options = [].concat.apply([], data.map(function(group) {
            return group.options.map(function(option) {
                return {
                    groupId: group.id,
                    label: option.label ? option.label : option.value,
                    value: option.value,
                    icon: option.icon,
                    selectable: option.selectable,
                    state: self.optionStates.first()
                }
            });
        }));
        
        this.groupId2Style = data.reduce(function(map, group) {
            map[group.id] = group.style ? group.style : 'source';
            return map;
        }, {});
        
        this.groupId2Filter = data.reduce(function(map, group) {
            map[group.id] = group.filter && Filter[group.filter] ? Filter[group.filter] : Filter['none'];
            return map;
        }, {});
        
        this.groupId2Count = data.reduce(function(map, group) {
            if (group.count) {
                map[group.id] = group.count; 
            }
            return map;
        }, {});
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }

    componentDidMount() {
        this.setState({
            selectedOptions: this.value2options()
        }, () => {
            this.propagateValue();
        });
    }

    value2options() {
        let options = [];
        if (this.props.value) {
            for (let groupId in this.props.value) {
                for (let optionStateValue in this.props.value[groupId]) {
                    for (let optionValue of this.props.value[groupId][optionStateValue]) {
                        let option = this.options.find(function(option) {
                            return option.value === optionValue && option.groupId === groupId;
                        });
                        option = JSON.parse(JSON.stringify(option)); // clone
                        option.state = this.optionStates.state(optionStateValue);
                        options.push(option);
                    }
                }
            }
        }
        return options;
    }

    handleOptionStateChange(option) {
        const self = this;
        this.setState((prevState, props) => {
            let selectedOptions = prevState.selectedOptions.map(function(selectedOption) {
                if (selectedOption.value === option.value) {
                    selectedOption.state = self.optionStates.next(option.state);
                }
                return selectedOption;
            });
            return {
                selectedOptions: selectedOptions,
            };
        }, () => {
            this.multiSelectInstance.focus();
            this.propagateValue();
        });
    }

    propagateValue() {
        if (this.props.handleChange) {
            this.props.handleChange(this.result());
        }
    }

    result() {
        console.dir(this.state.selectedOptions);
        return this.state.selectedOptions.reduce(function(map, selectedOption) {
            map[selectedOption.groupId][selectedOption.state.value].push(selectedOption.value);
            return map;
        }, this.emptyValue());
    }
    
    emptyValue() {
        return this.groups.reduce((map, group) => {
            map[group.groupId] = this.emptyStateValue();
            return map;
        }, {});
    }

    emptyStateValue() {
        return this.optionStates.values().reduce((map, stateValue) => {
            map[stateValue] = [];
            return map;
        }, {})
    }

    render() {
        const self = this;

        return (<MultiSelect
            ref={(input) => { this.multiSelectInstance = input; }}

            className='multiselect'

            groups={this.groups}

            //open = {true}

            //groupsAsColumns = {true}

            options={this.options}

            values={this.state.selectedOptions}

            onValuesChange={function(selectedOptions) {

                self.setState({
                    selectedOptions: selectedOptions
                }, () => {
                    self.propagateValue();
                });
            }}

            closeOnSelect={false}

            // filterOptions :: [Item] -> [Item] -> String -> [Item]
            filterOptions={function(options, values, search) {
                let filteredOptions = _.chain(options)
                    .reject(function(option){
                            return self.state.selectedOptions.map(function(selectedOption){
                                return selectedOption.value
                            }).indexOf(option.value) > -1 ||
                                isLimitSignOption(option);
                        })
                    .filter(function(option) {
                        return self.groupId2Filter[option.groupId](option.label, search);
                    })
                    .value();
                return limitOptions(filteredOptions, self.groupId2Count);
            }}


            renderOption={function(option){
                const generalOptionClassName = isLimitSignOption(option) ? 'limit-sign' : 'selectable';
                const specificOptionClassName = self.groupId2Style[option.groupId];
                return (<div className='menu-option' >
                        <div className={[generalOptionClassName, specificOptionClassName].join(' ')}>
                        <MenuItem option={option} />
                        </div>
                    </div>);
            }}

            renderValue={function(option){
                const specificOptionClassName = self.groupId2Style[option.groupId];
                return (<div className="selected-option">
                    <div className={specificOptionClassName}>
                    <table><tbody><tr><td><SelectedItem option={option} handleOptionStateChange={self.handleOptionStateChange} /></td>
                    <td className="x" onClick={function(){

                        self.setState((prevState, props) => {
                            return {
                                selectedOptions: _.reject(self.state.selectedOptions,
                                    function(selectedOption) {
                                        return option.value === selectedOption.value;
                                    })
                            };
                        }, () => {
                            self.multiSelectInstance.focus();
                            self.propagateValue();
                        } );

                    }}>x</td></tr></tbody></table>
                </div>
                </div>);
            }}

            placeholder={ this.props.placeholder ? this.props.placeholder : "Select options" }

            renderNoResultsFound={function() {
                return (<div className='no-results-found'>{self.props.noResultsFound ? self.props.noResultsFound : 'No results found'}</div>);
            }}
        />);

    }

}

export function limitOptions(options, groupId2Count) {
    if (groupId2Count && !_.isEmpty(groupId2Count)) {
        let groupId2options = _.groupBy(options, 'groupId');
        _.each(groupId2options, (groupOptions, groupId) => {
            const count = groupId2Count[groupId];
            if (count && groupId2options[groupId].length > count) {
                groupId2options[groupId] = _.chain(groupId2options[groupId])
                                    .slice(0, count)
                                    .push(limitSignOption(groupId))
                                    .value();
            }
        });
        options = _.flatten(_.values(groupId2options));
    }

    return options;
}

function limitSignOption(groupId) {
    return {value: '...', label: '...', groupId: groupId, selectable: false};
}

function isLimitSignOption(option) {
    return option.value === '...';
}

export default StatefulOptionsSelector;
