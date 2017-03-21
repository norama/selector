import React, { Component } from 'react';
import { MultiSelect } from 'react-selectize';
import _ from 'underscore';
import MenuItem from './MenuItem';
import SelectedItem from './SelectedItem';
import Filter from './Filter';


class SourcesTagsSelector extends Component {
    
    constructor(props) {
        super(props);
        this.handleLogicChange = this.handleLogicChange.bind(this);
        this.state = {selectedItems: []};
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
        
        const groups = this.props.data.map(function(group) {
            return {
                groupId: group.id,
                title: group.title
            }
        });
        
        const options = [].concat.apply([], this.props.data.map(function(group) {
            return group.items.map(function(item) {
                return {
                    groupId: group.id,
                    label: item.label,
                    value: item.value,
                    logic: 'OR'
                }
            });
        }));
        
        const groupId2Type = this.props.data.reduce(function(map, group) {
            map[group.id] = group.type;
            return map;
        }, {});
  
        return (<MultiSelect
            ref={(input) => { this.multiSelectInstance = input; }} 
            className = 'multiselect'
            groups = {groups}
            //groupsAsColumns = {true}
            options = {options}
            values = {this.state.selectedItems}
            onValuesChange = {function(selectedItems) {
                
                self.setState((prevState, props) => {
                    return { 
                        selectedItems: selectedItems
                    };
                }, () => {
                    self.propagateValue();                    
                });
            }}
 
            closeOnSelect = {false}
            
            // filterOptions :: [Item] -> [Item] -> String -> [Item]   
            filterOptions = {function(options, values, search){              
                return _.chain(options)
                    .reject(function(option){
                            return self.state.selectedItems.map(function(item){
                                return item.value
                            }).indexOf(option.value) > -1
                        })
                    .filter(function(option) {
                        const type =  groupId2Type[option.groupId];
                        return Filter[type](option.label, search);
                    })
                    .value();
            }}
            

            renderOption = {function(item){
                const type =  groupId2Type[item.groupId];
                return <div className = {['menu-option', type.toLowerCase()].join(' ')} >
                    <div className={type}>
                        <MenuItem item={item} type={type} />
                    </div>
                </div>
            }}
            renderValue = {function(item){
                const type =  groupId2Type[item.groupId];
                return <div className = "selected-option">
                    <div className={type}>
                    <span className = "item"><SelectedItem item={item} type={type}  handleLogicChange={self.handleLogicChange} /></span>
                    <span className = "x" onClick = {function(){
                        
                        self.setState((prevState, props) => {
                            return { 
                                selectedItems: _.reject(self.state.selectedItems,         function(option) {
                                        return option.value == item.value;
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
            placeholder = "Select sources and tags"
        />);
        
    }
    
    
}

export default SourcesTagsSelector;