const Handerbars = require('handlebars');

module.exports = {
    sortable: (field, sort) => {
        console.log('sort ', sort);
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        }
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        }
        const icon = icons[sortType];
        const type = types[sortType];

        const href = Handerbars.escapeExpression(`?_sort&column=${field}&type=${type}`);
        const output = `<a href="${href}">
        <span class="${icon}"></span></a>`
        return new Handerbars.SafeString(output);
    }
}