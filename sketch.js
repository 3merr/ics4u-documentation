/**
 *@file Creates a rainbow of bars that play musical notes when moused over.
 *@author Erin Amer
 */

/**
 * The number of notes to display.
 * @type {number}
 */
var numNotes;

/**
 * Sound generator that plays the notes.
 * @type {Object}
 */
var osc;

/**
 * Whether or not a note is playing.
 * @type {boolean}
 */
var playing;

/**
 * The midi number of the current note being played.
 * @type {number}
 */
var notePlaying;

/**
 * Labels of the 12 notes.
 * @const {string[]}
 */
var NOTENAMES;

function setup() {
	createCanvas(1000, 800);
	colorMode(HSB, height*1.5, 255, 255, 255); // Link rainbow effect to height
	
	numNotes = 25;
	playing = false;
	
	NOTENAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
	
	// Initialize the oscillator
	osc = new p5.Oscillator();
	osc.setType('square');
	osc.amp(0);
	osc.start();
	
	drawBG();
}

function draw() {
	
	drawBG();
	update();
	displayNote();
}

/** Draws the rainbow background. */
function drawBG() {
	stroke(255);
	for (var i = 0; i < numNotes; i++) {
		fill((height/numNotes) * i, 200, 255);
		rect(0, (height/numNotes)*i, width, (height/numNotes));
	}
}

/** Checks which note the mouse is over and plays it */
function update() {
	
	// Check if mouse is within sketch
	if (mouseX > 0 && mouseX <= width && mouseY > 0 && mouseY <= height) {
		
		// Turn up volume from 0
		if (playing == false) {
			osc.amp(0.8, 0.5);
			playing = true;
		}
		
		// Check which note mouse is over
		for (var i = 0; i < numNotes; i++) {
			var upperBound = (height/numNotes) * i;
			
			if (mouseY > upperBound && mouseY < upperBound + (height/numNotes)) {
				// Change frequency to current note
				notePlaying = 72 - i;
				osc.freq(midiToFreq(notePlaying));
				
				// Create visual "depression"
				noStroke();
				fill(0, 0, 50, 50);
				rect(0, upperBound, width, (height/numNotes));
			}
		}
	}
	else {
		// Stop playing note when mouse is out of sketch
		if (playing == true) {
			osc.amp(0, 0.5)
			playing = false;
		}
	}
}

/** Displays the current note being played and labels the "keys". */
function displayNote() {
	textAlign(RIGHT, BOTTOM);
	textSize(24);
	noStroke(0);
	fill(255);
	
	// 
	var playingText;
	
	if(playing)
		playingText = "Playing " + NOTENAMES[notePlaying % 12];
	else
		playingText = "Playing nothing";
	
	text(playingText, width-30, height-5);

	for (var i = 0; i < numNotes; i++) {
		var upperBound = (height/numNotes) * i;

		textAlign(LEFT, TOP);
		textSize(20);
		fill(0, 0, 50, 200);
		text(NOTENAMES[(72-i) % 12], 10, upperBound+5);
	}
}