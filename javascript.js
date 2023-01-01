function playRound(playerHandGesture, computerHandGesture) {
    if (playerSelection.doesTieWith(computerHandGesture)) {
        return `Tie! You both chose ${computerHandGesture.getString()}!`;
    }
    if (playerSelection.beats(computerSelection)) {
        return `You won! ${playerHandGesture.getString()} beats ${computerHandGesture.getString()}!`;
    }
    return `You lost! ${playerHandGesture.getString()} is beaten by ${computerHandGesture.getString()}!`;
}

function parsePlayerSelection(playerSelectionString) {
    let formattedPlayerSelectionString = playerSelectionString.trim().toLowerCase();
    if (Rock.getSingleInstance().matchesLowerCaseString(formattedPlayerSelectionString)) {
        return Rock.getSingleInstance();
    } else if ((Paper.getSingleInstance()).matchesLowerCaseString(formattedPlayerSelectionString)) {
        return Paper.getSingleInstance();
    } else if ((Scissors.getSingleInstance()).matchesLowerCaseString(formattedPlayerSelectionString)) {
        return Scissors.getSingleInstance();
    }
    return null;
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