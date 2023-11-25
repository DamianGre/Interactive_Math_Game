let score = 0;
let timer = 7.0;
let correctAnswer;
let level = 1;
let time = 7.0;
let hasTime = true;
let startTimerIsRunning = false;
let lifes = 3;

var heartOne = document.getElementById('image-heart-1');
var heartTwo= document.getElementById('image-heart-2');
var heartTree = document.getElementById('image-heart-3');

function generateEquation(){   
    if(startTimerIsRunning == false) 
    {
        startTimer();
        startTimerIsRunning = true;
    }
    time = 7.0;
    const number1 = Math.floor(Math.random() * 10 * level) + 1;
    const number2 = Math.floor(Math.random() * 10 * level) + 1;

    operators = ['+', '-', '*', '/'];
    const operator =  operators[Math.floor(Math.random() * operators.length)];
    let equation = number1 + " " + operator + " " + number2 + ' =?';
    document.getElementById('equation').innerText = equation;

    switch(operator){
        case '+':
            correctAnswer = Number(number1) + Number(number2)
                break;
        case '-':
            correctAnswer = Number(number1) - Number(number2)
                break;
        case '*':
            correctAnswer = Number(number1) * Number(number2)
                break;
        case '/':            
            correctAnswer = Number(number1) / Number(number2)      
                break;
    }

    if(!Number.isInteger(correctAnswer) || correctAnswer < 0){
        generateEquation();
    }   
}

function checkAnswer(){
    
    const answer = Number(document.getElementById('answer').value)
    if(answer === correctAnswer && hasTime)
    {
        score++;
        document.getElementById('score').innerText = score;        

        if(score > level * 10){
            level += 1;
            document.getElementById('level').innerText = level;
        }

        generateEquation();
        document.getElementById('answer').value = '';
    }
    else if(hasTime)
    {        
        if(lifes == 1){
            openGameOverPopup();
            score--;
            lifes--;
        }else{
            openWrongAnswerPopup(); 
            score--;
            lifes--;
            document.getElementById('score').innerText = score;
            document.getElementById('answer').value = '';    
            time = 7.0;   
        }      
    }
}

function startTimer(){
    hasTime = true;
    time = 7.0;
    let timer = setInterval(() => {
        time--;        
        if(time <= 0)
        {
            hasTime = false;
            clearInterval(timer);
            startTimerIsRunning = false;
            openTimerPopup();
        } 
        
        if(lifes == 0)
        {     
            heartOne.style.display = 'none';         
            heartTwo.style.display = 'none';   
            heartTree.style.display = 'none';
            closeTimerPopup();
            
            hasTime = false;
            if(lifes < 0)
            {
                lifes = 0;
            } 
            clearInterval(timer);
            startTimerIsRunning = false;
            openGameOverPopup();
        } 
        
        if(lifes == 1){         
            heartTwo.style.display = 'none';    
            heartTree.style.display = 'none';
        }
        if(lifes == 2){                  
            heartTree.style.display = 'none';
        }
        if(lifes == 3){         
            heartOne.style.display = 'flex';         
            heartTwo.style.display = 'flex';   
            heartTree.style.display = 'flex';
        }
        document.getElementById('time').innerText = time; 
        document.getElementById('score').innerText = score;
    }, 1000);    
}

var confirmAnswerButton = document.getElementById('answer-button');
var closeTimerPopupButton = document.getElementById('close-timer-popup-button');
var closeGameOverPopupButton = document.getElementById('close-game-over-popup-button');
var wrongAnswerPopupButton = document.getElementById('close-wrong-answer-popup-button');


confirmAnswerButton.addEventListener('click', checkAnswer);
document.getElementById('answer').addEventListener('keyup', function(e){
    if (e.key === 'Enter'){        
        checkAnswer()
    }        
  });

closeTimerPopupButton.addEventListener('click', function() {
    closeTimerPopup();
    generateEquation();
});
document.getElementById('close-timer-popup-button').addEventListener('keyup', function(e){
    if (e.key === 'Enter'){        
        closeTimerPopup();
        generateEquation();
    }        
  });

  closeGameOverPopupButton.addEventListener('click', function() {
    closeGameOverPopup();
    generateEquation();
});
document.getElementById('close-game-over-popup-button').addEventListener('keyup', function(e){
    if (e.key === 'Enter'){        
        closeGameOverPopup();        
    }        
  });

wrongAnswerPopupButton.addEventListener('click', function() {
    closeWrongAnswerPopup();
});
document.getElementById('close-wrong-answer-popup-button').addEventListener('keyup', function(e){
    if (e.key === 'Enter'){        
        closeWrongAnswerPopup();       
    }        
  });

function openTimerPopup() {
    document.getElementById('timer-popup').style.display = 'flex';  
    score--;
    lifes--;  
}

function closeTimerPopup() {
    document.getElementById('timer-popup').style.display = 'none';
}


function openGameOverPopup() {
    document.getElementById('game-over-popup').style.display = 'flex';      
    document.getElementById('player-final-score').innerText = score;    
}


function closeGameOverPopup() {
    document.getElementById('game-over-popup').style.display = 'none';
    startNewGame();
}

function closeWrongAnswerPopup() {
    document.getElementById('wrong-answer-popup').style.display = 'none';
}


function openWrongAnswerPopup() {
    document.getElementById('wrong-answer-popup').style.display = 'flex';       
}

function startNewGame() {
    lifes = 3;
    score = 0;    
    document.getElementById('score').innerText = score;   
    document.getElementById('answer').value = '';  
    generateEquation();      
}

generateEquation();



 

 

