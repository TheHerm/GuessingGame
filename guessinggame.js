var generateWinningNumber = function(){
	var num = Math.random();
	num = num*100;
	if(num<1){num = 1};
	return Math.round(num);
};

var shuffle = function(arr){
	var totalLength = arr.length;
	var randNum, placeHold;
	while(totalLength){
		randNum = Math.floor(Math.random() * totalLength--);
		placeHold = arr[totalLength];
		arr[totalLength] = arr[randNum];
		arr[randNum] = placeHold;
	};
	return arr;
};

var Game = function(){
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
};

Game.prototype.difference = function(){
	var diff = this.playersGuess - this.winningNumber;
	if(diff<0){
		diff = diff * -1;
	};
	return diff;
};

Game.prototype.isLower = function(){
	return (this.playersGuess < this.winningNumber);
};

Game.prototype.playersGuessSubmission = function(num){
	console.log(typeof num);
	console.log(num);
	debugger;
	if(num<1 || num>100 || isNaN(num)){
		$('#subtitle').text("That is an invalid guess. Guess again.");
			return;
	};
	this.playersGuess = num;
	
	return this.checkGuess(this.playersGuess);
};

Game.prototype.checkGuess = function(guess){
	if(guess === this.winningNumber){
		$('#subtitle').removeClass('guessAgain');
		$('#subtitle').addClass('winner');
		$('#subtitle').text("You Win!");
		$('#player-input').text(this.winningNumber);
		$('#reset').text('Click me to play again!');
		return;
	}else if(this.pastGuesses.includes(guess)){
		$('#subtitle').text("You have already guessed that number. Guess again.");
		return;
	}else if(this.pastGuesses.length === 4){
		$('#subtitle').removeClass('guessAgain');
		$('#subtitle').removeClass('sub');
		$('#guess-list li:nth-child('+ 5 +')').text(this.playersGuess);
		$('#subtitle').addClass('loser');
		$('#subtitle').text("You Lose, " + this.winningNumber + " was correct.");
		$('#reset').text('Click me to play again!');
		return;
	};

	this.pastGuesses.push(guess);
	 $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);

	if(this.difference()<10){
		$('#subtitle').addClass('guessAgain');
		$('#subtitle').text("You're burning up!");
	}else if(this.difference()<25){
		$('#subtitle').addClass('guessAgain');
		$('#subtitle').text("You're lukewarm.");
	}else if(this.difference()<50){
		$('#subtitle').addClass('guessAgain');
		$('#subtitle').text("You're a bit chilly.");
	}else if(this.difference()<100){
		$('#subtitle').addClass('guessAgain');
		$('#subtitle').text("You're ice cold!");
	};

	if(this.isLower()){
		var highLow = $('#subtitle').text() + " Guess higher.";
		$('#subtitle').text(highLow);
	}else if(!this.isLower()){
		var highLow = $('#subtitle').text() + " Guess lower.";
		$('#subtitle').text(highLow);
	};
};

var newGame = function(){
	var game = new Game();
	return game;
};

Game.prototype.provideHint = function(){
	var hintArr = [];
	hintArr.push(this.winningNumber, generateWinningNumber(), generateWinningNumber());
	return shuffle(hintArr).join(" ");
};

$(document).ready(function(){

	var game = new Game();

	$('#submit').on('click', function(){
		var guess = +$('#player-input').val();
		$('#player-input').val("");
		console.log(game.playersGuessSubmission(guess));
	});

	$('#reset').on('click', function(){
		game = new Game();
		$('#subtitle').text('How many runs did the Cardinals score today?');
		$('#subtitle').removeClass('loser');
		$('#subtitle').removeClass('winner');
		$('#subtitle').removeClass('guessAgain');
		$('#subtitle').addClass('sub');
		$('.guess').text(' -');
		$('#reset').text('I give up');
		$('hint').text('Hint');
	});

	$('#hint').on('click', function(){
			$('#subtitle').text("The winning number is one of " + game.provideHint());
	});

});












