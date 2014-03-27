module.exports = DashboardPlugin;
var path = require('path');

function DashboardPlugin() {

    var events = [{"system":"DEFCON","type":"release","environment":"Integration","message":"Released to integration","severity":"5","link":"http://192.168.1.1:8080/job/DEFCON/3/","application":"DEFCON","host":"192.168.1.1","date":"2014-03-26T21:33:09.068Z","url":"/api/v1/event/3998b8c0-b52e-11e3-bcd2-bd30b4e54d13"},{"system":"WPS","type":"release","environment":"Akamai","message":"Uploaded 147 to Akamai","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39329","application":"helmut","host":"192.168.1.1","date":"2014-03-26T22:20:52.129Z","url":"/api/v1/event/e41d2910-b534-11e3-bcd2-bd30b4e54d13"},{"system":"repocop","type":"release","environment":"Integration","message":"Released to integration","severity":"5","link":"http://192.168.1.1:8080/job/RepoCop/55/","application":"repocop","host":"192.168.1.1","date":"2014-03-26T23:09:32.015Z","url":"/api/v1/event/b08067f0-b53b-11e3-bcd2-bd30b4e54d13"},{"system":"repocop","type":"release","environment":"Integration","message":"Released to integration","severity":"5","link":"http://192.168.1.1:8080/job/RepoCop/56/","application":"repocop","host":"192.168.1.1","date":"2014-03-27T08:45:39.769Z","url":"/api/v1/event/2c7d1290-b58c-11e3-bcd2-bd30b4e54d13"},{"system":"electrostatic","type":"release","environment":"Production","message":"Released 571 to Production","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewType.html?buildTypeId=bt101","application":"bundle","host":"192.168.1.1","date":"2014-03-27T09:11:27.758Z","url":"/api/v1/event/c72972e0-b58f-11e3-bcd2-bd30b4e54d13"},{"system":"new-fe","type":"release","environment":"production","message":"Released 2885 to production","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39363","application":"fe","host":"192.168.1.1","date":"2014-03-27T10:16:51.091Z","url":"/api/v1/event/e9a68e30-b598-11e3-bcd2-bd30b4e54d13"},{"system":"new-fe","type":"release","environment":"continuous","message":"Released 2886 to continuous","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39365","application":"fe","host":"192.168.1.1","date":"2014-03-27T10:32:07.442Z","url":"/api/v1/event/0bd69f20-b59b-11e3-bcd2-bd30b4e54d13"},{"system":"new-fe","type":"release","environment":"production","message":"Released 2886 to production","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39372","application":"fe","host":"192.168.1.1","date":"2014-03-27T10:47:29.266Z","url":"/api/v1/event/3149cd20-b59d-11e3-bcd2-bd30b4e54d13"},{"system":"new-fe","type":"release","environment":"continuous","message":"Released 2887 to continuous","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39374","application":"fe","host":"192.168.1.1","date":"2014-03-27T10:59:42.388Z","url":"/api/v1/event/e6435740-b59e-11e3-bcd2-bd30b4e54d13"},{"system":"new-fe","type":"release","environment":"continuous","message":"Released 2888 to continuous","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39381","application":"fe","host":"192.168.1.1","date":"2014-03-27T11:12:07.095Z","url":"/api/v1/event/a2249c70-b5a0-11e3-bcd2-bd30b4e54d13"},{"system":"new-fe","type":"release","environment":"continuous","message":"Released 2889 to continuous","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39389","application":"fe","host":"192.168.1.1","date":"2014-03-27T11:27:16.878Z","url":"/api/v1/event/c06a7ae0-b5a2-11e3-bcd2-bd30b4e54d13"},{"system":"new-fe","type":"release","environment":"continuous","message":"Released 2890 to continuous","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39402","application":"fe","host":"192.168.1.1","date":"2014-03-27T13:47:01.982Z","url":"/api/v1/event/4653cfe0-b5b6-11e3-bcd2-bd30b4e54d13"},{"system":"new-fe","type":"release","environment":"production","message":"Released 1182 to production","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39420","application":"fe_adm","host":"192.168.1.1","date":"2014-03-27T14:41:26.773Z","url":"/api/v1/event/e04b6250-b5bd-11e3-bcd2-bd30b4e54d13"},{"system":"new-fe","type":"release","environment":"continuous","message":"Released 2893 to continuous","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39421","application":"fe","host":"192.168.1.1","date":"2014-03-27T14:43:22.853Z","url":"/api/v1/event/257ba240-b5be-11e3-bcd2-bd30b4e54d13"},{"system":"new-fe","type":"release","environment":"production","message":"Released 143 to production","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39422","application":"fe_acolyte","host":"192.168.1.1","date":"2014-03-27T14:46:41.886Z","url":"/api/v1/event/9c1dcfe0-b5be-11e3-bcd2-bd30b4e54d13"},{"system":"new-fe","type":"release","environment":"continuous","message":"Released 2894 to continuous","severity":"5","link":"http://192.168.1.1:8080/teamcity/viewLog.html?buildId=39432","application":"fe","host":"192.168.1.1","date":"2014-03-27T14:59:42.108Z","url":"/api/v1/event/6d2a3dc0-b5c0-11e3-bcd2-bd30b4e54d13"},{"system":"femail_fashion_finder_be","type":"release","environment":"Integration","message":"Released 1064 to Integration","severity":"5","link":"","application":"femail_fashion_finder_be","host":"192.168.1.1","date":"2014-03-27T16:01:06.067Z","url":"/api/v1/event/00f99f20-b5c9-11e3-bcd2-bd30b4e54d13"}];

    this.init = function(eventBus, app, handlebarsConfig) {
        eventBus.on('event', onEvent);
        eventBus.on('start', onStart);

        var viewsDir = path.join(__dirname, 'static', 'templates', 'views');
        handlebarsConfig.partialsDir.push(viewsDir);

        app.get('/plugin/dashboard', function(req, res) {
            app.set('views', path.join(viewsDir));
            res.render('dashboard', { events: events });
        })

        app.get('/plugin/dashboard/events', function(req, res) {
            app.set('views', path.join(viewsDir));
            res.render('dashboard-events', { layout: false, events: events });
        })
    }

    function onEvent() {
        console.log(arguments);
    }

    function onStart() {
        console.log(arguments);
    }
}