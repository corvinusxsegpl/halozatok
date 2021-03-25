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
