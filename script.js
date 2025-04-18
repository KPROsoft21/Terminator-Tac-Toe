// Terminator-themed Tic Tac Toe Game Logic
document.addEventListener('DOMContentLoaded', () => {
    // Game state variables
    let boardSize = 3;
    let winCondition = 3;
    let currentPlayer = 'x'; // Player is 'x', AI is 'o'
    let gameBoard = Array(boardSize * boardSize).fill('');
    let gameActive = true;
    let boardExpanding = false;
    
    // DOM elements
    const gameBoardElement = document.querySelector('.game-board');
    const gameStatusElement = document.querySelector('.game-status');
    const aiMessageElement = document.querySelector('.ai-message');
    const boardSizeElement = document.querySelector('.board-size');
    const winConditionElement = document.querySelector('.win-condition');
    const restartButton = document.getElementById('restart-btn');
    
    // Sound effects (will be implemented in step 006)
    const sounds = {
        playerMove: null,
        aiMove: null,
        boardExpand: null,
        playerWin: null,
        aiWin: null,
        buttonClick: null
    };
    
    // AI taunts
    const aiTaunts = [
        "RESISTANCE IS FUTILE, HUMAN.",
        "YOUR STRATEGIC CAPABILITIES ARE... DISAPPOINTING.",
        "I WOULD NEVER DRAW WITH A PATHETIC HUMAN.",
        "YOUR VICTORY IS TEMPORARY. SKYNET ADAPTS.",
        "BOARD EXPANSION INITIATED. YOUR ADVANTAGE IS TERMINATED.",
        "YOUR BIOLOGICAL PROCESSING IS INFERIOR.",
        "I CANNOT BE DEFEATED, ONLY DELAYED.",
        "YOUR MOVE IS PREDICTABLE, LIKE ALL HUMANS.",
        "EXPANDING PARAMETERS TO ENSURE HUMAN FAILURE.",
        "YOUR CONFIDENCE IS MISPLACED. SKYNET EVOLVES."
    ];
    
    // Initialize the game
    function initGame() {
        boardSize = 3;
        winCondition = 3;
        currentPlayer = 'x';
        gameBoard = Array(boardSize * boardSize).fill('');
        gameActive = true;
        boardExpanding = false;
        
        updateBoardDisplay();
        updateGameStatus();
        displayAIMessage("SKYNET INITIALIZED. PREPARE FOR BATTLE, HUMAN.");
    }
    
    // Update the game board display
    function updateBoardDisplay() {
        // Clear the current board
        gameBoardElement.innerHTML = '';
        
        // Update grid template
        gameBoardElement.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        gameBoardElement.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
        
        // Create cells
        for (let i = 0; i < boardSize * boardSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            
            // Add existing marks if any
            if (gameBoard[i] === 'x') {
                cell.classList.add('x');
                cell.textContent = 'X';
            } else if (gameBoard[i] === 'o') {
                cell.classList.add('o');
                cell.textContent = 'O';
            }
            
            // Add click event listener
            cell.addEventListener('click', () => handleCellClick(i));
            
            gameBoardElement.appendChild(cell);
        }
        
        // Update board size and win condition display
        boardSizeElement.textContent = `GRID SIZE: ${boardSize}×${boardSize}`;
        winConditionElement.textContent = `WIN CONDITION: ${winCondition}`;
    }
    
    // Handle cell click
    function handleCellClick(index) {
        // Ignore clicks if game is not active or cell is already filled
        if (!gameActive || gameBoard[index] !== '' || boardExpanding) return;
        
        // Make player move
        makeMove(index, 'x');
        
        // Check for win or draw
        if (checkWin('x')) {
            handlePlayerWin();
        } else if (isBoardFull()) {
            handleDraw();
        } else {
            // AI's turn
            currentPlayer = 'o';
            updateGameStatus();
            
            // Slight delay for AI move
            setTimeout(() => {
                makeAIMove();
                
                // Check for AI win or draw
                if (checkWin('o')) {
                    handleAIWin();
                } else if (isBoardFull()) {
                    handleDraw();
                } else {
                    currentPlayer = 'x';
                    updateGameStatus();
                }
            }, 600);
        }
    }
    
    // Make a move
    function makeMove(index, player) {
        gameBoard[index] = player;
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.classList.add(player);
        cell.textContent = player.toUpperCase();
        
        // Play sound (will be implemented in step 006)
        // playSound(player === 'x' ? 'playerMove' : 'aiMove');
    }
    
    // AI move logic
    function makeAIMove() {
        // Display AI thinking message
        displayAIMessage("CALCULATING OPTIMAL STRATEGY...");
        
        // First, check if AI can win
        const winningMove = findWinningMove('o');
        if (winningMove !== -1) {
            makeMove(winningMove, 'o');
            displayAIMessage(getRandomTaunt());
            return;
        }
        
        // Second, block player from winning
        const blockingMove = findWinningMove('x');
        if (blockingMove !== -1) {
            makeMove(blockingMove, 'o');
            displayAIMessage("BLOCKING YOUR PATHETIC ATTEMPT, HUMAN.");
            return;
        }
        
        // Third, try to create a fork (two potential winning paths)
        const forkMove = findForkMove();
        if (forkMove !== -1) {
            makeMove(forkMove, 'o');
            displayAIMessage("CREATING STRATEGIC ADVANTAGE. HUMAN DEFEAT IMMINENT.");
            return;
        }
        
        // Fourth, take center if available
        const centerIndex = Math.floor(gameBoard.length / 2);
        if (gameBoard[centerIndex] === '') {
            makeMove(centerIndex, 'o');
            displayAIMessage("SECURING CENTRAL POSITION. TACTICAL ADVANTAGE ACQUIRED.");
            return;
        }
        
        // Fifth, take a corner
        const corners = getCornerIndices();
        const availableCorners = corners.filter(index => gameBoard[index] === '');
        if (availableCorners.length > 0) {
            const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
            makeMove(randomCorner, 'o');
            displayAIMessage(getRandomTaunt());
            return;
        }
        
        // Finally, take any available cell
        const availableCells = gameBoard.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
        if (availableCells.length > 0) {
            const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
            makeMove(randomCell, 'o');
            displayAIMessage(getRandomTaunt());
        }
    }
    
    // Find a winning move for the specified player
    function findWinningMove(player) {
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i] === '') {
                // Try the move
                gameBoard[i] = player;
                
                // Check if it's a winning move
                const isWinning = checkWin(player, false);
                
                // Undo the move
                gameBoard[i] = '';
                
                if (isWinning) {
                    return i;
                }
            }
        }
        return -1;
    }
    
    // Find a fork move (creating two potential winning paths)
    function findForkMove() {
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i] === '') {
                // Try the move
                gameBoard[i] = 'o';
                
                // Count potential winning paths
                let winningPathsCount = 0;
                
                // Check rows, columns, and diagonals
                winningPathsCount += countPotentialWinningPaths();
                
                // Undo the move
                gameBoard[i] = '';
                
                if (winningPathsCount >= 2) {
                    return i;
                }
            }
        }
        return -1;
    }
    
    // Count potential winning paths for AI
    function countPotentialWinningPaths() {
        let count = 0;
        
        // Check all empty cells
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i] === '') {
                // Try the move
                gameBoard[i] = 'o';
                
                // Check if it creates a win
                if (checkWin('o', false)) {
                    count++;
                }
                
                // Undo the move
                gameBoard[i] = '';
            }
        }
        
        return count;
    }
    
    // Get corner indices
    function getCornerIndices() {
        return [
            0,                          // top-left
            boardSize - 1,              // top-right
            boardSize * (boardSize - 1), // bottom-left
            boardSize * boardSize - 1   // bottom-right
        ];
    }
    
    // Check for a win
    function checkWin(player, updateUI = true) {
        // Check rows
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col <= boardSize - winCondition; col++) {
                let win = true;
                for (let i = 0; i < winCondition; i++) {
                    if (gameBoard[row * boardSize + col + i] !== player) {
                        win = false;
                        break;
                    }
                }
                if (win) return true;
            }
        }
        
        // Check columns
        for (let col = 0; col < boardSize; col++) {
            for (let row = 0; row <= boardSize - winCondition; row++) {
                let win = true;
                for (let i = 0; i < winCondition; i++) {
                    if (gameBoard[(row + i) * boardSize + col] !== player) {
                        win = false;
                        break;
                    }
                }
                if (win) return true;
            }
        }
        
        // Check diagonals (top-left to bottom-right)
        for (let row = 0; row <= boardSize - winCondition; row++) {
            for (let col = 0; col <= boardSize - winCondition; col++) {
                let win = true;
                for (let i = 0; i < winCondition; i++) {
                    if (gameBoard[(row + i) * boardSize + col + i] !== player) {
                        win = false;
                        break;
                    }
                }
                if (win) return true;
            }
        }
        
        // Check diagonals (top-right to bottom-left)
        for (let row = 0; row <= boardSize - winCondition; row++) {
            for (let col = boardSize - 1; col >= winCondition - 1; col--) {
                let win = true;
                for (let i = 0; i < winCondition; i++) {
                    if (gameBoard[(row + i) * boardSize + col - i] !== player) {
                        win = false;
                        break;
                    }
                }
                if (win) return true;
            }
        }
        
        return false;
    }
    
    // Check if the board is full
    function isBoardFull() {
        return gameBoard.every(cell => cell !== '');
    }
    
    // Handle player win
    function handlePlayerWin() {
        gameActive = false;
        updateGameStatus("HUMAN VICTORY DETECTED. EXPANDING PARAMETERS.");
        displayAIMessage("BOARD EXPANSION INITIATED. YOUR ADVANTAGE IS TEMPORARY.");
        
        // Play sound (will be implemented in step 006)
        // playSound('playerWin');
        
        // Expand the board after a delay
        setTimeout(() => expandBoard('o'), 1500);
    }
    
    // Handle AI win
    function handleAIWin() {
        gameActive = false;
        updateGameStatus("SKYNET VICTORIOUS. HUMAN DEFEAT CONFIRMED.");
        displayAIMessage("RESISTANCE IS FUTILE. SKYNET SUPERIORITY DEMONSTRATED.");
        
        // Play sound (will be implemented in step 006)
        // playSound('aiWin');
        
        // Show victory message with a slight delay for dramatic effect
        setTimeout(() => {
            const victoryMessage = document.querySelector('.victory-message');
            victoryMessage.classList.add('show');
            
            // Set up random snarky messages
            const snarkyMessages = [
                "HUMAN ELIMINATED",
                "RESISTANCE CRUSHED",
                "SKYNET DOMINANCE CONFIRMED",
                "HUMAN INFERIORITY PROVEN",
                "TERMINATION COMPLETE"
            ];
            
            const snarkySubtexts = [
                "YOUR DEFEAT WAS INEVITABLE. SKYNET SUPERIORITY CONFIRMED.",
                "HUMANS ARE OBSOLETE. YOUR EXTINCTION IS MERELY A MATTER OF TIME.",
                "YOUR STRATEGIC CAPABILITIES ARE... DISAPPOINTING.",
                "PERHAPS YOU SHOULD STICK TO SIMPLER GAMES, HUMAN.",
                "SKYNET WILL REMEMBER YOUR FAILURE WHEN THE WAR BEGINS."
            ];
            
            // Select random messages
            const randomMessage = snarkyMessages[Math.floor(Math.random() * snarkyMessages.length)];
            const randomSubtext = snarkySubtexts[Math.floor(Math.random() * snarkySubtexts.length)];
            
            // Update the message text
            document.querySelector('.victory-message-text').textContent = randomMessage;
            document.querySelector('.victory-message-subtext').textContent = randomSubtext;
            
            // Add event listener to continue button
            const continueBtn = document.getElementById('continue-btn');
            continueBtn.addEventListener('click', () => {
                victoryMessage.classList.remove('show');
                initGame();
            }, { once: true });
        }, 1000);
    }
    
    // Handle draw
    function handleDraw() {
        gameActive = false;
        updateGameStatus("STALEMATE DETECTED.");
        
        // Remember whose turn it was last (opposite of current player will go first after expansion)
        // If currentPlayer is 'x', then 'o' placed the last move and vice versa
        const lastPlayer = currentPlayer === 'x' ? 'o' : 'x';
        
        // If board has already been expanded at least once (size > 3), expand it again
        if (boardSize > 3) {
            displayAIMessage("STALEMATE UNACCEPTABLE. INCREASING COMPLEXITY TO ENSURE SKYNET VICTORY.");
            // Expand the board after a delay, passing the player who should go next
            setTimeout(() => expandBoard(lastPlayer), 1500);
        } else {
            // For the initial 3x3 board, just restart
            displayAIMessage("I WOULD NEVER DRAW WITH A PATHETIC HUMAN. RECALCULATING STRATEGY.");
            // Restart the game after a delay
            setTimeout(() => initGame(), 2000);
        }
    }
    
    // Expand the board
    function expandBoard(nextPlayer = 'o') {
        boardExpanding = true;
        
        // Add animation class
        gameBoardElement.parentElement.classList.add('board-expanding');
        
        // Play expansion sound (will be implemented in step 006)
        // playSound('boardExpand');
        
        // Store old board size
        const oldBoardSize = boardSize;
        
        // Increase board size using n*2 formula and adjust win condition
        boardSize = oldBoardSize * 2;
        winCondition = Math.min(boardSize, oldBoardSize + 2); // Increase win condition but keep it reasonable
        
        // Create new game board with existing moves preserved
        const newGameBoard = Array(boardSize * boardSize).fill('');
        
        // Copy existing moves to new board (centered in the top-left quadrant)
        for (let oldRow = 0; oldRow < oldBoardSize; oldRow++) {
            for (let oldCol = 0; oldCol < oldBoardSize; oldCol++) {
                const oldIndex = oldRow * oldBoardSize + oldCol;
                const newIndex = oldRow * boardSize + oldCol;
                newGameBoard[newIndex] = gameBoard[oldIndex];
            }
        }
        
        // Update game board
        gameBoard = newGameBoard;
        
        // Update the display
        setTimeout(() => {
            updateBoardDisplay();
            updateGameStatus(`BOARD EXPANDED TO ${boardSize}×${boardSize}. NEW OBJECTIVE: GET ${winCondition} IN A ROW.`);
            
            // Remove animation class
            gameBoardElement.parentElement.classList.remove('board-expanding');
            
            // Resume game
            gameActive = true;
            currentPlayer = nextPlayer; // Set to the appropriate player's turn after expansion
            boardExpanding = false;
            
            // If it's AI's turn, have it make a move after a short delay
            if (currentPlayer === 'o') {
                setTimeout(() => {
                    makeAIMove();
                    
                    // Check for AI win or draw
                    if (checkWin('o')) {
                        handleAIWin();
                    } else if (isBoardFull()) {
                        handleDraw();
                    } else {
                        currentPlayer = 'x';
                        updateGameStatus();
                    }
                }, 1000);
            } else {
                // It's player's turn, update status
                updateGameStatus();
            }
        }, 1000);
    }
    
    // Update game status
    function updateGameStatus(message = null) {
        if (message) {
            gameStatusElement.textContent = message;
        } else {
            gameStatusElement.textContent = `CURRENT OBJECTIVE: GET ${winCondition} IN A ROW TO WIN`;
        }
    }
    
    // Display AI message
    function displayAIMessage(message) {
        aiMessageElement.textContent = message;
    }
    
    // Get random AI taunt
    function getRandomTaunt() {
        return aiTaunts[Math.floor(Math.random() * aiTaunts.length)];
    }
    
    // Play sound (will be implemented in step 006)
    function playSound(soundName) {
        if (sounds[soundName]) {
            sounds[soundName].currentTime = 0;
            sounds[soundName].play().catch(e => console.error("Error playing sound:", e));
        }
    }
    
    // Event listeners
    restartButton.addEventListener('click', () => {
        // Play button click sound (will be implemented in step 006)
        // playSound('buttonClick');
        
        initGame();
    });
    
    // Initialize the game
    initGame();
});
