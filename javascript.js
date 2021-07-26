var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset 
document.getElementById('startreset').onclick = function(){
	//if we are playing
	if(playing == true) {
		//reload page
		location.reload();
	}else {
		//if we are not playing
		
		//change mode to playing
		playing = true;
		
		//set score to 0
		score = 0;
		document.getElementById('scorevalue').innerHTML = score;
		
		//show countdown box
		show("timeremaining");
		timeremaining = 60;
		document.getElementById('timeremainingvalue').innerHTML = timeremaining;
		
		//start countdown
		startCountdown();

		
		//change button to reset
		document.getElementById('startreset').innerHTML = "Reset Game";
		
		//hide game over box
		hide("gameover");
		
		//generate new Q&A
		generateQA();
		
	}
	
}
	
		
//functions

//start counter
function startCountdown(){
	action = setInterval(function(){
		timeremaining -= 1;
		
		document.getElementById('timeremainingvalue').innerHTML = timeremaining;
		
		if(timeremaining == 0) {
			stopCountdown();
		
		
			//show game over 
			show("gameover");

			document.getElementById('gameover').innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";


			hide("timeremaining");
			hide("correct");
			hide("wrong");
			playing = false;
			
			document.getElementById("startreset").innerHTML = "Start Game";
		
		}
	}, 1000);
}

//stop counter
function stopCountdown(){
	clearInterval(action);
}

//hide an element
function hide(Id){
	document.getElementById(Id).style.display = "none";
}		

//show an element
function show(Id){
	document.getElementById(Id).style.display = "block";
}

//generate Q&A
function generateQA(){
	
	//create 2 integers between 1 and 9 to display the multiplication question
	var x = 1 + Math.round(9*Math.random());
	var y = 1 + Math.round(9*Math.random());
	
	//establish a variable with the correct answer
	correctAnswer = x*y;
	
	//place the 2 integers multiplied by each other into the div with id 'question'
	document.getElementById('question').innerHTML = x + "x" + y;
	
	//establish 1 random box out of the 4 boxes to place the correct answer
	var correctPosition = 1 + Math.round(3*Math.random());
	
	//the box divs have ids of box1,box2,box3,box4 so we can place the correct answer using the 'box' id and add the correct position
	document.getElementById('box'+correctPosition).innerHTML = correctAnswer;
	
	//fill other boxes with wrong answers
	//loop through each box, fill boxes which are not the correct position with random answers
	
	var answers = [correctAnswer]
	
	for(i=1; 1<5; i++){
		if(i != correctPosition){
			var wrongAnswer;
			do{
				wrongAnswer = (1 + Math.round(9*Math.random())) * (1+Math.round(9*Math.random()));
			
			}while(answers.indexOf(wrongAnswer)>-1);
			document.getElementById('box'+i).innerHTML = wrongAnswer;
			
			answers.push(wrongAnswer);
		}
	}
	
}

//if we click on answer box
for(i=1; i<5; i++){
	document.getElementById('box' + i).onclick = function(){
	//if we are playing
	if(playing == true) {
		//correct?
		if(this.innerHTML == correctAnswer){
			//yes
			//increase score by 1
			score++;
			
			document.getElementById('scorevalue').innerHTML = score;
			
			//show correct box for 1 sec
			show('correct');
			
			//hide wrong box
			hide('wrong');
			
			setTimeout(function(){
				hide('correct');
			}, 1000);
			
			//generate new Q&A
			generateQA();
			
		}else{
			//wrong answer
			//show wrong box
			show('wrong');
			
			//hide correct box
			hide('correct');
			
			setTimeout(function(){
				hide('wrong')
			}, 1000);
		}
	}
}
}
	
		
			
				
				
				
			