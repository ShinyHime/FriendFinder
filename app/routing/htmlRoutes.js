// DEPENDENCIES

var path = require('path');

// Open: ROUTING TO HTML PAGES
module.exports = function(app){
    // Open: Route to survey html page
    app.get('/survey', function(req, res){
        res.sendFile(path.join(__dirname + '/../public/survey.html'));
    }); //Close: Route to survey html page
    
    // Open: Route to default home page
    app.use(function(req, res){
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    }); //Close: Route to default home page
    
}; //Close: ROUTING TO HTML PAGES