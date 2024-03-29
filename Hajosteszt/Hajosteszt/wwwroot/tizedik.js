﻿var kerdesek;
var haladas = 1;
var ajdi = 0;
var szin;



var hotList = [];           
var questionsInHotList = 3; 
var displayedQuestion;    
var numberOfQuestions;     
var nextQuestion = 1;       
var timeoutHandler;
timeoutHandler = setTimeout(elore, 3000);
myStorage = window.localStorage;




window.onload = () => {
    init();
}



function letoltes() {
    //fetch('/questions/all').then(r => r.json()).then(d => letöltésBefejeződött(d));
    fetch('/questions/1')
        .then(response => response.json())
        .then(data => kerdesMegjelenites(data)
        );
}



function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kerdesek = d;
    //kerdesMegjelenites(0);
}



function kerdesMegjelenites() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerHTML = kérdés.questionText;
    document.getElementById("válasz1").innerHTML = kérdés.answer1;
    document.getElementById("válasz2").innerHTML = kérdés.answer2;
    document.getElementById("válasz3").innerHTML = kérdés.answer3;
    if (kérdés.image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    } else {
        document.getElementById("kép1").src = "";
    }
}



function elore() {
    document.getElementById("válasz1").style.backgroundColor = "white"
    document.getElementById("válasz2").style.backgroundColor = "white"
    document.getElementById("válasz3").style.backgroundColor = "white"
    document.getElementById(`válasz1`).style.pointerEvents = "auto"
    document.getElementById(`válasz2`).style.pointerEvents = "auto"
    document.getElementById(`válasz3`).style.pointerEvents = "auto"
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kerdesMegjelenites()
}



function vissza() {
    document.getElementById("válasz1").style.backgroundColor = "white"
    document.getElementById("válasz2").style.backgroundColor = "white"
    document.getElementById("válasz3").style.backgroundColor = "white"
    document.getElementById(`válasz1`).style.pointerEvents = "auto"
    document.getElementById(`válasz2`).style.pointerEvents = "auto"
    document.getElementById(`válasz3`).style.pointerEvents = "auto"
    displayedQuestion--;
    if (displayedQuestion === -1) displayedQuestion = 2;
    kerdesMegjelenites()



}



function szinez() {
    let jovalasz = hotList[displayedQuestion].question;
    document.getElementById(`válasz1`).style.pointerEvents = "none"
    document.getElementById(`válasz2`).style.pointerEvents = "none"
    document.getElementById(`válasz3`).style.pointerEvents = "none"
    //localStorage.setItem( ); nem értem ezt a részt.



    if (jovalasz.correctAnswer == 1) {
        document.getElementById("válasz1").style.backgroundColor = "green"
        document.getElementById("válasz2").style.backgroundColor = "red"
        document.getElementById("válasz3").style.backgroundColor = "red"

    }
    else if (jovalasz.correctAnswer == 2) {
        document.getElementById("válasz1").style.backgroundColor = "red"
        document.getElementById("válasz2").style.backgroundColor = "green"
        document.getElementById("válasz3").style.backgroundColor = "red"

    }
    else {
        document.getElementById("válasz1").style.backgroundColor = "red"
        document.getElementById("válasz2").style.backgroundColor = "red"
        document.getElementById("válasz3").style.backgroundColor = "green"

    }
}



function ellenorzesElso() {
    let jovalasz = hotList[displayedQuestion].question;
    if (jovalasz.correctAnswer == 1) {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion)
            nextQuestion++
        }
    } else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
}



function ellenorzesMasodik() {
    let jovalasz = hotList[displayedQuestion].question;
    if (jovalasz.correctAnswer == 2) {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion)
            nextQuestion++
        }
    } else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
}



function ellenorzesHarmadik() {
    let jovalasz = hotList[displayedQuestion].question;
    if (jovalasz.correctAnswer == 3) {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion)
            nextQuestion++
        }
    } else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
}




function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${Response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kerdesMegjelenites();
                }
            }
        );
}



function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }



    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}