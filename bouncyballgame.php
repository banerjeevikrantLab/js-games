<!DOCTYPE html>

<html lang="en">

	<head>
		<title>Bouncy Ball Game</title>
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
		<h1 class = "game-heading">Boucy Ball Game</h1>

<canvas
width="400"
height="500"
class="canvas"></canvas>


<script>
	window.onload = function() {

	var ball_red;
	var ball_blue;
	var ball_green;

	// I set radius for each ball 
	var BALL_RED_RADIUS = 5;
	var BALL_BLUE_RADIUS = 10; 
	var BALL_GREEN_RADIUS = 20;

	// It is the time set to call a function
	var DELAY  = 10;

	//These are important to make all the ball move in different directions and and different speed.
	var dx_red = 4;
	var dy_red = 4;
	var dx_blue = 3;
	var dy_blue = 3;
	var dx_green = 5;
	var dy_green = 5;

	// This was used to define target and the lines start of by (any value) then changes according to your mouse.
	var horizontalLine = new Line(0 , 0, 0, 0);
	var verticalLine = new Line(0 , 0, 0, 0);


	// This to write the game points
	var score; 
	var point = 0;

	// Winning Score, you can try by changing it.
	var winningScore = 50; 

	// Losing Score, you can try by changing it.
	var losingScore = -20;


	/*
	So what the start function doing is first adding all the balls to the screen, and then 
	setting timer which will call the function moveBall(if you want to know what move ball does scroll 
	to moveBall function) then when we move mouse, depending upon it moving the target. And then 
	when press it calling handleClick(to know more about it scroll to handleClick) and then there
	is score which which is in start function.
	*/
	function start(){
		addBalls();
		setTimer(moveBall, DELAY);
		
		mouseMoveMethod(drawTarget);
		mouseDownMethod(handleClick);
		setBackgroundColor(Color.black);
		score = new Text("0");
		score.setPosition(10, 30);
		score.setColor(Color.white);
		add(score);
	}
	/*
	Its being used to add all the balls by using what we defined as global variables 
	*/
	function addBalls(){
		ball_red = new Circle(BALL_RED_RADIUS);
		ball_red.setColor(Color.red);
		ball_red.setPosition(getWidth()/2, getHeight()/2);
		add(ball_red);
		
		
		ball_blue = new Circle(BALL_BLUE_RADIUS);
		ball_blue.setColor(Color.blue);
		ball_blue.setPosition(getWidth()/6, getHeight()/2);
		add(ball_blue);
		
		
		ball_green = new Circle(BALL_GREEN_RADIUS);
		ball_green.setColor(Color.green);
		ball_green.setPosition(getWidth()/3, getHeight()/4);
		add(ball_green);
	}
	/*
	First it is checking wall and then it pretty much moving the ball using the .move option 
	and it is using the global vars difined.
	*/
	function moveBall(){
		checkWall();
		ball_red.move(dx_red, dy_red);
		ball_blue.move(dx_blue, dy_blue);
		ball_green.move(dx_green, dy_green);
	}
	/*
	It is a simple calculation to figure out if the ball as touched any side or not, if it does
	the ball will Bounce back
	*/
	function checkWall(){
		// Right wall, so i did .getX() + the radius of the ball and compared it with getWidth
		if (ball_red.getX() + BALL_RED_RADIUS > getWidth()){
			dx_red = -dx_red;
		}
		// Bottom Wall, so i did .getY() + the radius of the ball and compared it with getHeight
		if (ball_red.getY() + BALL_RED_RADIUS > getHeight()){
			dy_red = -dy_red;
		}
		// Left Wall, so i did .getX() - the radius of the ball and compared it with 0
		if (ball_red.getX() - BALL_RED_RADIUS < 0){
			dx_red = -dx_red;
		}
		// Top Wall so i did .getX() - the radius of the ball and compared it with 0
		if (ball_red.getY() - BALL_RED_RADIUS < 0){
			dy_red = -dy_red;
		}
		
		//Now did pretty much the same thing for all the other ball, the only thing that changed is 
		//the global vars
		
		// Right Wall
		if (ball_blue.getX() + BALL_BLUE_RADIUS > getWidth()){
			dx_blue = -dx_blue;
		}
		// Bottom Wall
		if (ball_blue.getY() + BALL_BLUE_RADIUS > getHeight()){
			dy_blue = -dy_blue;
		}
		// Left Wall
		if (ball_blue.getX() - BALL_BLUE_RADIUS < 0){
			dx_blue = -dx_blue;
		}
		// Top Wall
		if (ball_blue.getY() - BALL_BLUE_RADIUS < 0){
			dy_blue = -dy_blue;
		}
		
		
		
		// Right Wall
		if (ball_green.getX() + BALL_GREEN_RADIUS > getWidth()){
			dx_green = -dx_green;
		}
		// Bottom Wall
		if (ball_green.getY() + BALL_GREEN_RADIUS > getHeight()){
			dy_green = -dy_green;
		}
		// Left Wall
		if (ball_green.getX() - BALL_GREEN_RADIUS < 0){
			dx_green = -dx_green;
		}
		// Top Wall
		if (ball_green.getY() - BALL_GREEN_RADIUS < 0){
			dy_green = -dy_green;
		}
	}

	/*
	So it is using the mouse vertical mouse location or y location to figure out the horizontal line
	and the horizontal mouse location or x location to figure out the vertical line. Both of them 
	together made the target look like that. 
	*/
	function drawTarget(e){
		horizontalLine.setPosition(0, e.getY());
		horizontalLine.setEndpoint(getWidth(), e.getY());
		horizontalLine.setColor(Color.white);
		add(horizontalLine);
		
		verticalLine.setPosition(e.getX(), 0);
		verticalLine.setEndpoint(e.getX(), getHeight());
		verticalLine.setColor(Color.white);
		add(verticalLine);
		
	}
	/*
	So what handleClick is doing is first starting of by getting the elem at the place mouse was down
	and then rocognizing what it is.. so if it is ball red you win as the point just gets equal to 
	the point you need to win. And then we difined the blue ball and so on.. at the end it says an
	if, else if statements which says that your point is more than the winning score you win else if
	your point gets less than losing score you lose.
	*/
	function handleClick(e){
		var elem = getElementAt(e.getX(), e.getY());
		if(elem == ball_red){
			point = winningScore;
		}else if(elem == ball_blue){
			point+=5;
		}else if(elem == ball_green){
			point+=3;
		}else if(elem == null){
			point-=3;
		}
		score.setText(point);
		if(point >= winningScore){
			youWin();
		}else if(point <= losingScore){
			youLose();
		}
	}
	// So wining means stoping the timer, and making "You win!" text on the center of the screen.
	function youWin(){
		stopTimer(moveBall);
		var text = new Text("You Win!");
		text.setPosition(getWidth()/2 - text.getWidth()/2, getHeight()/2);
		text.setColor(Color.white);
		add(text);
	}
	//So losing means stoping the timer, and making "You Lose!" text on the center of the screen.
	function youLose(){
		stopTimer(moveBall);
		var text = new Text("You Lose!");
		text.setPosition(getWidth()/2 - text.getWidth()/2, getHeight()/2);
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