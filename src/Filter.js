const Filter = {
    'Source': textFilter,
    'Tag': allFilter
}

function textFilter(text, search) {
    return text.toLowerCase().indexOf(search.toLowerCase()) > -1;
}

function allFilter(text, search) {
    return true;
}

export default Filter;