let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

function handleMove(index) {
  if (!board[index]) {
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].textContent = currentPlayer;
    if (checkWinner()) {
      document.getElementById("message").textContent = `Player ${currentPlayer} wins!`;
      disableBoard();
    } else if (!board.includes("")) {
      document.getElementById("message").textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById("message").textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function disableBoard() {
  const cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.onclick = null;
  }
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  const cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.textContent = "";
    cell.onclick = function() {
      const index = Array.from(cells).indexOf(cell);
      handleMove(index);
    };
  }
  document.getElementById("message").textContent = "Player X's turn";
}
