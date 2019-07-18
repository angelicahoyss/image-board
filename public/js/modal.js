(function() {
    Vue.component("modal", {
        template: "#modal-template",
        data: function() {
            return {
                oneimage: {
                    id: location.hash.slice(1),
                    url: "",
                    username: "",
                    title: "",
                    description: "",
                    created_at: ""
                }
            };
        },

        props: ["id"],
        mounted: function() {
            // var id = this.id;
            var self = this;
            console.log("this is id:", self.id);
            axios
                .get("/oneImage", {
                    params: {
                        id: self.id
                    }
                })
                .then(resp => {
                    self.oneimage = resp.data[0];
                    console.log(resp);
                    self.url = resp.data.rows[0].url;
                    self.username = resp.data.rows[0].username;
                    self.title = resp.data.rows[0].title;
                    self.description = resp.data.rows[0].description;
                    self.created_at = resp.data.rows[0].created_at;
                    // console.log(resp.data.rows[0]);
                    // console.log("self:", self);
                })
                .catch(function(err) {
                    console.log("err in GET /image: ", err);
                });
            // console.log("mounted!!!");
        },
        watch: {
            id: function() {
                var self = this;
                axios
                    .get("/oneImage", {
                        params: {
                            id: self.id
                        }
                    })
                    .then(resp => {
                        self.oneimage = resp.data[0];
                        console.log(resp);
                        self.url = resp.data.rows[0].url;
                        self.username = resp.data.rows[0].username;
                        self.title = resp.data.rows[0].title;
                        self.description = resp.data.rows[0].description;
                        self.created_at = resp.data.rows[0].created_at;
                        // console.log(resp.data.rows[0]);
                        // console.log("self:", self);
                    })
                    .catch(function(err) {
                        console.log("err in GET /image: ", err);
                    });
            }
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
