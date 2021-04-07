const TRIES = 3
var guess = 0
var secretNumber = 1 + Math.floor(Math.random() * 10);
var playerTries = TRIES
var correct = false
while (!correct && playerTries != 0){
  guess = parseInt(prompt("Try guessing the number from 1 to 10 that I'm thinking of!"));
  if (guess < secretNumber){
    alert("Try a larger number!");
    --playerTries;
  }
  else if (guess > secretNumber){
    alert("Try a smaller number!");
    --playerTries;
  }
  else{
    correct = true
  }
}
if (correct){
  alert("You were right, the number I was thinking was " + secretNumber + "!");
}
else{
  alert("Sorry, you're out of tries, the number I was thinking was " + secretNumber + ".");
}