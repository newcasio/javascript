var count=0; //this is the counter for the main timer
var timerID; //ID for the timer
var startTime; //timeStamp for the reaction time start
var stopTime; //timeStamp for the reaction time end
var roundTimerID; //time delay between rounds
var round=0; //10 rounds altogether - this holds current round
var targetIndex; //The target index within the image array
var imageArray=["triangle.png","square.png","circle.png","redsquare.png","bluesquare.png","greensquare.png","donkey.png","lighthouse.png","pineapple.png"]; //All the image names (more=better)
var resultsArray=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]; //This will hold all the times for correct results, -1 if incorrect
var shapeClicked=0; //Have we clicked a shape yet for this round?

//function to add a leading zero
function leadingZero(value) {
if (value<=9) return "0"+value; //Add a zero if <=9
else return value;	//Otherwise add nothing
}

//Function to display the timer
function displayTimer() {
 var minutes=leadingZero(parseInt(count/60)); //work out minutes
 var seconds=leadingZero(count%60); //work out seconds
 var time=minutes + ":" + seconds;//Compose time for display
 document.getElementById("timer").innerHTML=time;
 count++;
}

//When GO is clicked, call this function
function go() {
	document.getElementById("start").style.top='620px';
  document.getElementById("start").style.transform='rotateZ(780deg)';
  document.getElementById("start").style.background="green";


  document.getElementById("info").innerHTML="Get ready......";
  document.getElementById("info").style.background="green";
  document.getElementById("info").style.fontSize="3em";

  timerID=setInterval(displayTimer,1000); //Start timer
  //document.getElementById("start").style.display="none";



//Now wait a random time before starting
  preRound();
}

//This function will place images randomly into the page
function placeImages() {
document.getElementById("info").style.display="none"; //turn off instructions
shuffle(imageArray); //This function will randomise the array
targetIndex=parseInt(Math.random()*3); //Pick the target from one of the first 3 elements in the array

//work out what to display - pick from first 3 images
var target="<img src=" + imageArray[targetIndex] + " width='100' + height='100'>";	//TARGET
var first="<img src=" + imageArray[0] + ">"; //FIRST IMAGE
var second="<img src=" + imageArray[1] + ">"; //SECOND IMAGE
var third="<img src=" + imageArray[2] + ">"; //THIRD IMAGE

//Do actual display
document.getElementById("overlay").style.display="none"; //clear overlay, then
document.getElementById("target").innerHTML=target; //display all images
document.getElementById("first").innerHTML=first;
document.getElementById("second").innerHTML=second;
document.getElementById("third").innerHTML=third;
document.getElementById("start").style.display="none";

startTime=new Date(); //take a snapshot of the time
}

function clearTimes() {
 document.getElementById("time1").innerHTML="";
 document.getElementById("time2").innerHTML="";
 document.getElementById("time3").innerHTML="";
 document.getElementById('container').style.transitionDuration='6s';
 document.getElementById("container").style.background="green";
}

//This function runs every time a shape is clicked - but you can only click once per round
function gotcha(which) {
 if (!shapeClicked) { //Only do this if no shape yet clicked this round (stop double goes)
	 stopTime=new Date();//take snapshot of the time
    shapeClicked=1; //Indicate shape clicked
    document.getElementById('container').style.transitionDuration='0s';
    document.getElementById('container').style.background="green";
    var whichTimer;//variable to hold which of the timers is to be displayed
    switch(which) {
        case 0:whichTimer="time1"
        break;
        case 1:whichTimer="time2"
        break;
        case 2:whichTimer="time3"
        break;

    }

    gapTime=stopTime.getTime()-startTime.getTime();
    if (which==targetIndex) { //ONLY IF CORRECT
        resultsArray[round-1]=gapTime; //Save correct reaction time
        document.getElementById(whichTimer).style.background="#00ff00";
        document.getElementById(whichTimer).innerHTML=gapTime;
    }  else {
        resultsArray[round-1]=-1; //Indicate not correct
        document.getElementById(whichTimer).style.background="#ff0000";
        document.getElementById(whichTimer).innerHTML='XXXX';
    }
    setTimeout(postRound,1000); //Wait for 1 second before moving on
 }
}

//Function to prepare for next round after a short time
function preRound() {
shapeClicked=0; //reset shape clicked variable
clearTimes(); //clear times from previous round
newTime=2000;//2 secs
roundTimerID=setTimeout(nextRound,newTime); //After time delay, start next round
}

//This function is called for every round
function nextRound() {
    round++;
    document.getElementById("round").innerHTML=round;//display what round on screen
    clearTimeout(roundTimerID);
    if (round<=10) { //if more to go,
    placeImages(); //Call next round
    document.getElementById("container").style.background="red";
    } else {
        finish(); //otherwise finish!
    }
}

//This function waits until user has seen result (1 second) before going to the next round
function postRound() {
    document.getElementById("overlay").style.display="block"; //place overlay to hide display
    preRound();
}

//This function does all the tidying up
function finish() {
    clearInterval(timerID); //Stop the timer in its tracks
    results();//Go and display the results
}

//Function to display results
/*function results() {
	var message="";  //this will hold th results message
	for (i=0;i<resultsArray.length;i++){   //loop through all the resultsArray
		message+="Result "+ (i+1) + ": "+ resultsArray[i] + "<br>";   //build message

	}
    //Now display the message
	document.getElementById("info").style.display="block";
	document.getElementById("info").innerHTML=message;
}*/

//Function to display results
function results() {
	var message="";  //this will hold th results message
	var correctCount=0;    //how many correct
	var total=0;   //what is the total time

	for (i=0;i<resultsArray.length;i++){   //loop through all the resultsArray
		if(resultsArray[i]!=-1){     //if they got it right,
			correctCount++;  //add 1 to correctCount
			total+=resultsArray[i];    //accumulate the total
			}

	}

	//make message
	message="<h4>Your results</h4>";
	message+="You got "+ correctCount + " correct<br>";
	message+="Your average tap time was " + total/correctCount + "ms";
    //Now display the message
	document.getElementById("info").style.display="block";
	document.getElementById("info").innerHTML=message;
}


//This function shuffles the array of image names around - then we will choose the first 3
function shuffle (array) {
  var i = 0;
  var j = 0;
  var temp = null;
  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
