(function() {
    Vue.component("love-component", {
        template: "#love-template",
        data: function() {
            return {
                something: "vue"
            };
        },
        props: ["whatever"],
        mounted: function() {
            console.log("mounted!!!");
        },
        methods: {
            clicked: function() {
                this.something = this.whatever;
            },
            clicked2: function() {
                this.$emit("change", "discoduck");
                // console.log("hi");
            }
        }
    });
})();

//parent uses props to influence children
//children emit events to influence parent

//----------PART 3 -----------//
//modal should show the image clicked but bigger
//comments: table to store comments. col for text, name of the user, timestamp
//and image id col. modal should be a component. there should be at least one
//component but we can add more for comments etc.
