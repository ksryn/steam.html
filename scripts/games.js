function renderPlay(id, name) {
	return "<a href=\"steam://rungameid/"+id+"\">"+name+"</a>";
}

function render(gi) {
	var xx = "<h1>Total games: "+gi.gamesCount+"</h1>";
	var map = {};
	for (var i = 0; i < gi.games.length; i++) {
		var g = gi.games[i];
		map[g.appid] = [g.name, ""];
	}
	
	var categorizedGamesCount = 0;
	for (var cat in gi.categorizedGames) {
		var xs = gi.categorizedGames[cat];
		xx += "<div><h1>"+cat+" ("+xs.length+")</h1>";
		xx += "<table><tr><th>appid</th><th>game</th></tr>";
		for (var j = 0; j < xs.length; j++) {
			var g = xs[j];
			var name = map[g][0];
			var tags = map[g][1];
			tags += cat;
			map[g][1] = tags;
			xx += "<tr><td>"+g+"</td><td>"+renderPlay(g, name)+"</td></tr>";
			categorizedGamesCount += 1;
		}
		xx += "</table></div>";
	}
	
	xx += "<div><h1>UNCATEGORIZED ("+(gi.gamesCount - categorizedGamesCount)+")</h1>";
	xx += "<table><tr><th>appid</th><th>game</th></tr>";
	gi.games.sort(function(a,b) { return a.name.localeCompare(b.name); });
	for (var i = 0; i < gi.games.length; i++) {
		var g = gi.games[i];
		var name = map[g.appid][0];
		var tags = map[g.appid][1];
		if (tags === "") {
			xx += "<tr><td>"+g.appid+"</td><td>"+renderPlay(g.appid, name)+"</td></tr>";
		}
	}
	xx += "</table></div>";
	$("#games" ).html( xx );
}

// wrapper
function get(url) {
	return $.ajax({url: url, cache: false});
}

// init on page load
function init() {
	var d0 = get("data/steam-api.json");
	var d1 = get("data/owned-games.json");
	var d2 = get("data/categorized-games.json");
	$.when(d0, d1, d2)
	.done(function(r0, r1, r2) {
		console.log('x0');
		console.log(r0);
		console.log('x1');
		console.log(r1);
		console.log('x2');
		console.log(r2);
		var q = r0[0];
		var x = r1[0];
		var y = r2[0];
		
		// api ui
		var steam = {};
		steam.id = q.steamid;
		steam.key = q['api-key'];
			
		var xx = "";
		xx += "<p>Steam ID: <input type='text' id='steamid' value='"+steam.id+"' /></p>";
		xx += "<p>Steam API Key: <input type='text' id='api-key' value='"+steam.key+"' /></p>";
		xx += "<p><a href='#' id='generate' name='generate'>Generate Games List Link</a> | <a href='#' id='download' name='download'>Download Games List</a></p>";
		$("#api").html(xx);
		
		// api gen
		$('#generate').on('click', function(e) {
			var url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+$('#api-key').val()+"&steamid="+$('#steamid').val()+"&format=json&include_appinfo=1";
			$('#download').attr('href', url);
		});
		
		// games list
		var gi = {};
		gi.games = x.response.games;
		gi.gamesCount = x.response.game_count;
		gi.categorizedGames = y;
	
		render(gi);
	}).fail(function(x) {
		if (x == d0) { $("#api").html("<p class='warn'>steam-api.json not available in the data folder.</p>"); }
		if (x == d1) { $("#games").html("<p class='warn'>owned-games.json not available in the data folder.</p>"); }
		if (x == d2) { $("#games").html("<p class='warn'>categorized-games.json not available in the data folder.</p>"); }
	});
}