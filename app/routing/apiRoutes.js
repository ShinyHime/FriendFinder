// DEPENDENCIES

// Friend info is required from friends.js
var friends = require("../data/friends");

// variable needed to find the difference between all the survey questions
var totalDiff = 0;

module.exports = function(app){

    // Open: Gets information from friends API
	app.get('/api/friends', function(req, res){
		res.json(friends);
	}); // Close: Gets information from friends API

	// Open: Posts results to friends api
	app.post('/api/friends', function(req, res){

		// variables needed for logic
		// this best friend variable holds the info for the user's current best friend
		// match diff is a high arbitrary number used as a placeholder
		var bestFriend = {
			name: "",
			image: "",
			matchDif: 100
		};

		// getting user information, as an object, from the html
		var userInfo = req.body;
		// storing the user's score into a variable
		var userScores = userInfo.scores;

		// initialize total difference
		var totalDiff = 0;

		// Open: Loop to go through every single friend on the list
		for(var i = 0; i < friends.length; i++){
            
            totalDiff = 0;

			// Open: Loop through the current friend in the loops' scores
			for(var j = 0; j < friends[j].scores[j]; j++){
				
				// logic to find the difference of the users scores and the friends scores
				totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// results added to the console
				console.log("Friend Name: " + friends[i].name + " || Total Difference: " + totalDiff);
				
				// if the total difference is less than or equal to the current best friend
				// then that pokemon's info will be updated as the new best friend
				if (totalDiff <= bestFriend.matchDif){
					bestFriend.name = friends[i].name;
					bestFriend.image = friends[i].photo;
					bestFriend.matchDif = totalDiff;
				}
			} // Close: Loop through all of the stored friends scores


		} // Close: Loop to go through every single friend on the list
		
		// spacing out results on command line
		console.log("");

		// push user info into friends array to store them for future use
		friends.push(userInfo);
 
		// best friend object can be used for on the front end now
		res.json(bestFriend);
	});
};