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

	app.post('/api/friends', function(req, res){

		var bestFriend = {
			name: "",
			image: "",
			matchDif: 1000
		};
		var userInfo = req.body;
		var userScores = userInfo.scores;

		var totalDiff = 0;

		for(var i = 0; i < [friends].length; i++){
            
            totalDiff = 0;

		
			for(var j = 0; j < friends[i].scores[j]; j++){
				
				totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
				
				if (totalDiff <= bestFriend.matchDif){
					bestFriend.name = friends[i].name;
					bestFriend.image = friends[i].photo;
					bestFriend.matchDif = totalDiff;
				}
			}
		}

		friends.push(userInfo);
 
		res.json(bestFriend);
	});
};