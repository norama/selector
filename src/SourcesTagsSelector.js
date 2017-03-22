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
        this.init();
    }
    
    init() {
        
        const data = this.props.data ? this.props.data : [];
        
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
                    label: item.label,
                    value: item.value,
                    icon: item.icon,
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
    
            className = 'multiselect'
            
            groups = {this.groups}
            
            //open = {true}

            //groupsAsColumns = {true}
            
            options = {this.options}
            
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
                        const type =  self.groupId2Type[option.groupId];
                        return Filter[type](option.label, search);
                    })
                    .value();
            }}
            

            renderOption = {function(item){
                const type =  self.groupId2Type[item.groupId];
                return <div className = {['menu-option', type.toLowerCase()].join(' ')} >
                    <div className={type}>
                        <MenuItem item={item} />
                    </div>
                </div>
            }}
            
            renderValue = {function(item){
                const type =  self.groupId2Type[item.groupId];
                return <div className = "selected-option">
                    <div className={type}>
                    <span className = "item"><SelectedItem item={item} handleLogicChange={self.handleLogicChange} /></span>
                    <span className = "x" onClick = {function(){
                        
                        self.setState((prevState, props) => {
                            return { 
                                selectedItems: _.reject(self.state.selectedItems,               function(option) {
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
            
            placeholder = { this.props.placeholder ? this.props.placeholder : "Select sources and tags" }
        />);
        
    }
    
}

export default SourcesTagsSelector;