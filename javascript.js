const WINNING_SCORE = 5;
let playerScore = 0;
let computerScore = 0;
let gameEnded = false;
const roundDisplay = document.querySelector('#round-display');
const scoreDisplay = document.querySelector('#score-display');
const gameEndDisplay = document.querySelector('#game-end-display');
const rockButton = document.querySelector('#rock-button');
const scissorsButton = document.querySelector('#scissors-button');
const paperButton = document.querySelector('#paper-button');

main();

function main() {
    rockButton.addEventListener('click', playRock);
    paperButton.addEventListener('click', playPaper);
    scissorsButton.addEventListener('click', playScissors);
    roundDisplay.textContent = 'Click Rock, Paper or Scissors!';
    updateGameStatus();
}

function playRock() {
    let playerHandGesture = Rock.getSingleInstance();
    playRound(playerHandGesture);
}

function playPaper() {
    let playerHandGesture = Paper.getSingleInstance();
    playRound(playerHandGesture);
}

function playScissors() {
    let playerHandGesture = Scissors.getSingleInstance();
    playRound(playerHandGesture);
}

function updateGameStatus() {
    let scoreDisplayString = `player: ${playerScore} computer: ${computerScore}.`;
    console.log(scoreDisplayString);
    scoreDisplay.textContent = scoreDisplayString;
    let gameEndDisplayString = '';
    if(playerScore == WINNING_SCORE) {
        gameEnded = true;
        gameEndDisplayString = 'You\'ve won the game!';
        console.log(gameEndDisplayString);
    } else if (computerScore == WINNING_SCORE) {
        gameEnded = true;
        gameEndDisplayString = 'The computer has won the game!';
        console.log(gameEndDisplayString);
    }
    gameEndDisplay.textContent = gameEndDisplayString;
}

function resetGameStatusIfNecessary() {
    if(gameEnded) {
        playerScore = 0;
        computerScore = 0;
        gameEnded = false;
    }
}

function playRound(playerHandGesture) {
    resetGameStatusIfNecessary();
    let computerHandGesture = getComputerHandGesture();
    let results = doPlayRound(playerHandGesture, computerHandGesture);
    console.log(results);
    roundDisplay .textContent = results;
    updateGameStatus();
}

function doPlayRound(playerHandGesture, computerHandGesture) {
    if (playerHandGesture.doesTieWith(computerHandGesture)) {
        return `Tie! You both chose ${computerHandGesture.getString()}!`;
    }
    if (playerHandGesture.beats(computerHandGesture)) {
        playerScore += 1;
        return `You won! ${playerHandGesture.getString()} beats ${computerHandGesture.getString()}!`;
    }
    computerScore += 1;
    return `You lost! ${playerHandGesture.getString()} is beaten by ${computerHandGesture.getString()}!`;
}

function parsePlayerSelectionString(playerSelectionString) {
    let formattedPlayerSelectionString = playerSelectionString.trim().toLowerCase();
    for (const handGesture of getAllHandGestures()) {
        if (handGesture.matchesLowerCaseString(formattedPlayerSelectionString)) {
            return handGesture;
        }
    }
    return null;
}

function getAllHandGestures() {
    return [Rock.getSingleInstance(), Paper.getSingleInstance(), Scissors.getSingleInstance()];
}

function getComputerHandGesture() {
    switch (getRandomInt(3)) {
        case 0:
            return new Rock();
            break;
        case 1:
            return new Paper();
            break;
        case 2:
            return new Scissors();
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class HandGesture {

    #string;

    constructor(string) {
        this.setString(string);
    }

    getString() {
        return this.#string;
    }

    setString(string) {
        this.#string = string;
    }

    equals(otherHandGesture) {
        return this.getString() == otherHandGesture.getString();
    }

    matchesLowerCaseString(lowerCaseString) {
        return this.getString().toLowerCase() == lowerCaseString;
    }

    doesTieWith(otherHandGesture) {
        return this.equals(otherHandGesture);
    }
}

class Rock extends HandGesture {

    static #singleInstance = new Rock();

    constructor() {
        super("Rock");
    }

    static getSingleInstance() {
        return this.#singleInstance;
    }

    beats(otherHandGesture) {
        return otherHandGesture.equals(Scissors.getSingleInstance());
    }
}

class Paper extends HandGesture {

    static #singleInstance = new Paper();

    constructor() {
        super("Paper");
    }

    static getSingleInstance() {
        return this.#singleInstance;
    }

    beats(otherHandGesture) {
        return otherHandGesture.equals(Rock.getSingleInstance());
    }
}

class Scissors extends HandGesture {

    static #singleInstance = new Scissors();

    constructor() {
        super("Scissors");
    }

    static getSingleInstance() {
        return this.#singleInstance;
    }

    beats(otherHandGesture) {
        return otherHandGesture.equals(Paper.getSingleInstance());
    }
}