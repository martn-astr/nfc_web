   let board = [];
        let currentPlayer = 'X'; // Hráč 'X' začíná
        let gameEnded = false;
        let gameMode = 0; // 1 - s botem, 2 - 2 hráči
        let moves = [];

        function startGame(mode) {
            gameMode = mode;
            gameEnded = false;
            board = Array(9).fill(null); // Inicializace prázdného pole
            moves = [];
            currentPlayer = 'X';
            document.getElementById('message').textContent = "Na tahu hráč X";
            console.log('render called')
            renderBoard();
        }

        function renderBoard() {
            const boardDiv = document.querySelector('.board');
            console.log('render in ', boardDiv)
            boardDiv.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = board[i] || '';
                cell.onclick = () => handleMove(i);
                boardDiv.appendChild(cell);
            }
        }

        function handleMove(index) {
            if (gameEnded || board[index]) return;

            board[index] = currentPlayer;
            moves.push(index);
            renderBoard();
            checkWinner();

            if (!gameEnded) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                document.getElementById('message').textContent = `Na tahu hráč ${currentPlayer}`;

                if (gameMode === 1 && currentPlayer === 'O' && !gameEnded) {
                    setTimeout(botMove, 500); // Simulace tahu bota s malým zpožděním
                }
            }
        }

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontálně
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikálně
                [0, 4, 8], [2, 4, 6] // Diagonálně
            ];

            for (let combination of winningCombinations) {
                const [a, b, c] = combination;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    gameEnded = true;
                    document.getElementById('message').textContent = `Vyhrál hráč ${board[a]}!`;
                    return;
                }
            }

            if (moves.length === 9) {
                gameEnded = true;
                document.getElementById('message').textContent = "Remíza!";
            }
        }

        function botMove() {
            if (gameEnded) return;

            let availableMoves = [];
            for (let i = 0; i < 9; i++) {
                if (!board[i]) availableMoves.push(i);
            }

            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            board[randomMove] = 'O';
            moves.push(randomMove);
            renderBoard();
            checkWinner();

            if (!gameEnded) {
                currentPlayer = 'X';
                document.getElementById('message').textContent = "Na tahu hráč X";
            }

        }