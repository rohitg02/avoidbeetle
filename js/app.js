//Global Variables
//Enemy position Y axis array
var enemyPositions = [50, 135, 220];

//Enemy position X axis
var enemyStartPositionX = -100;

//Player Initial Positions
var playerPosX = 200;
var playerPosY = 390;

//Player Score at the beginning of Game
var score = 0;

//Player lives at the beginning of the Game
var lives = 3;

//Reset function to calculate the remaining lives of the player and desplaying them on the page
function reset() {
    playerPosX = 200;
    playerPosY = 390;
    lives = lives - 1;

    var livesTotal = document.getElementById("livesNum");
    livesTotal.innerHTML = lives;
    if (lives === 0) {
        document.write("<h1>You Lost</h1><h3>Refresh to Replay</h3>");
    }
}

//scoreCal function to calculate the score of the player and desplaying them on the page
//display the win
function scoreCal() {
    playerPosX = 200;
    playerPosY = 390;
    score = score + 1;
    var scoreTotal = document.getElementById("scoreNum");
    scoreTotal.innerHTML = score;
    if (score === 5) {
        document.write("<h1>YEAAHHH YOU WON!!!</h1><h3>Refresh to Replay</h3>");
    }
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = enemyStartPositionX;
    this.y = enemyPositions[Math.floor(Math.random() * enemyPositions.length)];

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * Math.random() * (400));

    // see if player collides so reset the game
    if ((this.x - playerPosX > 0) && (this.x - playerPosX < 55) && this.y === playerPosY) {
        reset();
    }
    //reset enemy after the board
    if (this.x > 550) {
        this.x = enemyStartPositionX;
        this.y = enemyPositions[Math.floor(Math.random() * enemyPositions.length)];
    }



};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = playerPosX;
    this.y = playerPosY;
};

// Update the player's position
Player.prototype.update = function() {
    this.x = playerPosX;
    this.y = playerPosY;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Move the player according to the key input
Player.prototype.handleInput = function(input) {
        switch (input) {
            case 'up':
                if (playerPosY === 50) {
                    scoreCal();
                } else {
                    playerPosY = playerPosY - 85;
                }
                break;
            case 'down':
                if (playerPosY === 390) {
                    playerPosY = 390;
                } else {
                    playerPosY = playerPosY + 85;
                }
                break;

            case 'left':
                if (playerPosX === 0) {
                    playerPosX = 0;
                } else {
                    playerPosX = playerPosX - 100;
                }
                break;

            case 'right':
                if (playerPosX === 400) {
                    playerPosX = 400;
                } else {
                    playerPosX = playerPosX + 100;
                }
                break;
        }

    };
    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player

var pushAllAnimies = function(){
     allEnemies =[];
     for (var i = 0; i < 5; i++) {
        allEnemies.push(new Enemy());
     }
};
//Calling function to create Enemy object
pushAllAnimies();

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});