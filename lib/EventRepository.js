var redis = require('then-redis');
var _ = require('lodash');

module.exports = EventRepository;

function EventRepository(config) {

    var prefix = 'eventlog:';
    var db = redis.createClient(config.redis);

    this.test = function(next) {
        next = _.once(next);
        setTimeout(function() {
            next(new Error('Unable to connect to %s', config.connectionUrl))
        }, 5000);
        db.connect().then(seal(next), next);
    }

    this.save = function(event, next) {
        var key = prefix + event.id;
        db.multi();
        db.hmset(key, event);
        db.expire(key, config.expiry);
        db.exec().then(seal(next), next);
    }

    this.list = function(next) {
        var events = [];
        db.keys(prefix + '*').then(function(keys) {
            _.map(keys, function(key) {
                db.hgetall(key).then(function(event) {
                    events.push(event);
                });
            });
        }).then(seal(next, events), next);
    }

    function seal() {
        var fn = Array.prototype.shift.apply(arguments);
        var args = Array.prototype.slice.apply(arguments);
        return function() {
            fn.apply(null, [null].concat(args));
        }
    }

}