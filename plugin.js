var express = require('express');
var packageJson = require('./package.json');
var path = require('path');
var HandlebarsHelpers = require('./lib/util/HandlebarsHelpers');
var EventRepository = require('./lib/EventRepository')
var _ = require('lodash');

module.exports = plugin;

function plugin(defcon, app, config, next) {

    var repository = new EventRepository(config.repository)
    var url = defcon.getPluginUrl('Event Log');

    var pluginDetails = {
        ui: true,        
        name: 'Events',
        url: defcon.getPluginUrl('Event Log'),
        icon: 'fa fa-exclamation-circle',
        css: [ url + '/dist/css/bundle-libs.css', url + '/dist/css/bundle.css' ],
        js: [ url + '/dist/js/bundle-libs.js', url + '/dist/js/bundle.js' ]
    } 

    defcon.on('event', function(event) {
        repository.save(event, function(err) {
            if (err) app.get('logger').error('Error saving event: %s', err.message);
        });
    })    

    var staticDir = path.join(defcon.getPluginDir(packageJson.name), 'static');
    var templateDir = path.join(staticDir, 'templates');
    var viewsDir = path.join(templateDir, 'views');

    var handlebarsConfig = app.get('handlebarsConfig');
    handlebarsConfig.partialsDir.push(viewsDir);
    _.extend(handlebarsConfig.helpers, new HandlebarsHelpers());

    app.get(pluginDetails.url, function(req, res) {
        app.set('views', path.join(viewsDir));        
        repository.list(function(err, events) {
            if (err) return res.send(500, 'Error retrieving events: ' + err.message);
            res.render('event-log', { 
                defcon: defcon,
                plugin: pluginDetails,
                events: events
            });
        })
    })

    app.get(pluginDetails.url + '/events', function(req, res) {
        app.set('views', path.join(viewsDir));
        repository.list(function(err, events) {    
            if (err) return res.send(500, 'Error retrieving events: ' + err.message);
            res.render('events', { layout: false, events: events });
        })
    })

    app.use(pluginDetails.url, express.static(staticDir));   

    repository.test(function(err) {
        next(err, pluginDetails);
    })
}