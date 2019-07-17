(function() {
    Vue.component("modal", {
        template: "#modal-template",

        // props: ["whatever"],
        mounted: function() {
            console.log("mounted!!!");
        }
        // methods: {
        //     clicked: function() {
        //         this.something = this.whatever;
        //     }
        // clicked2: function() {
        //     this.$emit("change", "discoduck");
        //     // console.log("hi");
        // }
        // }
    });
})();
