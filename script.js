'use strict';

const score0El = document.getElementById( 'score--0' );
const score1El = document.getElementById( 'score--1' );
const diceEl = document.querySelector( '.dice' );
const btnRoll = document.querySelector( '.btn--roll' );
const current0El = document.getElementById( 'current--0' );
const current1El = document.getElementById( 'current--1' );
const player0El = document.querySelector( '.player--0' );
const player1El = document.querySelector( '.player--1' );
const btnHold = document.querySelector( '.btn--hold' );

let currentScore, activePlayer;

const switchPlayer = function () {
    document.getElementById( `current--${ activePlayer }` ).textContent = 0;
    currentScore = 0;
    activePlayer = ( activePlayer === 0 ) ? 1 : 0;
    player0El.classList.toggle( 'player--active' );
    player1El.classList.toggle( 'player--active' );
};

// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
currentScore = 0;
activePlayer = 0;
const score = [ 0, 0 ];
diceEl.classList.add( 'hidden' );

//Rolling dice
btnRoll.addEventListener( 'click',
    function () {
        const dice = Math.trunc( Math.random() * 6 + 1 );
        console.log( dice );

        //Display dice
        diceEl.classList.remove( 'hidden' );
        diceEl.src = `dice_imgs/dice-${ dice }.png`;

        // Check for rolled 1
        if ( dice !== 1 ) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById( `current--${ activePlayer }` ).textContent =
                currentScore;
        }
        else {
            // Switch palyer
            switchPlayer()
        }
    } );

btnHold.addEventListener( 'click',
    function () {
        // Add current score to active player's score
        score[ activePlayer ] += currentScore;
        document.getElementById( `score--${ activePlayer }` ).textContent =
            score[ activePlayer ];
        if ( score[ activePlayer ] >= 100 ){ // Check for winner
            document
                .querySelector( `.player--${ activePlayer }` )
                .classList.add( 'player--winner' );
            document
                .querySelector( `.player--${ activePlayer }` )
                .classList.remove( 'player--active' );
        }
        else {
            //switch player
            switchPlayer();
        }
    } );