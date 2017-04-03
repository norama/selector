const Filter = {
    'text': textFilter,
    'none': allFilter
}

function textFilter(text, search) {
    return text.toLowerCase().indexOf(search.toLowerCase()) > -1;
}

function allFilter(text, search) {
    return true;
}

export default Filter;