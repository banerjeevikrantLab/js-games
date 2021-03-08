<!DOCTYPE html>

<html lang="en">

	<head>
		<title>Crazy Snake Game</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<link rel="stylesheet" href = "../css/template.css">
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script type="text/javascript" src="gameslib.js"></script>
		<style>
			body{
				background-color: lightblue;
			}
			.canvas{
				border: 3px solid black;
				top: 50px;
				position: relative;
				left: 10%;
			}
		</style>
	</head>
	
	
	<body>
		<h1 class = "game-heading">Crazy Snake Game</h1>

<canvas
width="400"
height="500"
class="canvas"></canvas>

<script>
window.onload = function() {

    


var POINTS_TEXT_X = 5;
var POINTS_TEXT_Y_BUFFER = 5;
var POINTS_FONT = "17pt Arial";

var scoreLabel = new Text(0, POINTS_FONT);
var score = 0;

var FOOD_DELAY = 6000;
var FOOD_RADIUS = 5;
var FOOD_COLOR = Color.red;

var snake;
var SNAKE_DIM = 10;
var SNAKE_COLOR = Color.green;
var spSnake = SNAKE_DIM / 9;

var NORTH = 0;
var EAST = 1;
var SOUTH = 2;
var WEST = 3;

var direction = EAST;

var DELAY = 80;

function start(){
    drawSnake();
    keyDownMethod(keyPress);
    
    setTimer(moveSnake, DELAY);
    setTimer(addFood, FOOD_DELAY);
    
    scoreLabel.setPosition(0 + POINTS_TEXT_X, getHeight() - POINTS_TEXT_Y_BUFFER);
    add(scoreLabel);
    
}

function drawSnake(){
    snake = new Rectangle(SNAKE_DIM, SNAKE_DIM);
    snake.setPosition(getWidth()/2, getHeight()/2);
    snake.setColor(SNAKE_COLOR);
    add(snake);
}

function keyPress(e){
    if (e.keyCode == Keyboard.UP){
        direction = NORTH;
    }
    if (e.keyCode == Keyboard.DOWN){
        direction = SOUTH;
    }
    if (e.keyCode == Keyboard.LEFT){
        direction = WEST;
    }
    if (e.keyCode == Keyboard.RIGHT){
        direction = EAST;
    }
}

function moveSnake(){
    var trail = new Rectangle(SNAKE_DIM, SNAKE_DIM);
	trail.setPosition(snake.getX(), snake.getY());
	trail.setColor(SNAKE_COLOR);
	add(trail);
	
	var newX = snake.getX();
	var newY = snake.getY();
    if(direction == NORTH){
        newY -= SNAKE_DIM;
    } 
    if(direction == SOUTH){
        newY += SNAKE_DIM;
    } 
    if(direction == WEST){
        newX -= SNAKE_DIM;
    } 
    if(direction == EAST){
        newX += SNAKE_DIM;
    } 
    newX =  (newX + getWidth()) % getWidth();
    newY =  (newY + getHeight()) % getHeight();
    var elem =  getElementAt(newX+5, newY+5);
	if(elem != null) {
	    if (elem.getType() == 'Rectangle') {
            youLose();
            return;
	    } else if (elem.getType() == 'Circle') {
	        score += 100;
	        remove(elem);
	    }
    }else{
        score += 1;
    }
    snake.setPosition(newX, newY);
    
    scoreLabel.setText(score);
}


function youLose(){
    var text = new Text("You Lose.", "40pt Arial");
    text.setPosition(70, 300);
    add(text);
    stopTimer(moveSnake);
    stopTimer(addFood);
}

function addFood(){
    var possFood = false;
    while(possFood == false){
        var numx = Randomizer.nextInt(1 + FOOD_RADIUS, getWidth() - FOOD_RADIUS);
        var numy = Randomizer.nextInt(1 + FOOD_RADIUS, getHeight() - FOOD_RADIUS);
        var x = numx  - (numx % 10) + 5;
        var y = numy  - (numy % 10) + 5;
        
        if(getElementAt(x, y) == null){
            possFood = true;
            var food = new Circle(FOOD_RADIUS);
            food.setColor(FOOD_COLOR);
            food.setPosition(x, y);
            
            add(food);
        }
    }
    
}



    if (typeof start === 'function') {
        start();
    }
};
</script>
	</body>
	
	
</html>