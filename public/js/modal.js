(function() {
    Vue.component("modal", {
        template: "#modal-template",
        data: function() {
            return {
                oneimage: {
                    url: "",
                    username: "",
                    title: "",
                    description: "",
                    created_at: ""
                },
                commentSection: {
                    author: "",
                    newComment: ""
                },
                comments: []
            };
        },

        props: ["id"],
        mounted: function() {
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
                    console.log(resp.data.rows[0]);
                })
                .catch(function(err) {
                    console.log("err in GET /image: ", err);
                });
            axios
                .get("/comments", {
                    params: {
                        id: self.id
                    }
                })
                .then(resp => {
                    self.comments = resp.data;
                    console.log("comments array", resp.data);
                });
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
                axios
                    .get("/comments", {
                        params: {
                            id: self.id
                        }
                    })
                    .then(resp => {
                        self.comments = resp.data.comments;
                        console.log("this comments:", this.comments);
                    })
                    .catch(function(err) {
                        console.log("err in GET /comments: ", err);
                    });
            }
        },
        methods: {
            saveComment: function() {
                var self = this;
                axios
                    .post("/comments", {
                        author: self.commentSection.author,
                        newComment: self.commentSection.newComment,
                        imageId: self.id
                    })
                    .then(results => {
                        self.comments.unshift(results.data.lastComment);
                        self.lastComment = "";
                        self.commentSection.author = "";
                        self.commentSection.newComment = "";
                        console.log("self.comments: ", this.comments);
                    })
                    .catch(err => {
                        console.log("err in axios.post /saveComment: ", err);
                    });
            } //closes saveComment
        } //closes methods
    });
})();
