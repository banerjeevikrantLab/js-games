<!DOCTYPE html>

<html lang="en">

	<head>
		<title>Tic Tac Toe Game</title>
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
		var WIDTH = 400;
		var HEIGHT = 400;
		setSize(WIDTH, HEIGHT);
		var XorO = 0;
		var grid;

		var gameOver = false;

		var isEmpty = 0; 
		var isX = 1; 
		var isO = 2;

		var WINNING_LINE_WIDTH = 10;
		var WINNING_LINE_COLOR = Color.red;

		function start(){
			grid = new Grid(3, 3);
			grid.init(isEmpty);
			drawLines();
			mouseClickMethod(handleClick);
		}
		function drawLines(){
		// This is used to make the two vertical lines.
			var verticalLine = new Line(getWidth()/3, 0, getWidth()/3, getHeight());
			var verticalLine2 = new Line(getWidth()*2/3, 0, getWidth()*2/3, getHeight());
			verticalLine.setColor(Color.white);
			verticalLine2.setColor(Color.white);
			add(verticalLine);
			add(verticalLine2);
		// This is used to make the two horizontal lines.
			var horizontalLine = new Line(0, getHeight()/3, getWidth(), getHeight()/3);
			var horizontalLine2 = new Line(0, getHeight()*2/3, getWidth(), getHeight()*2/3);
			horizontalLine.setColor(Color.white);
			horizontalLine2.setColor(Color.white);
			add(horizontalLine);
			add(horizontalLine2);
		}
		function handleClick(e){
			if (gameOver == false){ 
				println(getRowForClick(e) + "," + getColForClick(e));
				if(XorO % 2 == 0){
					drawX(getRowForClick(e), getColForClick(e));
				}else {
					drawO(getRowForClick(e), getColForClick(e));
				}
				checkWinner();
			}
		}
		function getRowForClick(e){
			var row = getRow(e.getY());
			return row;
		}
		function getRow(y){
			return Math.min(grid.numRows() - 1, Math.floor(y/(getHeight()/3)));  
		}
		function getColForClick(e){
			var col = getCol(e.getX());
			return col;
		}
		function getCol(x){
			return Math.min(grid.numCols() - 1, Math.floor(x/(getWidth()/3)));
		}
		function drawX(row, col){
			var elem = grid.get(row, col);
			if (elem == 0){
				var line = new Line(col * getWidth()/3, row * getHeight()/3, col * getWidth()/3 + getWidth()/3, row * getHeight()/3 + getHeight()/3);
				line.setLineWidth(5);
				line.setColor(Color.white);
				add(line);
				var line2 = new Line(col * getWidth()/3, row * getHeight()/3 + getHeight()/3,col * getWidth()/3 + getWidth()/3, row * getHeight()/3);
				line2.setLineWidth(5);
				line2.setColor(Color.white);
				add(line2);
				grid.set(row, col, isX);
				XorO += 1;
			}
		}
		function drawO(row, col){
			var elem = grid.get(row, col);
			if (elem == 0){ 
				var circle = new Circle((getWidth()/grid.numRows())/2 - 5);
				circle.setColor(Color.white);
				circle.setBorderColor(Color.black);
				circle.setBorderWidth(10);
				circle.setPosition(col * getWidth()/3 + getWidth()/6,row * getHeight()/3 + getHeight()/6);
				add(circle);
				grid.set(row, col, isO);
				XorO += 1;
			}
		}
		function winnerInRow(row){
			if(grid.get(row, 0) == isX && grid.get(row, 1) == isX && grid.get(row, 2) == isX){
				return true;
			}else if(grid.get(row, 0) == isO && grid.get(row, 1) == isO && grid.get(row, 2) == isO){
				return true;
			}else{
				return false;
			}
		}
		function winnerInCol(col){
			if(grid.get(0, col) == isX && grid.get(1, col) == isX && grid.get(2, col) == isX){
				return true;
			}else if(grid.get(0, col) == isO && grid.get(1, col) == isO && grid.get(2, col) == isO){
				return true;
			}else{
				return false;
			}
		}
		function winnerInDia() {
			if(grid.get(0,0)==isX && grid.get(1,1)==isX && grid.get(2,2)==isX){
				return true;
			} else if(grid.get(0,0)==isO && grid.get(1,1)==isO && grid.get(2,2)==isO){
				return true;
			} else {
				return false;
			}
		}
		function winnerInDia2() {
			if(grid.get(2,0)==isX && grid.get(1,1)==isX && grid.get(0,2)==isX){
				return true;
			} else if(grid.get(2,0)==isO && grid.get(1,1)==isO && grid.get(0,2)==isO){
				return true;
			} else {
				return false;
			}
		}
		function checkWinner(){
			for(var i = 0; i < 3; i++){
				if (winnerInRow(i)){
					var line = new Line(0, i * getWidth()/3 + getWidth()/6, getWidth(), i * getWidth()/3 + getWidth()/6);
					line.setLineWidth(10);
					line.setColor(Color.red);
					add(line);
					gameOver = true;
				}
			}
			for(var i = 0; i < 3; i++){
				if (winnerInCol(i)){
					var line = new Line(i * getHeight()/3 + getHeight()/6, 0, i * getWidth()/3 + getWidth()/6, getHeight());
					line.setLineWidth(10);
					line.setColor(Color.red);
					add(line);
					gameOver = true;
				}
			}
			if(winnerInDia()) {
				var line = new Line(0,0,getWidth(),getHeight());
				line.setLineWidth(10);
				line.setColor(Color.red);
				add(line);
				gameOver = true;
			}
			if(winnerInDia2()) {
				var line = new Line(getWidth(),0 , 0, getHeight());
				line.setLineWidth(10);
				line.setColor(Color.red);
				add(line);
				gameOver = true;
			}
		}

		if (typeof start === 'function') {
			start();
		}
};
</script>
	</body>
	
	
</html>