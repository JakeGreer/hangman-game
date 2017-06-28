//Name: Jake Greer
//Date: 6/24
//Class: Tuesday/Thursday
//Assignment: Hangman Game 

// Variables
//word bank object.
Words = {};
Words.List = [];

Words.List[0] = "rainbow";
Words.List[1] = "television";
Words.List[2]= "interpol";
Words.List[3] = "the shins";
Words.List[4] = "whitesnake";
Words.List[5] = "the killers";
Words.List[6] = "scorpions";
Words.List[7] = "misfits";
Words.List[8] = "kiss";
Words.List[9] = "lynyrd skynyrd";
Words.List[10] = "sex pistols";
Words.List[11] = "the strokes";
Words.List[12] = "alice cooper";
Words.List[13] = "prince";
Words.List[14] = "pearl jam";
Words.List[15] = "green day";
Words.List[16] = "acdc";
Words.List[17] = "zz top";
Words.List[18] = "foo fighters";
Words.List[19] = "dead kennedys";
Words.List[20] = "arctic monkeys";
Words.List[21] = "peter gabriel";
Words.List[22] = "nofx";
Words.List[23] = "joy division";
Words.List[24] = "pixies";
Words.List[25] = "queen";
Words.List[26] = "led zeppelin";
Words.List[27] = "the beatles";
Words.List[28] = "pink floyd";

Words.length = Words.List.length;

//Game object.
Game = {};
Game.wordAr = [];
Game.underlineAr = [];

Game.lives = 7;
Game.NumInWordBank = Words.length;

Game.Word="test";
Game.WordU = "";
//Variables used for audio files
var audio0 = new Audio("assets/images/rainbow (mp3cut.net).mp3");
var audio1 = new Audio("assets/images/television (mp3cut.net).mp3");
var audio2 = new Audio("assets/images/interpol (mp3cut.net).mp3");
var audio3 = new Audio("assets/images/the-shins (mp3cut.net).mp3");
var audio4 = new Audio("assets/images/whitesnake (mp3cut.net).mp3");
var audio5 = new Audio("assets/images/the-killers (mp3cut.net).mp3");
var audio6 = new Audio("assets/images/scorpions (mp3cut.net).mp3");
var audio7 = new Audio("assets/images/misfits (mp3cut.net).mp3");
var audio8 = new Audio("assets/images/kiss (mp3cut.net).mp3");
var audio9 = new Audio("assets/images/lynyrd-skynyrd (mp3cut.net).mp3");
var audio10 = new Audio("assets/images/sex-pistols (mp3cut.net).mp3");
var audio11 = new Audio("assets/images/the-strokes (mp3cut.net).mp3");
var audio12 = new Audio("assets/images/alice-cooper (mp3cut.net).mp3");
var audio13 = new Audio("assets/images/prince (mp3cut.net).mp3");
var audio14 = new Audio("assets/images/pearl-jam (mp3cut.net).mp3");
var audio15 = new Audio("assets/images/GreenDay_-_I_walk_alone_cut_(mp3.pm).mp3");
var audio16 = new Audio('assets/images/ACDC_-_Back_In_Black-sample.ogg');
var audio17 = new Audio("assets/images/zz-top (mp3cut.net).mp3");
var audio18 = new Audio("assets/images/foo-fighters (mp3cut.net).mp3");
var audio19 = new Audio("assets/images/dead-kennedys (mp3cut.net).mp3");
var audio20 = new Audio("assets/images/arctic-monkeys (mp3cut.net).mp3");
var audio21 = new Audio("assets/images/");
var audio22 = new Audio("assets/images/");
var audio23 = new Audio("assets/images/");
var audio24 = new Audio("assets/images/");
var audio25 = new Audio("assets/images/");
var audio26 = new Audio("assets/images/led-zeppelin (mp3cut.net).mp3");
var audio27 = new Audio("assets/images/pennylane (mp3cut.net).mp3");
var audio28 = new Audio("assets/images/pink-floyd (mp3cut.net).mp3");


//Variables used to draw on the canvas;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");


/*****************************************************************************************/
/*****************************************************************************************/

//Functions  

//This function gets a word from the word bank file and stores it in the variable Game.Word
Game.PullWord = function() {
  Game.Word = Words.List[(Math.floor(Math.random() *Game.NumInWordBank))];
}

//This function stores an underline in each index, matching the chosen word, into a new array;
//It displays it to the html page, representing the blank word;
Game.SetUnderline = function() {
  //calling the PullWord function;
  Game.PullWord();

  for(i = 0; i < Game.Word.length; i++) {
    Game.wordAr[i] = Game.Word.charAt(i);
    if (Game.Word.charAt(i) != " ") {
      Game.underlineAr[i] = "_";
    }
    else {
      Game.underlineAr[i] = "&nbsp;&nbsp;";//If the chosen word has multiple words add a space;
    }
  }
  Game.WordU = Game.underlineAr.join(" ");
  document.getElementById("WORD").innerHTML = Game.WordU;

}

Game.AlertWin = function() {
  alert("You Win!\n\n" + "The word was \"" + Game.Word + "\"");
  window.location.reload();
}

Game.AlertLoss = function() {
  alert("You lose!\n\n" + "The word(s) was \"" + Game.Word + "\"");
  window.location.reload();
}

//This function first checks to see if the letter chosen matches any letters in the word;
//Then is resets the blank underline array to switch the location of the letter to be the actual letter instead of an underline;
//If a change was not made to the word it decrements a life;
//This function finally checks to see if both words are matching and the user has won or if lives has run out and the user has lost;
Game.UpdateLetter = function(letter) {
  Game.Changes = 0;

  for(i = 0; i < Game.Word.length; i++) 
  {
    Game.wordAr[i] = Game.Word.charAt(i);
    if(Game.Word.charAt(i) == letter) 
    {
      Game.underlineAr[i] = letter;
      Game.Changes++;
    }
  }

  if(Game.Changes < 1) 
  {
    Game.lives--;
    document.getElementById("lives").innerHTML = Game.lives;
  }

  Game.WordU = Game.underlineAr.join(" ");
  document.getElementById("WORD").innerHTML = Game.WordU;

  for(i = 0; i < Game.wordAr.length; i++) 
  {
    if (Game.Word.charAt(i) != " ") 
    {
      Game.wordAr[i] = Game.Word.charAt(i);;
    }
    else 
    {
      Game.wordAr[i] = "&nbsp;&nbsp;";
    }
  }

  Game.wordOne = Game.wordAr.join(" ");
  Game.wordTwo = Game.underlineAr.join(" ");

  //alert if word are equal and user wins
  if(Game.wordOne == Game.wordTwo) 
  {
    if(Game.Word == 'rainbow') {
      audio0.play();
    }
    if(Game.Word == 'television') {
      audio1.play();
    }
    if(Game.Word == 'interpol') {
      audio2.play();
    }
    if(Game.Word == 'the shins') {
      audio3.play();
    }
    if(Game.Word == 'whitesnake') {
      audio4.play();
    }
    if(Game.Word == 'the killers') {
      audio5.play();
    }
    if(Game.Word == 'scorpions') {
      audio6.play();
    }
    if(Game.Word == 'misfits') {
      audio7.play();
    }
    if(Game.Word == 'kiss') {
      audio8.play();
    }
    if(Game.Word == 'lynyrd skynyrd') {
      audio9.play();
    }
    if(Game.Word == 'sex pistols') {
      audio10.play();
    }
    if(Game.Word == 'the strokes') {
      audio11.play();
    }
    if(Game.Word == 'alice cooper') {
      audio12.play();
    }
    if(Game.Word == 'prince') {
      audio13.play();
    }
    if(Game.Word == 'pearl jam') {
      audio14.play();
    }
    if(Game.Word == 'green day') {
      audio15.play();
    }
    if(Game.Word == 'acdc') {
      audio16.play();
    }
    if(Game.Word == 'zz top') {
      audio17.play();
    }
    if(Game.Word == 'foo fighters') {
      audio18.play();
    }
    if(Game.Word == 'dead kennedys') {
      audio19.play();
    }
    if(Game.Word == 'arctic monkeys') {
      audio20.play();
    }
    if(Game.Word == 'peter gabriel') {
      audio21.play();
    }
    if(Game.Word == 'nofx') {
      audio22.play();
    }
    if(Game.Word == 'joy division') {
      audio23.play();
    }
    if(Game.Word == 'pixies') {
      audio24.play();
    }
    if(Game.Word == 'queen') {
      audio25.play();
    }
    if(Game.Word == 'led zeppelin') {
      audio26.play();
    }
    if(Game.Word == 'the beatles') {
      audio27.play();
    }
    if(Game.Word == 'pink floyd') {
      audio28.play();
    }
    document.getElementById("WORD").innerHTML == Game.Word;
    myVar = setTimeout(Game.AlertWin, 17000);
  }
  //alert if lives run out
  if(Game.lives < 1) 
  {
    document.getElementById("WORD").innerHTML == Game.Word;
    myVar = setTimeout(Game.AlertLoss, 1000);
  }
  //calls drawing functions for each lif lost;
  if(Game.lives == 6) 
  {
    Game.DrawHead();
  }
  if(Game.lives == 5) 
  {
    Game.DrawTorso();
  }
  if(Game.lives == 4) 
  {
    Game.DrawLeftArm();
  }
  if(Game.lives == 3) 
  {
    Game.DrawRightArm();
  }
  if(Game.lives == 2) 
  {
    Game.DrawLeftLeg();
  }
  if(Game.lives == 1) 
  {
    Game.DrawRightLeg();
  }

}

/********************************************************************/
/********************************************************************/

//Javascript functions that write on the canvas;

//The following is the main hangman post and is always active;
//Main post base
ctx.lineWidth=3;
ctx.moveTo(30,390);
ctx.lineTo(123,390);
ctx.stroke();
ctx.moveTo(30,400);
ctx.lineTo(120,400);
ctx.stroke();
ctx.moveTo(120,390);
ctx.lineTo(120,400);
ctx.stroke();
//Main Post vertical bar 1
ctx.moveTo(30,60);
ctx.lineTo(30,400);
ctx.stroke();
//Main Post vertical bar 2
ctx.moveTo(50,60);
ctx.lineTo(50,100);
ctx.stroke();
//Main Post vertical bar 3
ctx.moveTo(50,120);
ctx.lineTo(50,390);
ctx.stroke();
//Main Post vertical bar top
ctx.moveTo(30,60);
ctx.lineTo(50,60);
ctx.stroke();
//Main Post horizontal bar 1
ctx.moveTo(50,60);
ctx.lineTo(225,60);
ctx.stroke();
//Main Post horizontal bar 2
ctx.moveTo(50,80);
ctx.lineTo(70,80);
ctx.stroke();
//Main Post horizontal bar 3
ctx.moveTo(90,80);
ctx.lineTo(225,80);
ctx.stroke();
//Main Post horizontal bar side
ctx.moveTo(225,60);
ctx.lineTo(225,80);
ctx.stroke();
//Main post support bar
ctx.moveTo(30,120);
ctx.lineTo(90,60);
ctx.stroke();
//Main post support bar 2
ctx.moveTo(30,140);
ctx.lineTo(110,60);
ctx.stroke();
//Rope-Hanging
ctx.moveTo(225,80);
ctx.lineTo(225,120);
ctx.stroke();
//Rope-bar
ctx.moveTo(215,60);
ctx.lineTo(215,80);
ctx.stroke();
//Rope-bar 2
ctx.moveTo(220,60);
ctx.lineTo(220,80);
ctx.stroke();
//Rope-bar 3
ctx.moveTo(210,60);
ctx.lineTo(210,80);
ctx.stroke();
//bolts 1
ctx.lineWidth=1;
ctx.beginPath();
ctx.arc(35,64, 2, 0, Math.PI * 2, true);
ctx.stroke();
//bolts 2
ctx.beginPath();
ctx.arc(45,64, 2, 0, Math.PI * 2, true);
ctx.stroke();
//bolts 3
ctx.beginPath();
ctx.arc(91,64, 2, 0, Math.PI * 2, true);
ctx.stroke();
//bolts 4
ctx.beginPath();
ctx.arc(100,64, 2, 0, Math.PI * 2, true);
ctx.stroke();
//bolts 5
ctx.beginPath();
ctx.arc(35,119, 2, 0, Math.PI * 2, true);
ctx.stroke();
//bolts 6
ctx.beginPath();
ctx.arc(35,129, 2, 0, Math.PI * 2, true);
ctx.stroke();
//bolts 7
ctx.lineWidth=1;
ctx.beginPath();
ctx.arc(35,75, 2, 0, Math.PI * 2, true);
ctx.stroke();
//bolts 8
ctx.beginPath();
ctx.arc(45,75, 2, 0, Math.PI * 2, true);
ctx.stroke();
//bolts 9
ctx.lineWidth=1;
ctx.beginPath();
ctx.arc(36,395, 2, 0, Math.PI * 2, true);
ctx.stroke();
//bolts 10
ctx.beginPath();
ctx.arc(46,395, 2, 0, Math.PI * 2, true);
ctx.stroke();

//These are the functions that will draw the body parts when activated
Game.DrawHead = function() {
  //outer circle
  ctx.lineWidth=4;
   ctx.beginPath();
   ctx.arc(225, 145, 25, 0, Math.PI * 2, true);
   ctx.moveTo(240, 150);
   ctx.stroke();
   // Mouth (clockwise)
   ctx.beginPath();
   ctx.arc(225, 150, 15, 0, Math.PI, false);
   ctx.moveTo(65, 65);
   ctx.stroke();
   //eyes-right
   ctx.beginPath();
   ctx.arc(233,141,4,0,2*Math.PI, true);
   ctx.stroke();
   //eyes-left
   ctx.beginPath();
   ctx.arc(217,141,4,0,2*Math.PI, true);
   ctx.stroke();
  
 }

Game.DrawTorso = function() {
  ctx.lineWidth=4;
  ctx.beginPath();
  ctx.moveTo(225,170);
  ctx.lineTo(225,260);
  ctx.stroke();
}

Game.DrawLeftArm = function() {
  //left arm
  ctx.lineWidth=4;
  ctx.beginPath();
  ctx.moveTo(225,170);
  ctx.lineTo(200,250);
  ctx.stroke();
}

Game.DrawRightArm = function() {
  //right arm
  ctx.lineWidth=4;
  ctx.beginPath();
  ctx.moveTo(225,170);
  ctx.lineTo(250,250);
  ctx.stroke();
}

Game.DrawLeftLeg = function() {
  //left leg
  ctx.lineWidth=4;
  ctx.beginPath();
  ctx.moveTo(225,260);
  ctx.lineTo(200,300);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200,300);
  ctx.lineTo(210,350);
  ctx.stroke();
}

Game.DrawRightLeg = function() {
  //right leg
  ctx.lineWidth=4;
  ctx.beginPath();
  ctx.moveTo(225,260);
  ctx.lineTo(215,310);
  ctx.stroke();
  ctx.moveTo(215,310);
  ctx.lineTo(228,355);
  ctx.stroke();
}

/********************************************************************/
/********************************************************************/

//javascript connecting each button to the appropriate letter;

$(function(){
  $("#a").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("a");
      document.getElementById("a").style.display="none";
  });
  }
);

$(function(){
  $("#b").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("b");
      document.getElementById("b").style.display="none";
  });
  }
);

$(function(){
  $("#c").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("c");
      document.getElementById("c").style.display="none";
  });
  }
);

$(function(){
  $("#d").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("d");
      document.getElementById("d").style.display="none";
  });
  }
);

$(function(){
  $("#e").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("e");
      document.getElementById("e").style.display="none";
  });
  }
);

$(function(){
  $("#f").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("f");
      document.getElementById("f").style.display="none";
  });
  }
);

$(function(){
  $("#g").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("g");
      document.getElementById("g").style.display="none";
  });
  }
);

$(function(){
  $("#h").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("h");
      document.getElementById("h").style.display="none";
  });
  }
);

$(function(){
  $("#i").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("i");
      document.getElementById("i").style.display="none";
  });
  }
);

$(function(){
  $("#j").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("j");
      document.getElementById("j").style.display="none";
  });
  }
);

$(function(){
  $("#k").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("k");
      document.getElementById("k").style.display="none";
  });
  }
);$(function(){
  $("#l").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("l");
      document.getElementById("l").style.display="none";
  });
  }
);

$(function(){
  $("#m").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("m");
      document.getElementById("m").style.display="none";
  });
  }
);

$(function(){
  $("#n").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("n");
      document.getElementById("n").style.display="none";
  });
  }
);

$(function(){
  $("#o").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("o");
      document.getElementById("o").style.display="none";
  });
  }
);

$(function(){
  $("#p").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("p");
      document.getElementById("p").style.display="none";
  });
  }
);

$(function(){
  $("#q").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("q");
      document.getElementById("q").style.display="none";
  });
  }
);

$(function(){
  $("#r").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("r");
      document.getElementById("r").style.display="none";
  });
  }
);

$(function(){
  $("#s").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("s");
      document.getElementById("s").style.display="none";
  });
  }
);

$(function(){
  $("#t").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("t");
      document.getElementById("t").style.display="none";
  });
  }
);

$(function(){
  $("#u").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("u");
      document.getElementById("u").style.display="none";
  });
  }
);

$(function(){
  $("#v").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("v");
      document.getElementById("v").style.display="none";
  });
  }
);$(function(){
  $("#w").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("w");
      document.getElementById("w").style.display="none";
  });
  }
);

$(function(){
  $("#x").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("x");
      document.getElementById("x").style.display="none";
  });
  }
);

$(function(){
  $("#y").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("y");
      document.getElementById("y").style.display="none";
  });
  }
);

$(function(){
  $("#z").click(function(event) {
      event.preventDefault();
      Game.UpdateLetter("z");
      document.getElementById("z").style.display="none";
  });
  }
);

//Calling functions to pull word and set underline.
Game.PullWord();

Game.SetUnderline();

