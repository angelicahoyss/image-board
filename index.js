const express = require("express");
const app = express();
const db = require("./utils/db");
const s3 = require("./s3");
var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");
const config = require("./config");
const moment = require("moment");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
app.use(express.static("./public"));

app.use(require("body-parser").json());

app.get("/images", function(req, res) {
    db.getImages()
        .then(data => {
            // console.log("images", data);
            res.json(data);
        })
        .catch(err => {
            console.log("err in GET / getImages", err);
        });
});
//uploader.single RUNS all the boilerplate code from above.
//it takes the file it got from formData, changes its name, and stores it
//in the /uploads directory
app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    // If nothing went wrong the file is already in the uploads directory
    //uploader.signle, when successful, adds a property called "file" to the
    //request object. "file" represents the file that was just uploaded to /uploads
    const url = config.s3Url + req.file.filename;
    // console.log("URL :", url);
    db.addImage(url, req.body.username, req.body.title, req.body.description)
        .then(data => {
            for (let i = 0; i < data.rows.length; i++) {
                    data.rows[i].created_at = moment(
                        data.rows[i].created_at,
                        moment.ISO_8601
                    ).format("MMM Do YY");
                }
            res.json(data.rows[0]);
        })
        .catch(err => {
            console.log("err in POST / uploadFile", err);
        });

    // console.log("req.file:", req.file);
    // if (req.file) {
    //     res.json({
    // file: req.file.filename
    //         success: true
    //     });
    // } else {
    //     res.json({
    //         success: false
    //     });
    // }
});

app.get("/oneImage", (req, res) => {
    db.getImagebyId(req.query.id)
        .then(data => {
            for (let i = 0; i < data.rows.length; i++) {
                    data.rows[i].created_at = moment(
                        data.rows[i].created_at,
                        moment.ISO_8601
                    ).format("MMM Do YY");
                }
            // console.log("image", data);
            res.json(data.rows);
        })
        .catch(err => {
            console.log("err in GET / getImagebyId", err);
        });
});
app.post("/comments", (req, res) => {
    db.addComment(req.body.imageId, req.body.newComment, req.body.author)
        .then(data => {
            for (let i = 0; i < data.rows.length; i++) {
                    data.rows[i].created_at = moment(
                        data.rows[i].created_at,
                        moment.ISO_8601
                    ).format("MMM Do YY");
                }
            res.json({
                lastComment: data.rows[0]
            });
        })
        .catch(err => {
            console.log("err in POST / addComment", err);
        });
});

app.get("/comments", (req, res) => {
    // console.log("req.query.id", req.query.id);
    db.getComments(req.query.id)
        .then(data => {
            for (let i = 0; i < data.rows.length; i++) {
                    data.rows[i].created_at = moment(
                        data.rows[i].created_at,
                        moment.ISO_8601
                    ).format("MMM Do YY");
                }
            // console.log("data rows", data.rows);
            res.json(data.rows);
        })
        .catch(err => {
            console.log("err in GET / getComments", err);
        });
});

app.get("/loadmore/:id", (req, res) => {
    console.log(req.params.id);
    db.getMoreImages(req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("err in GET / loadMore", err);
        });
});

app.listen(8080, () => console.log("listening!"));
