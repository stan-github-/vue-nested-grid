//pagination, 
//client side, pagination,
//grouping
//filtering

if (!gridDataStore) {
    var gridDataStore = {};
}

(function (gridDatastore) {
    if (gridDatastore.getData) {
        return;
    }

    var data = {
        columns : [
          { name: 'id', sortOrder: null, sortDirection: null, type: 'detail'},
          { name: 'value', sortOrder: null, sortDirection: null, type: 'detail' },
          { name: 'selected', sortOrder: null, sortDirection: null, type: 'detail' },
          { name: 'g1', sortOrder: null, sortDiretion: null, type: 'group'},
          { name: 'g2', sortOrder: null, sortDiretion: null, type: 'group'}
        ],
        /*dataConverted: [
          {
              groups: { g1: 'g_A', g2: 'g_B' },
              details: 
                  [
                      { id: 2, value: 20, selected: false},
                      { id: 3, value: 90, selected: false },
                      { id: 4, value: 70, selected: false },
                      { id: 6, value: 80, selected: false }
                  ]
          },
          {
              groups: { g1: 'g_C', g2: 'g_D' },
              details:
                 [
                     { id: 20, value: 200, selected: false },
                     { id: 30, value: 900, selected: false },
                     { id: 40, value: 700, selected: false },
                     { id: 60, value: 800, selected: false }
                 ]
          }
        ],*/
        dataConverted:
            {
                id: 0,
                type: 'root',
                details:
                [
                {
                    id: 'z1',
                    type: 'group',
                    group: { id: 1, value: '2000', header: 'Year' },
                    depth: 0,
                    isCollapsed: false,
                    details:
                        [
                    {
                        id: 'z2',
                        type: 'detail-group',
                        depth: 1,
                        group: { id: 10, value: 'Jan', header: 'Month' },
                        isCollapsed: false,
                        pagination: {
                            pageNumber: 1,
                            countPerPage: 10,
                            total: 20
                        },
                        columns: [
                            { name: 'id', sort: { order: 1, direction: 'asc' }, uuid: null },
                            { name: 'value', sort: { order: 2, direction: 'asc' }, uuid: null },
                            { name: 'selected', sort: { order: 3, direction: 'asc' }, uuid: null },
                            { name: 'category', sort: { order: 4, direction: 'asc' }, uuid: null },
                        ],
                        details: [
                        { id: 1, value: 200, selected: false, category: 'a',  },
                        { id: 2, value: 190, selected: false, category: 'b',  },
                        { id: 3, value: 180, selected: false, category: 'c',  },
                        { id: 4, value: 170, selected: false, category: 'c',  },
                        { id: 5, value: 160, selected: false, category: 'c',  },
                        { id: 6, value: 150, selected: false, category: 'd',  },
                        { id: 7, value: 140, selected: false, category: 'a',  },
                        { id: 8, value: 130, selected: false, category: 'b',  },
                        { id: 9, value: 120, selected: false, category: 'c',  },
                        { id: 10, value: 110, selected: false, category: 'a',  },
                        { id: 11, value: 100, selected: false, category: 'b',  },
                        { id: 12, value: 90, selected: false, category: 'c',  },
                        { id: 13, value: 80, selected: false, category: 'a',  },
                        { id: 14, value: 70, selected: false, category: 'b',  },
                        { id: 15, value: 60, selected: false, category: 'c',  },
                        { id: 16, value: 50, selected: false, category: 'b',  },
                        { id: 17, value: 40, selected: false, category: 'b',  },
                        { id: 18, value: 30, selected: false, category: 'b',  },
                        { id: 19, value: 20, selected: false, category: 'a',  },
                        { id: 20, value: 10, selected: false, category: 'a',  }
                        ]
                    },
                {
                    id: 'z3',
                    type: 'detail-group',
                    group: { id: 20, value: 'Feb', header: 'Month' },
                    isCollapsed: false,
                    depth: 1,
                    columns: [
                            { name: 'id', sort: { order: 1, direction: 'asc' }, uuid: null },
                            { name: 'value', sort: { order: 2, direction: 'asc' }, uuid: null },
                            { name: 'selected', sort: { order: 3, direction: 'asc' }, uuid: null },
                            { name: 'category', sort: { order: 4, direction: 'asc' }, uuid: null },
                    ],
                    details: [
                        { id: 3, value: 70, selected: false, category: 'a'},
                        { id: 4, value: 80, selected: false, category: 'z', }
                    ]
                }
                ]

                },
                {
                    id: 'z4',
                    type: 'group',
                    group: { id: 2, value: '2001', header: 'Year' },
                    isCollapsed: false,
                    depth: 1,
                    columns: [
                            { name: 'id', sort: { order: 1, direction: 'asc' }, uuid: null },
                            { name: 'value', sort: { order: 2, direction: 'asc' }, uuid: null },
                            { name: 'selected', sort: { order: 3, direction: 'asc' }, uuid: null },
                            { name: 'category', sort: { order: 4, direction: 'asc' }, uuid: null },
                    ],
                    details:
                        [
                {
                    id: 'z5',
                    type: 'detail-group',
                    group: { id: 30, value: 'March', header: 'Month' },
                    depth: 1,
                    hasDetails: true,
                    isCollapsed: false,
                    columns: [
                            { name: 'id', sort: { order: 1, direction: 'asc' }, uuid: null },
                            { name: 'value', sort: { order: 2, direction: 'asc' }, uuid: null },
                            { name: 'selected', sort: { order: 3, direction: 'asc' }, uuid: null },
                            { name: 'category', sort: { order: 4, direction: 'asc' }, uuid: null },
                    ],
                    details: [
                        { id: 5, value: 20, selected: false, category: 'a',  },
                        { id: 6, value: 90, selected: false, category: 'b',  }
                    ]
                },
                {
                    id: 'z6',
                    type: 'detail-group',
                    hasDetails: true,
                    group: { id: 40, value: 'May', header: 'Month' },
                    isCollapsed: false,
                    depth: 1,
                    columns: [
                            { name: 'id', sort: { order: 1, direction: 'asc' }, uuid: null },
                            { name: 'value', sort: { order: 2, direction: 'asc' }, uuid: null },
                            { name: 'selected', sort: { order: 3, direction: 'asc' }, uuid: null },
                            { name: 'category', sort: { order: 4, direction: 'asc' }, uuid: null },
                    ],
                    details: [
                        { id: 7, value: 70, selected: false, category: 'a',  },
                        { id: 8, value: 80, selected: false, category: 'c',  }
                    ]
                }
                ]
                }
                ]
            },
        data: [
            { g1: 'g1_A', g2: 'g2_1', id: 2, value: 20, selected: false},
            { g1: 'g1_A', g2: 'g2_1', id: 3, value: 90, selected: false},
            { g1: 'g1_A', g2: 'g2_2', id: 4, value: 70, selected: false},
            { g1: 'g1_A', g2: 'g2_2', id: 6, value: 80, selected: false},
            { g1: 'g1_B', g2: 'g2_1', id: 20, value: 200, selected: false},
            { g1: 'g1_B', g2: 'g2_1', id: 30, value: 900, selected: false},
            { g1: 'g1_B', g2: 'g2_2', id: 40, value: 700, selected: false},
            { g1: 'g1_B', g2: 'g2_2', id: 60, value: 800, selected: false}
        ],
        pagination: {
            countPerPage: 3,
            PageNumber: 1,
            TotalCount: 8,
        },
        groupBy: ['g1', 'g2']
    };

    var getData = function () {
        return JSON.parse(JSON.stringify(data.dataConverted));
    }
    
    gridDataStore.getData = getData;
})(gridDataStore);