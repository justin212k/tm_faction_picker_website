function fetchGameState() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var game_state = JSON.parse(xhr.response);
      var factions = [];
      for(var key in game_state.factions) {
          factions.push(key);
      }
      window.localStorage.factions = factions;
      document.getElementById("game_state").innerHTML =
      "Existing factions are: " + factions.toString() + ".";
    }
  };
  // instead of having a backend, we proxy the HTTP request with cors-anywhere
  xhr.open("POST", "https://cors-anywhere.herokuapp.com/https://terra.snellman.net/app/view-game/");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var payload = "game=" + document.getElementById("game_id").value;
  xhr.send(payload);
}

function fetchRecommendedFaction() {
  // todo: call the yet to be built recommender
  var recommended_faction = "darklings!";
  if (window.localStorage.factions.includes("darklings")) {
    recommended_faction = "¯\\_(ツ)_/¯";
  }
  document.getElementById("recommended_faction").innerHTML =
  "You should be: " + recommended_faction;
  // todo: add spinny from snellman to build anticipation
}
