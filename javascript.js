function getComputerChoice() {
    let computerChoice;
    switch (getRandomInt(3)) {
        case 0:
            computerChoice = "Rock";
            break;
        case 1:
            computerChoice = "Paper";
            break;
        case 2:
            computerChoice = "Scissors";
    }
    return computerChoice;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}