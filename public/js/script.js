(function() {
    new Vue({
        el: ".main",
        data: {
            name: "I pixel pixels",
            images: []
        }, //closes data
        mounted: function() {
            var self = this;
            console.log("this:", this);
            axios
                .get("/images")
                .then(function(resp) {
                    console.log("resp.data:", resp.data.rows);
                    self.images = resp.data.rows;
                    console.log("self:", self);
                })
                .catch(function(err) {
                    console.log("err in GET /images: ", err);
                });
        } //closes mounted function
    }); //closes new Vue
})();
