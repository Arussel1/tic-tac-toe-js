/* Player Information Handling */
const playerInfo = (() =>{
    let playerData = { player1: {}, player2: {} };
    const dialog = document.querySelector('dialog');
    const form = document.forms["playerName"];
    const choices = document.getElementsByName('choice');
    const p1 = document.querySelector('.p1');
    const p2 = document.querySelector('.p2');
    dialog.showModal();

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const name1 = form.name1.value;
        const name2 = form.name2.value;
        const choice1 = choices[0].checked ? choices[0].value : choices[1].value;
        const choice2 = choices[0].checked ? choices[1].value : choices[0].value;
        p1.innerHTML = name1 + ': ' + choice1;
        p2.innerHTML = name2 + ': ' + choice2;
        playerData.player1 = { name: name1, choice: choice1 };
        playerData.player2 = { name: name2, choice: choice2 };

        dialog.close();
    });
    return () => playerData;
})();

/* Gameboard Handler and Win Checking */
const Playground = (() => {
    let turn = 'player1';
    let turnCounter = 0;
    let board = Array(9).fill(null);
    const gameboard = document.querySelector('.gameBoard');
    const statusDisplay = document.querySelector('.status'); 

    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];
        for (let condition of winConditions) {
            if (condition.every(index => board[index] === board[condition[0]] && board[index] != null)) {
                return { winner: true, line: condition };
            }
        }
        return { winner: false };
    }

    function addWinLine(indexes) {
        indexes.forEach(index => {
            const winningCell = document.querySelector(`.cell[data-index="${index}"]`);
            winningCell.classList.add('win-highlight');
        });
    }
    function endGame(winner) {
        if (winner) {
            const winInfo = checkWin();
            addWinLine(winInfo.line);
        }
        gameboard.removeEventListener("click", handleCellClick);
        statusDisplay.textContent = winner ? winner + " wins!" : "It's a draw!";
    }

    function handleCellClick(event) {
        if (!event.target.classList.contains('cell') || turnCounter >= 9) return;
        
        let index = parseInt(event.target.getAttribute('data-index'));
        if (board[index] !== null) return;

        let currentPlayer = playerInfo()[turn];
        statusDisplay.textContent = currentPlayer.name + "'s turn";
        event.target.innerHTML = currentPlayer.choice;
        board[index] = currentPlayer.choice;
        turnCounter++;

        if (checkWin().winner) {
            endGame(playerInfo()[turn].name);
        } else if (turnCounter === 9) {
            endGame(null);
        } else {
            turn = (turn === 'player1' ? 'player2' : 'player1');
        }
    }

    gameboard.addEventListener("click", handleCellClick);
})();
