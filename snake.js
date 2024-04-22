
//board
var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//food
var foodX;
var foodY;

//Speed
var velocityX = 0;
var velocityY = 0;

var gameOver = false;
var snakeBody = [];
var myScore = 0; 
var scores = [];

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d");
    
    placeFood();
    document.addEventListener('keyup', changeDirection)
    //update();
    setInterval(update, 1000/10);
    //startover
    var startOverBtn = document.getElementById("startOverBtn");
    startOverBtn.addEventListener("click", function() {
        resetScores();;
        startGame();
        hideMessage(); // Hide the message when starting over
    });
}

function gameOver() {
    var messageContainer = document.getElementById("messageContainer");
    messageContainer.innerText = "Game Over! Press 'Start Over' to play again.";
    messageContainer.style.display = "block";
    myScore = 0;
    gameOver = true;
    resetScores();
}

function resetScores() {
    scores = [];
}
function hideMessage() {
    var messageContainer = document.getElementById("messageContainer");
    messageContainer.style.display = "none";
}

function startGame() {
    gameOver = false;
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    placeFood();
    var scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.textContent = 0;
}

function update() {

    if (gameOver) {
        myScore = 0;
        return;
    }
    // Clear the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    
    // Draw the snake
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX , snakeY , blockSize , blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    
    // Draw the food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize , blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();  
        updateScore();
    }

    function updateScore() {
        scores.unshift(myScore);
        if (scores.length > 10) {
            scores.pop();
        }
        myScore += 1;
        var scoreDisplay = document.getElementById("scoreDisplay")
        scoreDisplay.textContent = myScore;
        scoreDisplay.textContent = scores.join(", ");
    }

    function resetScores() {
        scores = [];
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length > 0) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Check if the snake hit the wall
    if (snakeX < 0 || snakeX >= board.width || snakeY < 0 || snakeY >= board.height) {
        gameOver = true;
        alert("Game Over");
    }
    // Check if the snake hit itself
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}



function changeDirection(e) {
    if (e.code == 'ArrowUp'&& velocityY != 1 ) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == 'ArrowDown' && velocityY != -1 ) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == 'ArrowLeft' && velocityX != 1 ) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

//random food
function placeFood(){
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
