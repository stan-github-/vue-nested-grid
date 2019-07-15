(function () {

    var self;
    
    var model = {
        name: "child",
        template: "#child-template",
        data: function () {
            return {
                data: window.vueBus.data
            };
        },
        methods: {
            onClick: function () {
                this.data.count++;
            },
            created: function () {
                self = this;
                //debugging
                window.myVueComponents["child"] = self;
                //single delete event handler
                self = this;
            }
        }
    };

    Vue.component('child', model);

})();