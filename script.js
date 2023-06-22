'use strict';

//seleccionamos el ID del primer jugador, para ello se usa el #
//en la segunda forma usamos getElementById, que es mas rapido que el querySelector
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const allScores = document.querySelectorAll('.current-score');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// scores has the 2 player's scores

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch next player
    if (dice !== 1) {
      // Add dice to current score, debe declararse fuera de la funcio
      // de no ser asi, se reiniciari cada vez se haga click
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //current0El.textContent = currentScore; -->solo selecciona el 0
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if player sccore >= 100
    if (scores[activePlayer] >= 50) {
      //Finish the Game
      playing = false;
      diceEl.classList.add('hidden');
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

const switchPlayer = function () {
  //switch next player
  //si el actual es 0, cambiar a 1, si no, a 0
  //se cambia el puntaje del actual a 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //usamos el metodo toggle (alternancia), agregara la clase si no esta
  //la elimina si esta
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const newBtn = function () {
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  if (
    document.querySelector('.player--0').classList.contains('player--winner')
  ) {
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
  } else {
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--1').classList.add('player--active');
  }
  currentScore = 0;
  allScores.forEach(function (score) {
    score.textContent = currentScore;
  });
};

btnNew.addEventListener('click', newBtn);
