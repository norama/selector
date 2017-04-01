import React, { Component } from 'react';
import { MultiSelect } from 'react-selectize';
import _ from 'underscore';
import MenuItem from './MenuItem';
import SelectedItem from './SelectedItem';
import Filter from './Filter';

class StatefulOptionsSelector extends Component {
    
    constructor(props) {
        super(props);
        this.handleLogicChange = this.handleLogicChange.bind(this);
        this.state = {selectedItems: []};
        this.init();
    }
    
    init() {
        
        let data = this.props.data ? this.props.data : [];
        if (this.props.maxGroupOptionsCount) {
            data = data.map(function(group) {
                group.items.push(limitSignOption(group.id));
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
            return group.items.map(function(item) {
                return {
                    groupId: group.id,
                    label: item.label ? item.label : item.value,
                    value: item.value,
                    icon: item.icon,
                    selectable: item.selectable,
                    logic: 'OR'
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
            selectedItems: this.value2items()
        }, () => {
            this.propagateValue();  
        });
    }
    
    value2items() {
        let items = [];
        if (this.props.value) {
            for (let logic in this.props.value) {
                for (let itemValue of this.props.value[logic]) {
                    let item = this.options.find(function(option) { 
                        return option.value === itemValue; 
                    });
                    item = JSON.parse(JSON.stringify(item)); // clone
                    item.logic = logic;
                    items.push(item);
                }
            }
        }
        return items;
    }
    
    handleLogicChange(value, logic) {
        this.setState((prevState, props) => {
            let selectedItems = prevState.selectedItems.map(function(selectedItem) {
                if (selectedItem.value === value) {
                    selectedItem.logic = logic;
                }
                return selectedItem;
            });
            return {
                selectedItems: selectedItems,
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
        return this.state.selectedItems.reduce(function(map, selectedItem) {
            map[selectedItem.logic].push(selectedItem.value);
            return map;
        }, {AND: [], OR: [], NOT: []});
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
            
            values={this.state.selectedItems}
            
            onValuesChange={function(selectedItems) {
                
                self.setState((prevState, props) => {
                    return { 
                        selectedItems: selectedItems
                    };
                }, () => {
                    self.propagateValue();                    
                });
            }}
 
            closeOnSelect={false}
            
            // filterOptions :: [Item] -> [Item] -> String -> [Item]   
            filterOptions={function(options, values, search){              
                let filteredOptions = _.chain(options)
                    .reject(function(option){
                            return self.state.selectedItems.map(function(item){
                                return item.value
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
            

            renderOption={function(item){
                const type = self.groupId2Type[item.groupId];
                const optionClassName = isLimitSignOption(item) ? 'limit-sign' : 'selectable';
                return <div className={['menu-option', type.toLowerCase(), optionClassName].join(' ')} >
                    <div className={[type.toLowerCase(), optionClassName].join(' ')}>
                        <MenuItem item={item} />
                    </div>
                </div>
            }}
            
            renderValue={function(item){
                const type = self.groupId2Type[item.groupId];
                return <div className="selected-option">
                    <div className={type}>
                    <span className="item"><SelectedItem item={item} handleLogicChange={self.handleLogicChange} /></span>
                    <span className="x" onClick={function(){
                        
                        self.setState((prevState, props) => {
                            return { 
                                selectedItems: _.reject(self.state.selectedItems, 
                                    function(option) {
                                        return option.value === item.value;
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