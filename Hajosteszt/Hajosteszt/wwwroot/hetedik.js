var kérdések
var haladás = 0
window.onload = () => { letöltés() }
function letöltés() {
    fetch('/question.json')
        .then(r => r.json())
        .then(d => letöltésBefejeződött(d)
        );

    }
function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésmegjelenítés(0)
}
function kérdésmegjelenítés(k) {
    document.getElementById("kérdés_szöveg").innerHTML = kérdések[k].questionText
    document.getElementById("válasz1").innerHTML = kérdések[k].answer1
    document.getElementById("válasz2").innerHTML = kérdések[k].answer2
    document.getElementById("válasz3").innerHTML = kérdések[k].answer3
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[k].image
}
function vissza() {
    document.getElementById("válasz1").style.backgroundColor = "white"
    document.getElementById("válasz2").style.backgroundColor = "white"
    document.getElementById("válasz3").style.backgroundColor = "white"
    if (haladás == 0) {
        haladás = 2
        kérdésmegjelenítés(haladás)
    }
    else {
        haladás = haladás - 1
        kérdésmegjelenítés(haladás)
    }
}
function elore() {
    haladás++
    document.getElementById("válasz1").style.backgroundColor = "white"
    document.getElementById("válasz2").style.backgroundColor = "white"
    document.getElementById("válasz3").style.backgroundColor = "white"
    if (haladás == kérdések.length) {
        haladás=0
    }
    kérdésmegjelenítés(haladás)
}
function valasz() {
    var jovalasz = kérdések[haladás].correctAnswer
    // console.log(jovalasz)
    if (jovalasz == 1) {
        document.getElementById("válasz1").style.backgroundColor = "green"
        document.getElementById("válasz2").style.backgroundColor = "red"
        document.getElementById("válasz3").style.backgroundColor = "red"
    }
    else if (jovalasz == 2) {
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

//var kerdesek;
var haladas = 1;
var ajdi = 0;
var szin;

window.onload = () => {
    letoltes()
}

function letoltes() {
    fetch('/questions/1')
        .then(response => response.json())
        .then(data => kerdesMegjelenites(data)
        );
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kerdesek = d;
}    

function kerdesMegjelenites(k) {
    console.log(k);
    szin = k;
    document.getElementById("kérdés_szöveg").innerHTML = k.questionText;
    document.getElementById("válasz1").innerHTML = k.answer1;
    document.getElementById("válasz2").innerHTML = k.answer2;
    document.getElementById("válasz3").innerHTML = k.answer3;
    if (k.image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/
        " + k.image;"
    }
    else {
        document.getElementById("kép1").src = "";
    }
}

function elore() {
    document.getElementById("válasz1").style.backgroundColor = "white"
    document.getElementById("válasz2").style.backgroundColor = "white"
    document.getElementById("válasz3").style.backgroundColor = "white"
    haladas++
    if (haladas == 860) {
        haladas = 1;
    }
    kérdésBetöltés(haladas);
}

function vissza() {
    document.getElementById("válasz1").style.backgroundColor = "white"
    document.getElementById("válasz2").style.backgroundColor = "white"
    document.getElementById("válasz3").style.backgroundColor = "white"
    haladas--;
    if (haladas == 0) {
        haladas = 859;
        
    }
    kérdésBetöltés(haladas);

}

function szinez() {
    var jovalasz = szin.correctAnswer;
    if (jovalasz == 1) {
        document.getElementById("válasz1").style.backgroundColor = "green"
        document.getElementById("válasz2").style.backgroundColor = "red"
        document.getElementById("válasz3").style.backgroundColor = "red"
    }
    else if (jovalasz == 2) {
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

function kérdésBetöltés(id) {
    ajdi = id;
    fetch(/questions/${ ajdi })
        .then(response => {
            if (!response.ok) {
                console.error(Hibás válasz: ${ response.status })
            }
            else {
                return response.json()
            }
        })
        .then(data => kerdesMegjelenites(data));
}