const express = require("express");
const app = express();
const db = require("./utils/db");

app.use(express.static("./public"));

app.get("/images", function(req, res) {
    db.getImages()
        .then(data => {
            console.log("3 images", data);
            res.json(data);
        })
        .catch(err => {
            console.log(err);
        });
});

app.listen(8080, () => console.log("listening!"));
