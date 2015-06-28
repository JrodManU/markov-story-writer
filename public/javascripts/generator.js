$(document).ready(function() {
  $("#writeStory").click(function() {
    var originalStory = $("#originalStory").val();

    var generatedStory = generateStory(originalStory);

    $("#generatedHeader").text("Generated Story:");
    $("#generatedStory").html(generatedStory);
    $("#generatedStory").html($("#generatedStory").html().replace(/&nbsp;/g, ''));
  });

  function generateStory(originalStory) {
    originalStory = originalStory.replace(/[\n\r]/g, '</p><p>');
    var words = originalStory.split(" ");
    var map = {};
    var count = 0;

    for(var i = 0; i < words.length; i++) {
      if(!map[words[i] + " " + words[i + 1]]) {
        count++;
        map[words[i] + " " + words[i + 1]] = new Array();
      }
      if(words[i + 2]) {
        map[words[i] + " " + words[i + 1]].push(words[i + 2]);
      } else {
        map[words[i] + " " + words[i + 1]].push(null);
      }
    }

    var generatedStory = "";
    var pairs = Object.keys(map);
    var currentPair = pairs[Math.floor(Math.random() * pairs.length)];
    var firstWord = currentPair.split(" ")[0];
    var secondWord = currentPair.split(" ")[1];
    generatedStory += "<p>" + firstWord.charAt(0).toUpperCase() + firstWord.slice(1); + " ";
    generatedStory += " " + secondWord;
    while(map[currentPair][0]) {
      firstWord = secondWord;
      secondWord = map[currentPair][Math.floor(Math.random() * map[currentPair].length)];
      generatedStory += " " + secondWord;
      currentPair = firstWord + " " + secondWord;
    }
    generatedStory += "</p>";
    return generatedStory;
  }
});
