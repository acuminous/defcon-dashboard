var redis = require("redis");
var async = require("async");
var uuid = require('uuid');

module.exports = EventRepository;

function EventRepository(config) {

    var client = redis.createClient(config.redis.port, config.redis.host, config.redis.options);
    var eventKeyPrefix = 'defcon:eventlog:data:';
    var eventIndexKey = 'defcon:eventlog:index';
    var maxEvents = config.pages * config.pageSize;   
    var one_week = 7 * 24 * 60 * 60;
    var retries = 10    
    var self = this;

    this.init = function(next) {
        setTimeout(function() {
            client.select(config.db || 0, function(err) {
                if (err && retries) return retries-- && self.init(next);
                if (err) return next(err);
                client.info(next);            
            });        
        }, 100);
    }

    this.save = function(event, next) {
        var eventKey = eventKeyPrefix + uuid.v1();
        var multi = client.multi();
        multi.hmset(eventKey, event);
        multi.lpush(eventIndexKey, eventKey);
        multi.exec(function(err) {
            if (err) return next(err);
            self.reap(next);
        });        
    }

    this.list = function(next) {
        client.lrange(eventIndexKey, 0, maxEvents - 1, function(err, eventKeys) {
            if (err) return next(err);
            async.map(eventKeys, client.hgetall.bind(client), function(err, events) {
                next(err, events);
            });            
        }); 
    }

    this.reap = function(next) {        
        client.lrange(eventIndexKey, maxEvents, -1, function(err, eventKeys) {
            async.each(eventKeys, function(eventKey, callback) {
                var multi = client.multi();
                multi.lrem(eventIndexKey, -1, eventKey);
                multi.del(eventKey);
                multi.exec();
            }, next);
        })
    };
}