const serviceAccount = require('./quizapp-011220-firebase-adminsdk-zywuo-97a485084c.json');
const firebase_admin = require('firebase-admin');
const rlsync = require('readline-sync');
const chalk = require('chalk');
const { database } = require('firebase-admin');
const { doesNotMatch } = require('assert');
let yellow = chalk.yellow;
let green = chalk.green;
let red = chalk.red;
let magenta = chalk.magenta;
let italic = chalk.italic;
firebase_admin.initializeApp({
  credential:firebase_admin.credential.cert(serviceAccount)
});

var db = firebase_admin.firestore();

let Sports = {};

let sportsAnswers = {};

let user = "";
let email = "";

let score = 0;
let i = 0;

var choiceArr = new Array();

user = rlsync.question('Hai, We want you to register! name?');
email = rlsync.question('Thanks '+user+', your email?');
console.log("thanks for telling us who you are!\n");

//This function is for user welcome! This will also registers the user in the db
const User = db.collection('userdetails').doc(user);
async function firebaseWelcome(){
    await User.set({
      "email":email
    });
  return "done";
}

//This function is for question array (i,e) This function will store all the questions 
//of a particular type in a single array
async function firebaseQues(){
    const snap = await db.collection('questions').get();
    var value = snap.docs;
  await firebaseChoice();
  await firebaseAnswers();
      for(let val of snap.docs){
        Sports = val.data();
      };
  quiz();
  return "done";
}

//This function is for Answers array (i,e) This function will have the right answers
//for all the questions
async function firebaseAnswers(){
  const snap = await db.collection('answers').get();
      for(let val of snap.docs){
        sportsAnswers = val.data();
      };
  return "done";
}

//This function is for choice array (i,e) every question will have 4 choices and this function will 
//create that array
async function firebaseChoice(){
  const snap = await db.collection('SportsChoice').get();
      for(let val of snap.docs){
        choiceArr.push(val.data());
      };
  return "done";
}

//This function is for score updation (i,e) This function will update the final score of 
//the users to the db and displays the high score
const scoreDocRef = db.collection('scoreCard').doc('Sports');
async function firebaseScore(score){
  let obj = {};
  obj[user] = score;
      await scoreDocRef.update(obj);
      var overallDict = await db.collection('scoreCard').doc('Sports').get();
  let sortable = [];
  let  dict = overallDict.data()
      for(let user in dict){
        sortable.push([dict[user],user]);
      }
  sortable.sort();
  sortable.reverse();
  console.log(magenta(italic("High Scores....\n")));
      for(i=0;i<sortable.length;i++){
          console.log("||",sortable[i][1],"|",sortable[i][0],"||");
      }
}

//This function will check the answers and increments the score
function scoreCard(i,index){
    if(sportsAnswers[i]===choiceArr[i][index]){
      score+=1;
    }
}

//!!!!!!!This function will run the game!!!!!!!!
function quiz(){
    console.log(red(".....Welcome to Indian Sports Quiz...... \n"));
    score = 0;
            for(i=0;i<Object.keys(Sports).length;i++)
          {
              console.log(green(Sports[i]));
              index = rlsync.keyInSelect(Object.values(choiceArr[i]),'');

              scoreCard(i,index);
              console.log("................");
          }
      console.log(yellow("Your score is:"+score+""));
      firebaseScore(score);
      gameManager();
}

//This function will decide whether to restart the game or not!
function gameManager(){
    if(rlsync.keyInYN(magenta("would you like to play again?"))){
      quiz();
    }else{
      console.log("Thanks for playing, Bye");
    }
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//The App is triggered from here!
firebaseWelcome();
firebaseQues();