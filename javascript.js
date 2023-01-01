const numberOfRounds = 5;
let numberOfRoundsPlayed = 0;
let playerScore = 0;
let computerScore = 0;


function game() {
    for (let roundNumber = 0; roundNumber < numberOfRounds; roundNumber++) {
        let playerHandGesture;
        while (!playerHandGesture) {
            let playerSelectionString = prompt("Enter Rock, Paper or Scissors!");
            playerHandGesture = parsePlayerSelectionString(playerSelectionString);
        }
        computerHandGesture = getComputerHandGesture();
        console.log(playRound(playerHandGesture, computerHandGesture));
    }
    console.log (`player: ${playerScore} computer: ${computerScore}`);
}

function playRound(playerHandGesture, computerHandGesture) {
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