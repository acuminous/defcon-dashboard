var interval = 5000;
var locks = {
    auto: false,
    manual: false
}

function lockTable(key) {
    locks[key] = true;
    $('#autoRefreshButtonGroup').removeClass('active').addClass('inactive');
}

function unlockTable(key) {
    locks[key] = false;
    if (!isLocked()) $('#autoRefreshButtonGroup').removeClass('inactive').addClass('active');
}

function isLocked() {
    return _.find(locks, function(lock) {
        return lock;
    }) || false;
}

(function poll() {
    if (isLocked()) return setTimeout(poll, interval);
    $.ajax({
        url : '/plugin/event-log/events',
        success : function(data) {
            $('table.events tbody tr').remove();
            $('table.events tbody').append(data).trigger('footable_redraw');
        },
        complete: function() {
            setTimeout(poll, interval);
        }
    })   
})();

$(function() {
    $('#autoRefreshButtonGroup .active').on('click', lockTable.bind(this, 'manual'));
    $('#autoRefreshButtonGroup .inactive').on('click', unlockTable.bind(this, 'manual'));    

    $('table.events').footable().bind({   
        footable_paging: function(e) {
            e.page > 0 ? lockTable('auto') : unlockTable('auto');
        }
    });    
})