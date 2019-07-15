(function () {

    var self;

    /*var data = {
        gridHeaders: [
          { name: 'id', sortOrder: null, sortDirection: null, dataType: 'int',},
          { name: 'value', sortOrder: null, sortDirection: null, dataType: 'int'},
          { name: 'code', sortOrder: null, sortDirection: null, dataType: 'string'},
          { name: 'date', sortOrder: null, sortDirection: null, dataType: 'datetime'},

        ],
        gridData: [
          { id: 2, value: 20, code: 'a', date: '1/2/2012'},
          { id: 3, value: 90, code: 'b', date: '5/2/2015' },
          { id: 4, value: 70, code: 'c', date: '4/2/2012' },
          { id: 6, value: 80, code: 'd', date: '2/2/2012' }
        ],
    };*/

    var model = {
        name: 'grid-vue-wrapper',
        template: '#grid-vue-wrapper-template',
        data: function () {
            return {
                gridData: window.gridDataStore.getData()
            };
        },
        created: function () {
            console.log('grid view created');
            self = this;
            window.gridWrapper = self;
        },
        methods: {
            getData: function (parameters) {
                this.getData.data = [];
                var self = this;
                setTimeout(function () {
                    var data = window.gridDataStore.getData(parameters);
                    self.gridData = data;
                }, 500);
            }
        }
    };

    Vue.component('grid-vue-wrapper', model);

})();

firstBy = (function () { function e(f) { f.thenBy = t; return f } function t(y, x) { x = this; return e(function (a, b) { return x(a, b) || y(a, b) }) } return e })();
