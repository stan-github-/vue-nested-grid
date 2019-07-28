(function () {
    
    var self;

    var data_ = {
        itemList: [
          { name: 'Order by Asc', key: 0, code: 'asc', tabindex: 0 },
          { name: 'Order by Dsc', key: 1, code: 'dsc', tabindex: 1 },
          { name: 'Clear Sort', key: 2, code: null, tabIndex: 2 }
        ],
    };

    data_.itemList.forEach(function (i, index) {
        i.tabindex = index;
        i.selected = false;
        //i.class = 'form-control mr-sm-2'
    });

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    function itemOnClick($event, selectedItem, headerName) {
        var item = selectedItem;
        var sortDirectionCode = item.code;
        
        this.$parent.contextMenuCallback(
            {
                sortColumn: headerName,
                sortDirectionCode: sortDirectionCode
            });
        //window.vueBus.$emit(JSON.stringify({ target: 'grid' }),
        //    JSON.stringify({ event: 'contextMenuClicked', headerName: headerName, selectedSortDirection: item.key, sortDirectionCode: item.code }));
        //window.grid.headerContextMenuCallback(headerName, itemKey);
    }

    var comp = {
        name: 'grid-vue-context-menu',
        template: '#grid-vue-context-menu-template',
        props: {
            containerStyle: Object,
            headerName: String,
        },
        data: function () {
            return data_;
        },
        methods: {
            itemOnClick: itemOnClick,
        },
        created: function () {
            console.log('grid context menu created');
            self = this;
            window.gridContextMenu = self;
        },
    };

    Vue.component('grid-vue-context-menu', comp);
})();