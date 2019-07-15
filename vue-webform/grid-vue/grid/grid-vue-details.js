//pagination
//grouping
//filtering
//checkboxes
//adjust column width

(function () {
    
    //import gridContextMenu from './grid-context-menu.vue'

    var _count = 0;
    var _selves = [];
    var data = {};


    function onContextMenu($event, headerName, guid, contextMenu) {
        var self = this;
        $event.preventDefault();
        var pos = self.$refs["detailcolumn_" + headerName + "_" + guid][0].getBoundingClientRect();
        var x = pos.left;
        var y = pos.top;

        contextMenu.isVisible = true;
        contextMenu.containerStyle.left = x + 10 + 'px';
        contextMenu.containerStyle.top = y + 10 + 'px';

        contextMenu.headerName = headerName;
    }

    function bodyClickEventHandler(self) {
        return function () {
            self.contextMenu.isVisible = false;
        }
    }

    //-------------------------------------------------------------------------
    //actual sorting
    //-------------------------------------------------------------------------
    function sortByDataType(a, b) {
        if (a.dataType == 'string' && b.dataType == 'string') {
            if (a.value < b.value)
                return -1;
            if (a.value > b.value)
                return 1;
            return 0;
        }

        var a = null; var b = null;
        if (a.dataType == 'date' && b.dataType == 'date') {
            a = Date.parse(a.value);
            b = Date.parse(a.value);
        }
        if (a.dataType == 'int' && b.dataType == 'int') {
            a = parseInt(a.value);
            b = parseInt(a.value);
        }

        if (a.dataType == 'float' && b.dataType == 'float') {
            a = parseFloat(a.value);
            b = parseFloat(a.value);
        }

        if (a == null || b == null) {
            throw new Error("sorting: error parsing data");
        }

        return a - b;
    }

    //not used
    //sort just, for excercise, should just go back to the server
    function sortAcutally(self) {
        //first clone data, 
        //then copy it data, so to trigger the observables
        var arr = self.detailData.columns.filter(function (a) {
            return a.sortOrder;
        })

        if (arr == null || arr.length === 0) {
            return;
        }

        arr = arr.sort(function (a, b) {
            return a.sortOrder - b.sortOrder;
        });

        var sortFuncs = [];
    }

    //----------------------------------------------------------------------
    //context menu setting sort order direct UI
    //----------------------------------------------------------------------
    function contextMenuCallback(params, self) {
        //sortColumn: headerName,
        //sortDirectionCode: sortDirectionCode
        //{event: 'contextMenuClicked', headerName: headerName, sortDirectionCode: item.code}
        var column = self.detailData.columns.find(function (h) {
            return h.name == params.sortColumn;
        });

        //set direction
        column.sort.direction = params.sortDirectionCode;

        //set order
        setSortOrder(column, self);

        //make context menu disappear
        self.contextMenu.isVisible = false;
    }

    function setSortOrder(column, self) {
        if (column.sort.direction !== null) {
            setSortOrder_NotClear(column, self);
            return;
        }

        setSortOrder_Clear(column, self);
    }

    function setSortOrder_reset(self) {
        var sortedColumns = self.detailData.columns.filter(function (a) {
            return a.sort.direction != null;
        });

        if (sortedColumns == null || sortedColumns.length === 0) {
            return;
        }

        var sortedColumns = sortedColumns.sort(function (a, b) {
            var a = a.sort.order;
            var b = b.sort.order;
            return a - b;
        });

        var columnHash = {};
        var i = 1;
        sortedColumns.forEach(function (h) {
            columnHash[h.name] = i;
            i++;
        });

        self.detailData.columns.forEach(function (i) {
            var sortOrder = columnHash[i.name];
            if (!sortOrder) {
                return;
            }
            i.sort.order = sortOrder;
        });
    }

    function setSortOrder_Clear(column, self) {
        column.sort.order = null;
        column.sort.direction = null;

        setSortOrder_reset(self);
    }

    function setSortOrder_NotClear(header, self) {
        var maxOrder = _.chain(self.detailData.columns).maxBy
            (function (i) {
                return i.sort.order;
            }).value();

        if (maxOrder == null) {
            header.sort.order = 1;
            return;
        }

        //the header has max order
        if (header.sort.order == maxOrder) {
            return;
        }

        //increment order
        header.sort.order = maxOrder.sort.order + 1;

        setSortOrder_reset(self);
    }

    var contextMenu = {
        isVisible: false,
        containerStyle: {
            width: '250px',
            height: '200px',
            top: null,
            left: null,
            position: 'absolute'
        },
        headerName: null
    };
    
    //------------------------------------------------------------------
    // shape data
    //------------------------------------------------------------------
    var getObjectKeys = function (obj) {
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
    };

    var shapeData = function (data) {
        if (data.pagination == null) {
            data.pagination = {
                total: 0,
                pageNumber: 1,
                countPerPage: 10,
            }
        }
        if (!data.columns) {
            data.columns = [];
        }

        if (data.columns.length === 0) {
            getObjectKeys(data.details[0])
                .forEach(function (e, i) {
                    data.columns.push({ name: e, sort: { order: i, direction: 'asc' }, guid: vueBus.uuid() });
                });
        }

        data.columns.forEach(function (e) {
            if (e.guid == null) {
                e.guid = vueBus.uuid();
            }
        });

        if (!data.details) {
            data.details = [];
        }

        return data;
    }

    var model = {
        name: 'grid-vue-details',
        template: '#grid-vue-details-template',
        props: {
            detailData: Object,
        },
        data: function () {
            var data = {
                detailData : shapeData(this.$props.detailData),
                contextMenu: JSON.parse(JSON.stringify(contextMenu))
            }
            return data;
        },
        computed: {
            pageNumber: function(){
                return this.detailData.pagination.pageNumber;
            },
        },
        created: function () {
            //console.log('grid created');
            //_selves[data.id] = this;
            //window.grid = this;
            
        },
        methods: {
            onContextMenu: onContextMenu,
            contextMenuCallback: function (params) {
                var self = this;
                contextMenuCallback(params, self);
            },
            getObjectKeys: getObjectKeys,
            getPaginatedData: function (obj) {
                var pag = obj.pagination;
                var x = _.chain(obj.details).drop(pag.countPerPage * (pag.pageNumber - 1))
                    .take(pag.countPerPage).value();
                return x;
            },
            pagePrevious: function (obj) {
                var pag = obj.pagination;
                if (pag.pageNumber == 1) {
                    return;
                }
                pag.pageNumber--;
            },
            pageNext: function (obj) {
                var pag = obj.pagination;
                if (Math.ceil(pag.total / pag.countPerPage) == pag.pageNumber) {
                    return;
                }
                pag.pageNumber++;
            },
            isLastPage: function () {
                var pag = this.detailData.pagination;
                return Math.ceil(this.numberOfPages()) == pag.pageNumber;
            },
            numberOfPages: function () {
                var pag = this.detailData.pagination;
                return Math.ceil(pag.total / pag.countPerPage);
            }
        },
        mounted: function () {
            console.log(this.name + ' mounted');
            window.vueBus.$on('body-clicked', bodyClickEventHandler(this));
        }
    };

    Vue.component('grid-vue-details', model);
})();
