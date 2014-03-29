var express = require('express');
var packageJson = require('./package.json');
var path = require('path');
var HandlebarsHelpers = require('./lib/util/HandlebarsHelpers');
var _ = require('lodash');

module.exports = plugin;

function plugin(defcon, app) {

    var url = defcon.getPluginUrl('Dashboard');

    var config = {
        ui: true,        
        name: 'Dashboard',
        url: defcon.getPluginUrl('Dashboard'),
        icon: 'fa fa-list',
        css: [ url + '/dist/css/bundle-libs.css', url + '/dist/css/bundle.css' ],
        js: [ url + '/dist/js/bundle-libs.js', url + '/dist/js/bundle.js' ]
    } 

    var events = [];

    defcon.on('event', function(event) {
        events.push(event);
    })    

    var staticDir = path.join(defcon.getPluginDir(packageJson.name), 'static');
    var templateDir = path.join(staticDir, 'templates');
    var viewsDir = path.join(templateDir, 'views');

    var handlebarsConfig = app.get('handlebarsConfig');
    handlebarsConfig.partialsDir.push(viewsDir);
    _.extend(handlebarsConfig.helpers, new HandlebarsHelpers());

    app.get(config.url, function(req, res) {
        app.set('views', path.join(viewsDir));        
        res.render('dashboard', { 
            defcon: defcon,
            plugin: config,
            events: events
        });
    })

    app.get(config.url + '/events', function(req, res) {
        app.set('views', path.join(viewsDir));
        res.render('dashboard-events', { layout: false, events: events });
    })

    app.use(config.url, express.static(staticDir));   

    return config;
}