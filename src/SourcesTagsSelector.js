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
        this.state = {selectedItems: [], item2logic: {}};
    }
    
    handleLogicChange(item, logic) {
        let item2logic = this.state.item2logic;
        item2logic[item.value] = logic;
        this.setState({
            item2logic: item2logic           
        }, () => {
            this.propagateValue();                    
        });
    }
    
    propagateValue() {
        this.props.handleChange(this.result());
    }
    
    result() {
        let result = {AND: [], OR: [], NOT: []};
        for (const item in this.state.item2logic) {
            const logic = this.state.item2logic[item];
            result[logic].push(item);
        }
        return result;
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
                    value: item.value
                }
            });
        }));
        
        const groupId2Type = this.props.data.reduce(function(map, group) {
            map[group.id] = group.type;
            return map;
        }, {});
  
        return (<MultiSelect
            groups = {groups}
            //groupsAsColumns = {true}
            options = {options}
            values = {this.state.selectedItems}
            onValuesChange = {function(selectedItems){
                self.setState({
                    selectedItems: selectedItems
                }, () => {
                    self.propagateValue();                    
                });
            }}
            
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
                return <div className = "source-option">
                    <MenuItem item={item} type={type} />
                </div>
            }}
            renderValue = {function(item){
                const type =  groupId2Type[item.groupId];
                return <div className = "removable-option">
                    <span className = "item"><SelectedItem item={item} type={type} handleLogicChange={self.handleLogicChange} /></span>
                    <span className = "x" onClick = {function(){
                        let item2logic = self.state.item2logic;
                        delete item2logic[item.value];
                        self.setState({
                            selectedItems: _.reject(self.state.selectedItems, function(option){
                                return option.value == item.value;
                            }),
                            item2logic: item2logic
                        }, () => {
                            self.propagateValue();
                        } );
                        
                    }}>x</span>
                </div>;
            }}
            placeholder = "Select sources and tags"
        />);
        
    }
    
    
}

export default SourcesTagsSelector;