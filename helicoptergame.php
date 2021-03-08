<!DOCTYPE html>

<html lang="en">


	<head>
		<title>Handle Helicopter</title>
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

<canvas
width="400"
height="500"
class="canvas"></canvas>

<script>
window.onload = function() {

    var DELAY = 40;
var SPEED = 5;

var OBSTACLE_WIDTH = 30;
var OBSTACLE_HEIGHT = 100;
var NUM_OBSTACLES = 3;

var TERRAIN_WIDTH = 10;
var MIN_TERRAIN_HEIGHT = 20;
var MAX_TERRAIN_HEIGHT = 50;

var pointsPerTime = 5;

var DUST_RADIUS = 3;
var DUST_BUFFER = 10;
var dust = [];

var top_terrain = [];
var bottom_terrain = [];

var clicking = false;
var MAX_DY = 12;

var copter;
var dy = 0;
var obstacles = [];

var point = 0;
var score; 
var startText;
var clickText = true;

var crashSound = new Audio('/home/banerjeevikrant/public_html/crash.aiff');

function start(){
	setUp();
	mouseDownMethod(onMouseDown);
	mouseUpMethod(onMouseUp);
	waitForClick();
	setTimer(game, DELAY);
		
}
function updateScore(){
    point += pointsPerTime;
    score.setText(point);
    if(clickText == true){
    	remove(startText);
    	clickText = false;
    
    }else{
    	clickText = true;
    }
}
function setUp(){
    
    copter = new WebImage("http://i.imgur.com/YSpQ8j0.png");
    setBackgroundColor(Color.black);
    copter.setSize(50,25);
    copter.setPosition(getWidth()/3, getHeight()/2);
    copter.setColor(Color.blue);
    add(copter);
    
    drawObstacle();
    addTerrain();
    
    score = new Text("0");
    score.setColor(Color.white);
    score.setPosition(10, 30);
    add(score);
    addText();
    
    
}
function addText(){
    startText = new Text("Click to Start!")
    startText.setPosition(100,230);
    startText.setColor(Color.red);
    add(startText);
}
function game(){
        updateScore();
    if (hitWall()){
        lose();
        return;
    }
    var collider = getCollider();
    if(collider != null && collider != copter){
        lose();
        return;
    }
    if (clicking){
        dy-=1;
        if (dy < -MAX_DY){
            dy = -MAX_DY;
        }
    }else{
        dy+=1;
        if (dy > MAX_DY){
            dy = MAX_DY;
        }
    }
    copter.move(0, dy);
    moveObstacle();
    moveTerrain();
    
    addDust();
    moveDust();
}
function onMouseDown(e){
    clicking = true;
}
function onMouseUp(e){
    clicking = false;
}
function drawObstacle(){
    for (var i = 0; i < NUM_OBSTACLES; i++){
        var obstacle = new Rectangle(OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
        obstacle.setColor(Color.green);
        obstacle.setPosition(getWidth() + i * (getWidth()/NUM_OBSTACLES), Randomizer.nextInt(0, getHeight() - OBSTACLE_HEIGHT));
        obstacles.push(obstacle);
        add(obstacle);
    }
}
function moveObstacle(){
    for(var i = 0; i < obstacles.length; i++){
        var obstacle = obstacles[i];
        obstacle.move(-SPEED, 0);
        if (obstacle.getX() < 0){
            obstacle.setPosition(getWidth(), Randomizer.nextInt(0, getHeight() - OBSTACLE_HEIGHT));
        }
    }
}
function hitWall(){
    var topWallHit = copter.getY() < 0;
    var bottomWallHit = copter.getY() + copter.getHeight() > getHeight();
    return topWallHit || bottomWallHit;
}
function lose(){
    crashSound.play();
    stopTimer(game);
    var text = new Text("You Lose! Click to start again!");
    text.setColor(Color.red);
    text.setPosition(getWidth()/2 - text.getWidth()/2, getHeight()/3);
    add(text);
    waitForClick();
    setTimer(playAgain, DELAY);
}
function playAgain() {
	stopTimer(playAgain);
	point = 0;
	removeAll();
	start();
}
function getCollider(){
    var topLeft = getElementAt(copter.getX() - 1, copter.getY() - 1);
    if (topLeft != null){
        return topLeft;
    }
    var topRight = getElementAt(copter.getX() + copter.getWidth() + 1, copter.getY() - 1);
    if (topRight != null){
        return topRight;
    }
    var bottomLeft = getElementAt(copter.getX() - 1, copter.getY() + copter.getHeight() + 1);
    if (bottomLeft != null){
        return bottomLeft;
    }
    var bottomRight = getElementAt(copter.getX() + copter.getWidth() + 1, copter.getY() + copter.getHeight() + 1);
    if (bottomRight != null){
        return bottomRight;
    }
}
function addTerrain(){
    for (var i = 0; i < getWidth()/TERRAIN_WIDTH; i++){
        var height = Randomizer.nextInt(MIN_TERRAIN_HEIGHT, MAX_TERRAIN_HEIGHT);
        var terrain = new Rectangle(TERRAIN_WIDTH, height);
        terrain.setPosition(TERRAIN_WIDTH * i, 0);
        terrain.setColor(Color.green);
        top_terrain.push(terrain);
        add(terrain);
        
        height = Randomizer.nextInt(MIN_TERRAIN_HEIGHT, MAX_TERRAIN_HEIGHT);
        var bottomTerrain = new Rectangle(TERRAIN_WIDTH, height);
        bottomTerrain.setPosition(TERRAIN_WIDTH * i, getHeight() - bottomTerrain.getHeight());
        bottomTerrain.setColor(Color.green);
        bottom_terrain.push(bottomTerrain);
        add(bottomTerrain);
    }
}
function moveTerrain(){
    for(var i = 0; i < top_terrain.length; i++){
        var obj = top_terrain[i];
        obj.move(-SPEED, 0);
        if (obj.getX() < -obj.getWidth()){
            obj.setPosition(getWidth(), 0);
        }
    }
    for(var i = 0; i < bottom_terrain.length; i++){
        var obj = bottom_terrain[i];
        obj.move(-SPEED, 0);
        if (obj.getX() < -obj.getWidth()){
            obj.setPosition(getWidth(), getHeight() - obj.getHeight());
        }
    }
}
function addDust(){
    var circle = new Circle(DUST_RADIUS)
    circle.setColor("#cccccc");
    circle.setPosition(copter.getX() - circle.getWidth(), 
                        copter.getY() + DUST_BUFFER);
    dust.push(circle);
    add(circle);
}

function moveDust(){
    for(var i = 0; i < dust.length; i++){
        var x = dust[i];
        x.move(-SPEED, 0);
        x.setRadius(x.getRadius() - 0.1);
        if(x.getX() < 0){
            remove(x);
            dust.remove(i);
            i--;
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