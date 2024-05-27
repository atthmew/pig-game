'use strict';
// Variables
const player0 = document.querySelector('.player0');
const player1 = document.querySelector('.player1');
const player0Score = document.getElementById('player0-score');
const player1Score = document.getElementById('player1-score');
const player0CurrentScore = document.getElementById('player0-currentScore');
const player1CurrentScore = document.getElementById('player1-currentScore');
const dice = document.querySelector('.dice');
const scoreTab = document.querySelector('.scoreContainer');
const start = document.querySelector('.start');
const openingContainer = document.querySelector('.openingContainer');
const parentContainer = document.querySelector('.parentContainer');
const playAgain = document.querySelector('.playAgain');
const overlay = document.querySelector('.overlay');
const yes = document.querySelector('.yes');
const goToMainMenu = document.querySelector('.goToMainMenu');
const p0TabScore = document.querySelector('.p0Score');
const p1TabScore = document.querySelector('.p1Score');

// BUTTONS
const rollDice = document.querySelector('.rollDice');
const hold = document.querySelector('.hold');
const newGame = document.querySelector('.newGame');

let scores, activePlayer, currentScore, playing, diceRoll, p0ScoreOnTab, p1ScoreOnTab;

// Main Menu Function
const mainMenu = function () {
	openingContainer.classList.add('hidden');
	playAgain.classList.add('hidden');
	overlay.classList.add('hidden');
	parentContainer.classList.remove('hidden');
};
// Button for Start Game
start.addEventListener('click', mainMenu);

// Initialization of variables
const init = function () {
	// Official Score of both Players
	scores = [0, 0];
	// Active Player Indicator
	activePlayer = 0;
	// Current Score Variable
	currentScore = 0;
	// Variable for new game
	playing = true;

	player0CurrentScore.textContent = 0;
	player1CurrentScore.textContent = 0;
	player0Score.textContent = 0;
	player1Score.textContent = 0;
	dice.classList.add('hidden');
	document.querySelector('.player0').classList.add('active-player');
	document.querySelector('.player1').classList.remove('active-player');
	document.querySelector('.player0').classList.remove('winner');
	document.querySelector('.player1').classList.remove('winner');
};
// Calling the function
init();

// Score on Tab Initializing
const resetGame = function () {
	p0ScoreOnTab = 0;
	p1ScoreOnTab = 0;
	p0TabScore.textContent = 0;
	p1TabScore.textContent = 0;
};
resetGame();

// Roll the Dice Function
const rollingTheDice = function () {
	if (playing) {
		diceRoll = Math.trunc(Math.random() * 6) + 1;
		dice.classList.remove('hidden');
		dice.src = `dice-${diceRoll}.png`;
		if (diceRoll !== 1) {
			// Store and Output the equivalent score.
			currentScore += diceRoll;
			document.getElementById(`player${activePlayer}-currentScore`).textContent = currentScore;
		} else {
			switchPlayer();
		}
	}
};

// Switch Player Function
const switchPlayer = function () {
	currentScore = 0;
	document.getElementById(`player${activePlayer}-currentScore`).textContent = 0;
	player0.classList.toggle('active-player');
	player1.classList.toggle('active-player');
	if (activePlayer === 0) {
		activePlayer = 1;
	} else {
		activePlayer = 0;
	}
};

// Hold Score Function
const holdScore = function () {
	if (playing) {
		scores[activePlayer] += currentScore;
		document.getElementById(`player${activePlayer}-score`).textContent = scores[activePlayer];
		if (scores[activePlayer] >= 20) {
			document.querySelector(`.player${activePlayer}`).classList.remove('active-player');
			dice.classList.add('hidden');
			document.querySelector(`.player${activePlayer}`).classList.add('winner');
			currentScore = 0;
			document.getElementById(`player${activePlayer}-currentScore`).textContent = 0;
			playing = false;

			// Adding Score to Winner
			if (activePlayer === 0) {
				p0ScoreOnTab += 1;
				document.querySelector(`.p${activePlayer}Score`).textContent = p0ScoreOnTab;
				if (p0ScoreOnTab >= 5) {
					playAgain.classList.remove('hidden');
					overlay.classList.remove('hidden');
				}
			} else {
				p1ScoreOnTab += 1;
				document.querySelector(`.p${activePlayer}Score`).textContent = p1ScoreOnTab;
				if (p1ScoreOnTab >= 5) {
					playAgain.classList.remove('hidden');
					overlay.classList.remove('hidden');
				}
			}
		} else {
			switchPlayer();
		}
	}
};

// Roll Dice Function
rollDice.addEventListener('click', rollingTheDice);

// Hold the Score Function
hold.addEventListener('click', holdScore);

// New Game Function
newGame.addEventListener('click', init);

// Score Tab
document.addEventListener('keydown', function (e) {
	if (e.key === 'Tab' && scoreTab.classList.contains('hidden')) {
		scoreTab.classList.remove('hidden');
	} else if (e.key === 'Tab' && !scoreTab.classList.contains('hidden')) {
		scoreTab.classList.add('hidden');
	}
});

// Yes Play Again
yes.addEventListener('click', function () {
	playAgain.classList.add('hidden');
	overlay.classList.add('hidden');
	init();
	resetGame();
});

goToMainMenu.addEventListener('click', function () {
	playAgain.classList.add('hidden');
	overlay.classList.add('hidden');
	parentContainer.classList.add('hidden');
	openingContainer.classList.remove('hidden');
	init();
});
