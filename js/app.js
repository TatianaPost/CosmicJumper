var rightCanvasEnd = 505;
var bottomCanvasEnd = 808;
var stepX = 101;
var stepY = 83;

//PARENT CLASS FOR FRIENDS AND ENEMIES CHARACTERS
var GameCharacter = function() {
};

//movement function
GameCharacter.prototype.update = function(dt) {
  if (this.x < rightCanvasEnd) {
    this.x += dt * this.speed;
  } else {
    this.x = -200;
  }
};

// Draw the enemy on the screen, required method for game
GameCharacter.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//inheritance
var inheritsFrom = function (child, parent) {
  child.prototype = Object.create(parent.prototype);
};

//ENEMIES
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width = 80;
  this.height = 50;
  this.sprite = "images/enemy-bug.png";
};

inheritsFrom(Enemy, GameCharacter);

//BIG ENEMIES
var BigEnemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width = 160;
  this.height = 50;
  this.sprite = "images/enemy-bug-big.png";
};

inheritsFrom(BigEnemy, GameCharacter);

//FRIENDS
var Friend = function(y, speed) {
  this.x = -300;
  this.y = y;
  this.speed = speed;
  this.width = 80;
  this.height = 50;
  this.sprite = "images/friend-ship.png";
};

inheritsFrom(Friend, GameCharacter);

//BIG
var BigFriend = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width = 160;
  this.height = 50;
  this.sprite = "images/friend-ship-big.png";
};

inheritsFrom(BigFriend, GameCharacter);

// PLAYER
var Player = function() {
  this.x = 213;
  this.y = 610;
  this.score = 0;
  this.lives = 5;
  this.width = 50;
  this.height = 60;
  this.speed = 70;
  this.sprite = "images/char-boy.png";
};

//Moves player to the start point
var resetPlayer = function() {
  player.x = 213;
  player.y = 610;
};

// Checks collisions with enemies and firends, restarts the game once won
Player.prototype.update = function(dt) {
  //if player meets the bug (comet) - restart
  var bug = checkCollisions(allEnemies);
  if (bug) {
    resetPlayer();
  }

  //if the player reaches the green toxic water area
  var ship = checkCollisions(allFriends);
  if (this.y < 200) {
    //move on the ship
    if (ship) {
      if (this.x < rightCanvasEnd) {
        this.x += dt * this.speed;
      } else {
        //if the right edge is reached - restart
        resetPlayer();
      }
      //if green water is reached - restart
    } else {
      resetPlayer();
    }
  }

  //if the end of the game is reached - restart
  if (this.y <= 0) {
    resetPlayer();
  }
};

//draws the player
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method, allows to move the player on canvas
Player.prototype.handleInput = function(direction) {
  if (direction === "left" && this.x > 50) {
    this.x -= 101;
  }
  if (direction === "right" && this.x < 400) {
    this.x += 101;
  }
  if (direction === "up" && this.y > 0) {
    this.y -= 83;
  }
  if (direction === "down" && this.y < 600) {
    this.y += 83;
  }
};

//instaniates player
var player = new Player();

//instantiates enemies
var allEnemies = [
  new Enemy(-500, 300, 150),
  new Enemy(-100, 380, 270),
  new Enemy(-500, 380, 120),
  new Enemy(-500, 460, 100)
];

var bigEnemy1 = new BigEnemy(-100, 300, 200);
var bigEnemy2 = new BigEnemy(-100, 460, 220);
allEnemies.push(bigEnemy1);
allEnemies.push(bigEnemy2);

//instaniates friends
var allFriends = [
  new BigFriend(-580, 220, 70),
  new BigFriend(-500, 140, 70)
];

var friend = new Friend(220, 70);
var friend2 = new Friend(140, 70);
allFriends.push(friend);
allFriends.push(friend2);

//function checking collisions
var checkCollisions = function(array) {
  for (var i = 0; i < array.length; i++) {
    if (
      array[i].x < player.x + player.width &&
      array[i].x + array[i].width > player.x &&
      array[i].y < player.y + player.height &&
      array[i].height + array[i].y > player.y
    ) {
      return array[i];
    }
  }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

//Function, preventig default page scrolling when arrow keys are pressed
//Function provided by Zeta at https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
