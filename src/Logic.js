class Logic {
    static next(logic) {
        switch (logic) {
            case 'OR': return 'AND';
            case 'AND': return 'NOT';
            case 'NOT': return 'OR';
            default: throw new RangeError('Unknown logic: ' + logic);
        }    
    }
}

export default Logic;