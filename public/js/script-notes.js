//here is where all vue code will go
(function() {
    new Vue({
        el: ".main",
        data: {
            name: "jules",
            userInfo: {
                favoriteFood: "carbonara",
                nationality: "romanian",
                color: "red"
            },
            cities: [] //closing cities
        }, //closes data
        mounted: function() {
            var self = this;
            //var that = this; -- you might see this in documentation
            //we're gonna make first ajax request to our server using
            //the axios library

            //it's making a GET /cities request
            //axios is our client now. IT makes the requests to
            //our server! which means it receives the response
            console.log("this:", this);
            // this.name = "layla arias";
            // this is a var that represents the
            //object we're currently in (in this case Vue)
            axios
                .get("/cities")
                .then(function(resp) {
                    //this looses it's meaning in nested scopes
                    //we need to tell "this" to always refer to "Vue$3"
                    //not window
                    console.log("resp.data:", resp.data);
                    //resp.cities = cities array in data
                    //resp.data = cities array we got from a server
                    self.cities = resp.data;
                    // self.name = "layla arias";
                    console.log("self:", self);
                    //this then function will run whenever
                    //we get a response from the server
                })
                .catch(function(err) {
                    console.log("err in GET /cities: ", err);
                });
        }, //closes mounted function
        methods: {
            //every signle function that runs in response to an event must be
            //defined in methods
    }); //closes new Vue
})();
//mountedL runs after HTML has loaded. It's a "lifecycle method"
//In mounted we're going to make ajax requests to get data
//the user wants to see the initial moment the page is loaded
//if you're ever in a situation in which you want to render info the
//moment the page is rendered...you'll prob want to fetch that
//data in the "mounted" function!

//PROPERTIES OF DATA BECOME PROPERTIES OF THIS
