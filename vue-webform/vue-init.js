//need pagination, maybe batches of pages rather than just one?
//should be attached to something, not a global function

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
    var vueBus = new Vue({
        methods: {
            raiseError: function (error) {
                window.vueBus.$emit('error', error);
            }
        },
        methods: {
            showMessage: showMessage
        }
    });

    //global vueBus Object. 
    //used by the following 2 external scripts
    window.vueBus = vueBus;
    
    //load and execute external javascript code
    //jQueryLoadScript('javascript/UpdateManager.js', null);
    //jQueryLoadScript('javascript/PageObjectBuilder.js', null);

    //--------------------------------------------------------------
    //building the page components
    //var $pdfObject = JSON.parse($('#hdnRenderedPdf').val());
    //var pages = vueBus.buildPageObject($pdfObject);

    function onBodyClick(event) {
        window.vueBus.$emit('body-clicked', event.target);
    }

    var vueApp = new Vue({
        el: '#vueApp',
        data: {
            pageName: 'stan test',
        },
        computed: {
        },
        methods: {
            onClick: onBodyClick
        }
    });    
});