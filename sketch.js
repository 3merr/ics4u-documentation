/**
 *@file Creates a rainbow of bars that play musical notes when moused over.
 *@author Erin Amer
 */


var notes; //number of notes on display
var osc; //the oscillator playing the notes
var playing; //whether or not a note is playing
var notePlaying; //contains which note is currently being played

var noteNames; //labels for the 12 notes

function setup() {
	createCanvas(1000, 800);
	colorMode(HSB, height*1.5, 255, 255, 255); //rainbow effect
	
	notes = 25; //number of notes to display
	playing = false;
	
	noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
	
	//initialize the oscillator
	osc = new p5.Oscillator();
	osc.setType('square');
	osc.amp(0);
	
	drawBG();
}

function draw() {
	
	drawBG();
	update();
	displayNote();
}

//draws rainbow
function drawBG() {
	stroke(255);
	for (var i = 0; i < notes; i++) {
		fill((height/notes) * i, 200, 255);
		rect(0, (height/notes)*i, width, (height/notes));
	}
}

//checks which note mouse is over and plays it
function update() {
	
	//check if mouse is within sketch
	if (mouseX > 0 && mouseX <= width && mouseY > 0 && mouseY <= height) {
		
		if (playing == false) {
			osc.amp(0.8, 0.5);
			osc.start();
			playing = true;
		}
		
		//check which note
		for (var i = 0; i < notes; i++) {
			var upperBound = (height/notes) * i;
			
			if (mouseY > upperBound && mouseY < upperBound + (height/notes)) {
				//change note
				notePlaying = 72 - i;
				osc.freq(midiToFreq(notePlaying));
				
				//create visual "depression"
				noStroke();
				fill(0, 0, 50, 50);
				rect(0, upperBound, width, (height/notes));
			}

			
		}
		
	}
	else {
		//stop playing note when mouse is out of sketch
		if (playing == true) {
			osc.amp(0, 0.5)
			playing = false;
		}
	}
}

//displays the current note being played and labels the keys
function displayNote() {
	textAlign(RIGHT, BOTTOM);
	textSize(24);
	noStroke(0);
	fill(255);
	
	var playingText;

	if(playing) {
		playingText = "Playing " + noteNames[notePlaying % 12];
	}
	else
		playingText = "Playing nothing";
	
	text(playingText, width-30, height-5);

	for (var i = 0; i < notes; i++) {
		var upperBound = (height/notes) * i;

		textAlign(LEFT, TOP);
		textSize(20);
		fill(0, 0, 50, 200);
		text(noteNames[(72-i) % 12], 10, upperBound+5);
	}
}