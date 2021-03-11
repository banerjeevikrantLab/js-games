<!DOCTYPE html>

<html lang="en">	

	<head>
		<title>Lucky Number Game</title>
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
		<h1 class = "game-heading">Lucky Number Game</h1>

<canvas
width="400"
height="500"
class="canvas"></canvas>

<script>
window.onload = function() {

    
var clicktostart;
var chances = 1;
var numGuess;
var num1;
var num2;
var corrnum;
var num;
var howManyMove;

function main(){
    setUp();
    mouseClickMethod(baseSetUp);
}
function setUp(){
    setBackgroundColor(Color.black);
    var heading = new Text("Lucky Number", "30pt Arial");
    heading.setColor(Color.red);
    heading.setPosition(getWidth()/8, getHeight()/7);
    add(heading);
    clicktostart = new Text("Click To Start!", "30pt Arial");
    clicktostart.setColor(Color.red);
    clicktostart.setPosition(getWidth()/7, getHeight()/2);
    add(clicktostart);
}
function baseSetUp(e){
    
    remove(clicktostart);
    num1 = readInt("From? ");
    num2 = readInt("To? ");
    corrnum = Randomizer.nextInt(num1, num2);
    numGuess = new Text("OK! Click to Start!", "30pt Arial");
    numGuess.setColor(Color.red);
    numGuess.setPosition(getWidth()/11, getHeight()/2);
    add(numGuess);
    mouseClickMethod(systemBase);
    
}
function systemBase(e){
    num = readInt("Guess a number");
    while(num != corrnum){
    	if(num > corrnum){
    		num = readInt("Too Large! Try Guessing Another number");
    	}
    	if(num < corrnum){
    		num = readInt("Too Small! Try Guessing Another number");
    	}
        
        chances++;
    }
    if (num == corrnum){
        youWin();
    }
}
function youWin(){
    remove(numGuess);
    var success = new Text("You got it!", "30pt Arial");
    success.setColor(Color.red);
    success.setPosition(getWidth()/2 - success.getWidth()/2, getHeight()/3);
    add(success);
	if (chances == 1){
		howManyMove = new Text("It took you 1 chance to figure it out!", "18pt Arial");
		howManyMove.setColor(Color.red);
		howManyMove.setPosition(getWidth()/2 - howManyMove.getWidth()/2, getHeight()/2);
		add(howManyMove);
	}else{
		howManyMove = new Text("It took you " + chances +" chances to figure it out!", "18pt Arial");
		howManyMove.setColor(Color.red);
		howManyMove.setPosition(getWidth()/2 - howManyMove.getWidth()/2, getHeight()/2);
		add(howManyMove);
	}
	var startAgain = new Text("Start Again? Click!", "25pt Arial");
	    startAgain.setColor(Color.red);
	    startAgain.setPosition(getWidth()/2 - startAgain.getWidth()/2, getHeight()* 5/6);
	    add(startAgain);
	if(chances == 1){
	        var text = new Text("In one try! You read my mind!!", "12pt Arial");
	        text.setColor(Color.red);
	        text.setPosition(getWidth()/2 - text.getWidth()/2, getHeight()*4/6);
	        add(text);
    	}
    if(chances <= 5 && chances != 1){
        var text = new Text("Wow! You are quick!", "15pt Arial");
        text.setColor(Color.red);
        text.setPosition(getWidth()/2 - text.getWidth()/2, getHeight()*4/6);
        add(text);
    }
	
	mouseClickMethod(restart);
	
}
function restart(e){
    removeAll();
	chances = 1;
	main();
}



    if (typeof main === 'function') {
        main();
    }
};
</script>
	</body>
	
	
</html>