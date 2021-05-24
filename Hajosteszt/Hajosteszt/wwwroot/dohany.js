var haladás = 1;
var hossz;
var ajdi;

fetch('api/vizipipa/count')
    .then(result => result.text())
    .then(n => { hossz = parseInt(n) })

window.onload = () => {
    letöltés();
    document.getElementById("addButton").addEventListener("click", () => {

        let data = {
            VizipipaDohanyNeve: document.getElementById("ujiz").value
        }

        fetch("api/vizipipa",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        ).then(x => {
            if (x.ok) {
                alert("siker");
            }
            else {
                alert("kudarc");
            }
        });

    })


    document.getElementById("RemoveButton").addEventListener("click", () => {
        let id = document.getElementById("torlendoiz").value
        console.log(id)
        fetch(`/api/vizipipa/${id}`, {
            method: 'DELETE',
        }).then(y => {
            if (y.ok) {
                alert("siker");
            }
            else {
                alert("kudarc");
            }
        })
    })

}

function letöltés() {
    fetch('api/vizipipa/1')
        .then(response => response.json())
        .then(data => Ízmegjelenites(data)
        );

}

function ÍzBetoltes(id) {
    ajdi = id;
    fetch(`api/vizipipa/${ajdi}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }

        })
        .then(data => Ízmegjelenites(data));
}




function Ízmegjelenites(k) {
    console.log(k);
    document.getElementById("ÍzList").innerHTML = k.vizipipaDohanyNeve;
}
function elore() {
    haladás++
    if (haladás == hossz) {
        haladás = 1;
    }
    ÍzBetoltes(haladás);
}
function vissza() {
    haladás--;
    if (haladás == 0) {
        haladás = hossz;

    }
    ÍzBetoltes(haladás);

}