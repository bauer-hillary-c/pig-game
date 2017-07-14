/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function() {
  // 1. Radndom number
  var dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the results
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';

  // 3. Update the round score IF the rooled number was NOT a 1
  if (dice !== 1) {
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
  // Add CURRENT score to GLOBAL score
  scores[activePlayer] += roundScore;

  // Update UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  // Check if player won
  if (scores[activePlayer] >= 100) {
    document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
    document.querySelector('.dice').style.display = 'none';
    document .querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document .querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  } else {
    nextPlayer();
  }
});

function nextPlayer() {
    document.getElementById('current-' + activePlayer).textContent = '0';
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

/*

document.querySelector('#current-' + activePlayer).innerHTML = dice --another way to write the above line so you can pass in html

var x = document.querySelector('#score-1').textContent; --how to read the textContent
*/
