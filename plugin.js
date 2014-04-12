var express = require('express');
var exphbs = require('express3-handlebars');
var path = require('path');
var _ = require('lodash');
var HandlebarsHelpers = require('./lib/util/HandlebarsHelpers');
var EventRepository = require('./lib/EventRepository');
var packageJson = require('./package.json');

module.exports.create = create;

function create(context, next) {

    var config = context.config;
    var staticDir = path.join(__dirname, 'static');
    var templateDir = path.join(staticDir, 'templates');
    var viewsDir = path.join(templateDir, 'views');
    var repository = new EventRepository(config)

    var app = express();
    app.disable('x-powered-by');
    app.disable('view cache');    
    app.set('view engine', 'handlebars');
    app.set('views', viewsDir);

    var plugin = {
        name: 'Event Log',
        version: packageJson.version,        
        description: packageJson.description,
        repositoryUrl: packageJson.repository.url,
        ui: true,
        icon: 'fa fa-list',
        app: app,
        resources: {
            js: ['dist/js/bundle-libs.js', 'dist/js/bundle.js'],
            css: ['dist/css/bundle-libs.css', 'dist/css/bundle.css']
        }                  
    }    

    app.engine('handlebars', exphbs(_.defaults({
        partialsDir: viewsDir,
        helpers: new HandlebarsHelpers()
    }, context.handlebarsConfig)));

    app.get('/', function(req, res) {
        repository.list(function(err, events) {
            if (err) return res.send(500, 'Error retrieving events: ' + err.message);
            res.render('event-log', { 
                pageId: packageJson.name,                 
                config: config,                
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
            if (err) return context.logger.error('Error saving event: %s', err.message);
        });
    }) 

    repository.init(function(err) {
        next(err, plugin);
    })
}