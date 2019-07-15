//need pagination, maybe batches of pages rather than just one?
//should be attached to something, not a global function

function showMessage(message, type) {
    window.Sys.Application._components["ctl00_errorWindow"].show();
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
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    var vueBus = new Vue({
        methods: {
            raiseError: function (error) {
                window.vueBus.$emit('error', error);
            },
            showMessage: showMessage,
            guid: guid,
        },
        data: {
            isDebug: false,
            //data: {count: 0, name: 'stan', arr:[{x:1, y:2}, {x:3, y:4}]}
            data: null,
        },
        created: function () {
            //this.data = { count: 0, name: 'stan', arr: [{ x: 1, y: 2 }, { x: 3, y: 4 }] };
        }
    });

    //global vueBus Object. 
    //used by the following 2 external scripts
    window.vueBus = vueBus;
    
    function onClick(event) {
        window.vueBus.data.count++;
    }

    function onCreate(event) {
        window.vueBus.data = { count: 0, name: 'stan', arr: [{ x: 1, y: 2 }, { x: 3, y: 4 }] };
    }

    window.myVueComponents = {};

    var vueApp = new Vue({
        el: '#vueApp',
        data: {
            pageName: 'sight-line',
        },
        computed: {
        },
        methods: {
            onClick: onClick,
            onCreate: onCreate,
        }
    });    
});

//load and execute external javascript code
//jQueryLoadScript('javascript/UpdateManager.js', null);
//jQueryLoadScript('javascript/PageObjectBuilder.js', null);

//--------------------------------------------------------------
//building the page components
//var $pdfObject = JSON.parse($('#hdnRenderedPdf').val());
//var pages = vueBus.buildPageObject($pdfObject);
