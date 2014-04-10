# DEFCON Event Log Plugin

## Prerequisits
1. [DEFCON](http://github.com/acuminous/defcon)
1. [redis](http://redis.io)

## Installation
1. '''cd $DEFCON_INSTALL_DIR'''
2. '''npm install defcon-event-log'''
3. '''Enable and configure 'defcon-event-log' in your DEFCON configuration file, e.g.
'''json
{
    "plugins": {
        "installed": [
            "defcon-event-log"
        ],
        "defcon-event-log": {
            "redis": {
                "host": "localhost",
                "port": 6379,
                "db": 0,
                "options": {
                    "auth_pass": "secret",                
                    "enable_offline_queue": false
                }
            },
            "pageSize": 14,
            "pages": 10
        }        
    }
}
'''
4. Restart defcon (you can do this via '''kill -s USRSIG2 <pid>''' if you want zero downtime)
