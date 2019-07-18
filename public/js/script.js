(function() {
    new Vue({
        el: ".main",
        data: {
            id: location.hash.slice(1),
            name: "I pixel pixels",
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            lastimageId: "",
            // favoriteThing: "peanut butter",
            showModal: false
        }, //closes data
        mounted: function() {
            var self = this;
            // console.log("this:", this);
            axios
                .get("/images")
                .then(function(resp) {
                    self.images = resp.data.rows;
                    console.log("self:", self);
                })
                .catch(function(err) {
                    console.log("err in GET /images: ", err);
                });

            addEventListener("hashchange", function() {
                self.id = location.hash.slice(1);
            });
        }, //closes mounted function

        methods: {
            //every signle function that runs in response to an event must be
            //defined in methods
            handleClick: function() {
                var formData = new FormData();
                formData.append("title", this.title);
                formData.append("username", this.username);
                formData.append("description", this.description);
                formData.append("file", this.file);

                let self = this;
                console.log("formData", formData);

                axios
                    .post("/upload", formData)
                    .then(function(resp) {
                        self.images.unshift(resp.data);
                        console.log("resp from POST/upload:", resp);
                    })
                    .catch(function(err) {
                        console.log("err in POST/upload: ", err);
                    });

                //FormData API is necessary for sending FILES from client to server
                // e.preventDefault();
                //whatever code I write here will run whenever the user
                //clicks the submit button
                console.log("this:", this);
            },
            handleChange: function(e) {
                console.log("e in handleChange:", e.target.files[0]);
                this.file = e.target.files[0];

                //this function runs when user selects an image on the file input field
            }, //closes handleChange
            // change: function() {
            //     this.favoriteThing = "kittens";
            // },
            clicked: function(id) {
                this.showModal = id;
            },
            closeModal: function() {
                this.id = null;
                location.hash = "";
                history.replaceState(null, null, " ");
            }
        } //closes methods
    }); //closes new Vue
})();
//this refers to vie instance and prop of data are inside
