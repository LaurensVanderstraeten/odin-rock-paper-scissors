function playRound(playerSelection, computerSelection) {
    formattedPlayerSelection = formatPlayerSelection(playerSelection);
    if (!formattedPlayerSelection) {
        return "Please enter either Rock, Paper or Scissors";
    }
    if (formattedPlayerSelection == computerSelection) {
        return `Tie! You both chose ${computerSelection}!`
    }
    let didPlayerWin;
    if (formattedPlayerSelection == "Rock") {
        didPlayerWin = computerSelection == "Scissors";
    } else if (formattedPlayerSelection == "Paper") {
        didPlayerWin = computerSelection == "Rock";
    } else {
        didPlayerWin = computerSelection == "Paper";
    }
    if (didPlayerWin) {
        return `You won! ${formattedPlayerSelection} beats ${computerSelection}!`
    }
    return `You lost! ${computerSelection} beats ${formattedPlayerSelection}!`
}

function formatPlayerSelection(playerSelection) {
    if (!playerSelection || playerSelection.length < 3) {
        return null;
    }
    let formattedPlayerSelection = playerSelection.trim().toLowerCase();
    formattedPlayerSelection = formattedPlayerSelection.charAt(0).toUpperCase()
        + formattedPlayerSelection.slice(1);
    if (formattedPlayerSelection != "Rock" && formattedPlayerSelection != "Paper" && formattedPlayerSelection != "Scissors") {
        return null;
    }
    return formattedPlayerSelection;
}

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