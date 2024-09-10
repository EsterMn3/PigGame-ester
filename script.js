'use strict';
//make the dice dissappear and the scores to 0 for each player

//seleting elements
//for the background color change, add and remove the player--actve class
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//initialization function, when we reload the page and when the button new game is clicked
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; //to close the game when one player wins

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner'); //we remove it to both players to be sure
  player1El.classList.remove('player--winner');
  //we dont know who the acctive player is, but the first player, in the begining of each game, will be active
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); //when the page reloads
const switchPlayer = function () {
  //switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0; //when the dice is 1, the current score of that player should get down to 0
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //if the current player is 0 then the next one should be one
  //to change the background color, to ephasise the currentplayer
  player0El.classList.toggle('player--active'); //ttoggle:if the class is there it deletes it , if its not it adds the class
  player1El.classList.toggle('player--active');
};
//rolling dice functionality
btnRoll.addEventListener('click', function () {
  //this should only be excecuted if the players are playing
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; //set the src of the image

    //3.Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to current player's score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//hold
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active players score above
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if players score is >=100
    if (scores[activePlayer] >= 20) {
      //finish the game, display the player winner class
      playing = false; //game is done, the buttons will be deactivated
      diceEl.classList.add('hidden'); //hides the dice when the game is done
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
