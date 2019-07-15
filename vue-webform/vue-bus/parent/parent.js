(function () {

    var self;
    
    var model = {
        name: "parent",
        template: "#parent-template",
        data: function () {
            return {
                data: null,
            };
        },
        methods: {
            onClick: function () {
                this.data.count++;
            },
            onCreate: function () {
                this.data = window.vueBus.data;
            },
            created: function () {
                self = this;
                //debugging
                window.myVueComponents["parent"] = self;
                //single delete event handler
                self = this;
            }
        }
    };

    Vue.component('parent', model);

})();