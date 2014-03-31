var express = require('express');
var exphbs = require('express3-handlebars');
var path = require('path');
var _ = require('lodash');
var HandlebarsHelpers = require('./lib/util/HandlebarsHelpers');
var EventRepository = require('./lib/EventRepository');

module.exports.create = create;

function create(context, next) {

    var staticDir = path.join(__dirname, 'static');
    var templateDir = path.join(staticDir, 'templates');
    var viewsDir = path.join(templateDir, 'views');
    var repository = new EventRepository(context.config.repository)

    var app = express();
    app.disable('x-powered-by');
    app.disable('view cache');    
    app.set('view engine', 'handlebars');
    app.set('views', viewsDir);

    var plugin = {
        name: 'Event Log',
        ui: true,
        icon: 'fa fa-list',
        app: app,
        resources: {
            js: ['dist/js/bundle-libs.js', 'dist/js/bundle.js'],
            css: ['dist/css/bundle-libs.css', 'dist/css/bundle.css']
        }                  
    }    

    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'static/templates/layouts',
        partialsDir: viewsDir,
        helpers: new HandlebarsHelpers()        
    }));

    app.get('/', function(req, res) {
        repository.list(function(err, events) {
            if (err) return res.send(500, 'Error retrieving events: ' + err.message);
            res.render('event-log', { 
                defcon: context.defcon,
                plugin: plugin,
                events: events
            });
        })
    })

    app.get('/events', function(req, res) {
        repository.list(function(err, events) {    
            if (err) return res.send(500, 'Error retrieving events: ' + err.message);
            res.render('events', { layout: false, events: events });
        })
    })

    app.use('/', express.static(staticDir));       

    context.defcon.on('event', function(event) {
        repository.save(event, function(err) {
            if (err) app.get('logger').error('Error saving event: %s', err.message);
        });
    }) 

    repository.test(function(err) {
        next(err, plugin);
    })
}