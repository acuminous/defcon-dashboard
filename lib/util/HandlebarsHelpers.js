var moment = require('moment');

module.exports = Helpers;

function Helpers() {

    this.fromNow = function(date) {
        return date ? moment(date).fromNow() : '';
    };

    this.dateFormat = function(date) {
        return date ? moment(date).format('dddd Do MMMM YYYY, h:mma') : '';
    }

    this.friendly = function(text) {
        return text ? text.replace(/[\W_]+/g, ' ') : '';
    }
}