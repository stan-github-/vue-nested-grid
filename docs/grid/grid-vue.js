//pagination
//grouping
//filtering
//checkboxes
//adjust column width

(function () {
    var zzz=  1;
    //import gridContextMenu from './grid-context-menu.vue'

    var _selves = [];
    var _count = 0;
    var dataStore = window.gridDataStore;

    var data = {
        id: _count,
        gridData: [],
    }

    _count++;

    var model = {
        name: 'grid-vue',
        template: '#grid-vue-template',
        props: {
            gridData: Array,
            detailConfig: Object
        },
        data: function () {            
            data.gridData = this.$props.gridData;
            return data;
        },
        computed: {
        } ,
        created : function(){
            console.log('grid created');
            _selves[data.id] = this;
            window.grid = this;
        },
        methods: {
            onSliderClick: function (item) {
                item.isCollapsed = !item.isCollapsed;
            },
            getSliderText: function (item) {
                return item.isCollapsed?'+':'-';
            },
            getObjectKeys: function (obj) {
                var keys = [];
                for (var p in obj) {
                    if (!obj.hasOwnProperty(p)) {
                        break;
                    }
                    keys.push(p);
                }
                return _.chain(keys)
                    .sortBy(function (a) {
                        return a;
                    }).value();
            }
        },
        mounted: function(){
            console.log(this.name + ' mounted');
        } 
    };

    Vue.component('grid-vue', model);
})();
