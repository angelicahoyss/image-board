(function() {
    new Vue({
        el: ".main",
        data: {
            imageId: location.hash.slice(1),
            name: "blog",
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            showModal: false,
            hasMore: true,
            filechooser: ""
            // uploads: false,
            // computed: {
            //     isDisabled: function() {
            //         return !this.uploads;
            //     }
            // }
        }, //closes data
        mounted: function() {
            var self = this;
            // console.log("this:", this);
            axios
                .get("/images")
                .then(function(resp) {
                    self.images = resp.data.rows;
                    // console.log("self:", self);
                })
                .catch(function(err) {
                    console.log("err in GET /images: ", err);
                });

            addEventListener("hashchange", function() {
                self.imageId = location.hash.slice(1);
            });
        }, //closes mounted function

        methods: {
            //every signle function that runs in response to an event must be
            //defined in methods
            submitImage: function() {
                var formData = new FormData();
                formData.append("title", this.title);
                formData.append("username", this.username);
                formData.append("description", this.description);
                formData.append("file", this.file);

                let self = this;
                // console.log("formData", formData);

                axios
                    .post("/upload", formData)
                    .then(function(resp) {
                        self.images.unshift(resp.data);
                        self.images.pop();
                        self.title = "";
                        self.username = "";
                        self.description = "";
                        self.$refs.filechooser.value = "";
                        self.$refs.filelabel.innerText = "select file";
                        // console.log("resp from POST/upload:", resp);
                    })
                    .catch(function(err) {
                        console.log("err in POST/upload: ", err);
                    });

                //FormData API is necessary for sending FILES from client to server
                // console.log("this:", this);
            },
            handleChange: function(e) {
                console.log("e in handleChange:", e.target.files[0]);
                this.file = e.target.files[0];

                if (e.target.files[0]) {
                    console.log(
                        "e in handleChange:",
                        "we have a file with name: " + this.file.name
                    );
                    this.$refs.filelabel.innerText = this.file.name;
                } else {
                    console.log("e in handleChange:", "we DON'T  have a file");
                    this.$refs.filelabel.innerText = "select file";
                } //this function runs when user selects an image on the file input field
            }, //closes handleChange
            clicked: function(id) {
                this.showModal = id;
            },
            closeModal: function() {
                this.imageId = null;
                location.hash = "";
                history.replaceState(null, null, " ");
            },
            loadMore: function() {
                var lastimageId = this.images[this.images.length - 1].id;
                console.log(lastimageId);
                axios
                    .get("/loadmore/" + lastimageId)
                    .then(resp => {
                        // console.log("length:", resp.data.rows);
                        if (resp.data.rows.length < 24) {
                            this.hasMore = false;
                        }
                        this.images = this.images.concat(resp.data.rows);
                    })
                    .catch(function(err) {
                        console.log("err in GET /getMoreImages: ", err);
                    });
            }
        } //closes methods
    }); //closes new Vue
})();
//this refers to vue instance and prop of data are inside
