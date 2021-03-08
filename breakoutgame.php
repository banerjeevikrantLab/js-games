<!DOCTYPE html>

<html lang="en">

	<head>
		<title>Breakout Game</title>
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
		<h1 class = "game-heading">Breakout Game</h1>

<canvas
width="400"
height="500"
class="canvas"></canvas>

<script>
window.onload = function() {

    /* Constants for bricks */
var NUM_ROWS = 8;
var BRICK_TOP_OFFSET = 10;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 10;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;
var x = BRICK_SPACING;
var y = BRICK_TOP_OFFSET;
var timerOn = false;
var ballCount = 1;
var brickRemoved = 0;

/* Constants for ball and paddle */
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;
var paddle = new Rectangle(PADDLE_WIDTH, PADDLE_HEIGHT);
var BALL_RADIUS = 15;
var ball = new Circle(BALL_RADIUS);
var dx = 4;
var dy = 4; 


function start(){
    drawRowBricks();
    ball.setPosition(getWidth()/2, getHeight()/2);
    ball.setColor(Color.red);
    add(ball);
    mouseClickMethod(ballTimer);
    
    mouseMoveMethod(drawPaddle);
    setBackgroundColor(Color.black);
    
}
function ballTimer(){
    if (timerOn == false) {
        setTimer(drawBall, 25);
        timerOn = true;
    }
}
function drawPaddle(e){
    paddle.setPosition(e.getX() - (PADDLE_WIDTH/2), getHeight() - PADDLE_HEIGHT);
    paddle.setColor(Color.yellow);
    add(paddle);
}
function drawBall(){
    checkWall();
    ball.move(dx, dy);
}
function checkWall(){
	if(ball.getX() + ball.getRadius() > getWidth()){
		dx = -dx;
	}
	
	// Bounce off left wall
	if(ball.getX() - ball.getRadius() < 0){
		dx = -dx;
	}
	
	// Bounce off bottom wall

	if(ball.getY() + ball.getRadius() > getHeight()){
	    ballCount++;
	    var ball_color = Randomizer.nextColor();
	    ball.setColor(ball_color);
	    if(ballCount > 3){
	        lostText();
	    }else {
    		ball.setPosition(getWidth()/2, getHeight()/2);
    		stopTimer(drawBall);
    		timerOn = false;
	    }
	}
	else if(ball.getY() + ball.getRadius() > getHeight() - PADDLE_HEIGHT){
	    if (ball.getX() >= paddle.getX()  && ball.getX() <= paddle.getX() + PADDLE_WIDTH){
	        dy = -dy;
	        var ballColor = Randomizer.nextColor();
	        ball.setColor(ballColor);
	        var paddleColor = Randomizer.nextColor();
	        paddle.setColor(paddleColor);
	    }
	}
	
	// Bounce off top wall
	var elem = getElementAt(ball.getX(), ball.getY() - BALL_RADIUS);
	if (elem != null) {
		remove(elem);
		brickRemoved++;
		if(brickRemoved == NUM_BRICKS_PER_ROW * NUM_ROWS){
        winText();
        stopTimer(drawBall);
    }
		dy = -dy;
	}
	else if(ball.getY() - ball.getRadius() < 0){
		dy = -dy;
	}
}
function drawRowBricks(){
    for (var j = 0; j < NUM_ROWS; j++){
        for (var i = 0; i < NUM_BRICKS_PER_ROW; i++){
            var rect = new Rectangle(BRICK_WIDTH, BRICK_HEIGHT);
            rect.setPosition(x, y);
            rect.setColor(decideColor(j));
            add(rect);
            x += BRICK_WIDTH + BRICK_SPACING; 
        }
        x = BRICK_SPACING;
        y += BRICK_HEIGHT + BRICK_SPACING;
    }
}
function decideColor(rowNumber){
    var x = rowNumber %  8;
    if(x == 0 || x == 1){
        return Color.red;
    }
    else if(x == 2 || x == 3){
        return Color.orange;
    }
    else if(x == 4 || x == 5){
        return Color.green;
    }
    else if(x == 6 || x == 7){
        return Color.blue;
    }
}
function lostText(){
    var text = new Text("Game Over", "30pt Arial");
    text.setPosition(getWidth()*1/4, getHeight()/2);
    text.setColor(Color.white);
    add(text);
    
}
function winText(){
    var text = new Text("You won!", "30pt Arial");
    text.setPosition(getWidth()*1/4, getHeight()/2);
    text.setColor(Color.white);
    add(text);
}



    if (typeof start === 'function') {
        start();
    }
};
</script>
	</body>
	
	
</html>