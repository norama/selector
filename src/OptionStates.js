import _ from 'underscore';

class OptionStates {
    
    constructor(states) {
        this.states = states ? 
            states.map((state) => 
                ({ 
                    value: state.value, 
                    label: state.label ? state.label : state.value
                })) : 
            [{ value: 'selected', label: 'selected' }];
        
        this.state2index = this.states.reduce((map, state, index) => { 
            map[state.value] = index; 
            return map; 
        }, {});
    }
    
    first() {
        return this.states[0];
    }
    
    next(state) {
        if (!_.has(this.state2index, state.value)) {
            throw new RangeError('Unknown state: ' + state.value);
        }
        const index = (this.state2index[state.value] + 1) % this.states.length;
        return this.states[index];
    }
    
    state(value) {
        if (!_.has(this.state2index, value)) {
            throw new RangeError('Unknown state: ' + value);
        }
        return this.states[this.state2index[value]];
    }
    
    values() {
        return this.states.reduce((values, state) => {
            values.push(state.value);
            return values;
        }, []);
    }
}

export default OptionStates;