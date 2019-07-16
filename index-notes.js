const express = require("express");
const app = express();

app.use(express.static("./public"));

let cities = [
    {
        name: "Berlin",
        country: "DE"
    },
    {
        name: "Sarajevo",
        country: "BiH"
    },
    {
        name: "Tokyo",
        country: "JP"
    },
    {
        name: "New York City",
        country: "USA"
    }
];
app.get("/cities", function(req, res) {
    res.json(cities); //sending data back to the client
});

//the server's job now with frameworks is to give our
//framework (in this case Vue) the data it needs to render on screen

//with multi page application's(MPA's) the server's job
// is to figure out what should be rendered on screen.
//
// In SPA's the server's job is to give/post data whenever the framework
// asks it to. Otherwise the framework is responsible for figuring out what
// should be shown on screen.

app.listen(8080, () => console.log("listening!"));
