//need pagination, maybe batches of pages rather than just one?
//should be attached to something, not a global function

"use strict";

function showMessage(message, type) {
    window.Sys.Application._components["ctl00_errorWindow"].show()
    $('#lblErrorMessage', parent.document).text(
        (type == null ? '' : (type + ':')) + message);
}

function jQueryLoadScript (url, callback) {
    $.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: false
    });
}

$(document).ready(function () {
    //declare global variable to connect the components,
    //not complicated enough yet to use a module
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    var vueBus = new Vue({
        methods: {
            raiseError: function (error) {
                window.vueBus.$emit('error', error);
            },
            showMessage: showMessage,
            uuid: uuidv4
        },
    });

    //global vueBus Object. 
    //used by the following 2 external scripts
    window.vueBus = vueBus;
    
    function onBodyClick(event) {
        window.vueBus.$emit('body-clicked', event.target);
    }

    var vueApp = new Vue({
        el: '#vueApp',
        data: {
            pageName: 'nested list',
        },
        computed: {
        },
        methods: {
            onClick: onBodyClick
        }
    });    
});