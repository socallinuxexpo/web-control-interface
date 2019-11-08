/**
 * vuewrap.js:
 *
 * This module creates and exports the various Vue components needed for running this system. This means two components
 * used for selectable lists and the button pad. Registration happens within Vue.js, and thus no actual exports are
 * necessary.
 *
 * @author lestarch, pelmini
 */
Vue.component("dropdown", {
    /**
     * Component is composed of two properties: a list of names, and a selected name.
     */
    props: ["name", "items", "updater", "clicker", "selected"],
    //data: function() { return {"selected": null} },
    methods: {
        onclick: function (event) {
            let clicked = event.currentTarget.id;
            this.clicker(clicked);
            let later = this.update.bind(this);
            setTimeout(later, 500);
        },
        update: function () {
            let _self = this;
            this.updater().then(new_val => {
                _self.selected = new_val;
            }).catch(() => {
                _self.selected = null;
            });
        }
    },
    // Read from this element to template
    template: "#dropdown-template"
});
Vue.component("camera-controls", {
    props: ["controller"],
    methods: {
        onclick: function(event) {
            let clicked = event.currentTarget.id.replace("dpad-", "");
            this.controller[clicked]();
        }
    },
    // Read from this element to template
    template: "#camera-controls-template"
});
