const firebase = require('firebase');
const rlsync = require('readline-sync');
const chalk = require('chalk');
let yellow = chalk.yellow;
let green = chalk.green;
let red = chalk.red;
let Sports = ["First indian Formula1 Team?","The first Indian Batsman to complete 10000 runs in Test Cricket?","The first Indian world champion in Billiards?","The first Indian Cricketer to score a century?"];

let sportsChoices0 = ["ForceIndia","RacingPoint","Mercedes","RedBull"];

let sportsChoices1 = ["virendarShewag","sunilgavaskar","kapildev","lalaAmarnath"];

let sportsChoices2 = ["wiljones","williamsonjones","wilsonjones","KevinPeterson"];

let sportsChoices3 = ["sachin","sunilgavaskar","kapildev","lalaamarnath"];

let sportsAnswers = {0:"ForceIndia",1:"sunilgavaskar",2:"wilsonjones",3:"lalaAmarnath"};

let score = 0;
let i = 0;
let choiceArray = [sportsChoices0,sportsChoices1,sportsChoices2,sportsChoices3];

function scoreCard(i,index){
    if(sportsAnswers[i]===eval("sportsChoices"+i+"["
+index+"]")){
      score+=1;
    }
}

function quiz(){
      console.log(red(".....Welcome to Indian Sports Quiz...... \n"));
    for(i=0;i<Sports.length;i++)
  {
      console.log(green(Sports[i]));
      index = rlsync.keyInSelect(choiceArray[i],'');
      //this function calculates the score by comparing
      //the value selected with the correct answer
      scoreCard(i,index);
      console.log("................");
  }
  console.log(yellow("Your score is:"+score+""));
  gameManager();
}

function gameManager(){

  if(rlsync.keyInYN("dou you want to play again?")){
    quiz();
  }else{
    console.log("Thanks for playing, Bye");
  }
  
}

quiz();

