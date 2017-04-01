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
        this.init();
    }
    
    init() {
        
        const self = this;
        
        let data = this.props.data ? this.props.data : [];
        
        this.optionStates = new OptionStates(this.props.states);
        
        if (this.props.maxGroupOptionsCount) {
            data = data.map(function(group) {
                group.options.push(limitSignOption(group.id));
                return group;
            });
        }
        
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
        
        this.groupId2Type = data.reduce(function(map, group) {
            map[group.id] = group.type;
            return map;
        }, {});
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
            for (let optionStateValue in this.props.value) {
                for (let optionValue of this.props.value[optionStateValue]) {
                    let option = this.options.find(function(option) { 
                        return option.value === optionValue; 
                    });
                    option = JSON.parse(JSON.stringify(option)); // clone
                    option.state = this.optionStates.state(optionStateValue);
                    options.push(option);
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
        return this.state.selectedOptions.reduce(function(map, selectedOption) {
            map[selectedOption.state.value].push(selectedOption.value);
            return map;
        }, this.emptyValue());
    }
    
    emptyValue() {
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
                        const type =  self.groupId2Type[option.groupId];
                        return Filter[type](option.label, search);
                    })
                    .value();
                return limitOptions(filteredOptions, self.props.maxGroupOptionsCount);
            }}
            

            renderOption={function(option){
                const type = self.groupId2Type[option.groupId];
                const optionClassName = isLimitSignOption(option) ? 'limit-sign' : 'selectable';
                return <div className={['menu-option', type.toLowerCase(), optionClassName].join(' ')} >
                    <div className={[type.toLowerCase(), optionClassName].join(' ')}>
                        <MenuItem option={option} />
                    </div>
                </div>
            }}
            
            renderValue={function(option){
                const type = self.groupId2Type[option.groupId];
                return <div className="selected-option">
                    <div className={type}>
                    <span><SelectedItem option={option} handleOptionStateChange={self.handleOptionStateChange} /></span>
                    <span className="x" onClick={function(){
                        
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
                        
                    }}>x</span>
                    </div>
                </div>;
            }}
            
            placeholder={ this.props.placeholder ? this.props.placeholder : "Select options" }
        />);
        
    }
    
}

export function limitOptions(options, maxGroupOptionsCount) {
    if (maxGroupOptionsCount && maxGroupOptionsCount < options.length) {
        let groupId2options = _.groupBy(options, 'groupId');
        _.each(groupId2options, (groupOptions, groupId) => {
            if (groupId2options[groupId].length > maxGroupOptionsCount) {
                groupId2options[groupId] = _.chain(groupId2options[groupId])
                                    .slice(0, maxGroupOptionsCount)
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