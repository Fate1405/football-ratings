const attributes = ["Pace", "Shooting", "Passing", "Dribbling", "Defending", "Physicality", "Keeping"];

const C = {D: 400, K: 32};

function attrSwitcher() {
    const attribute = document.getElementById("attribute");
    const image = document.getElementById("attribute-image");

    attribute.innerHTML = attributes[Math.floor(Math.random() * attributes.length)];

    switch (attribute.innerHTML) {
        case "Pace":
            image.src = "./resources/media/speed.jpg";
            break;
        case "Shooting":
            image.src = "./resources/media/shoot.jpg";
            break;
        case "Passing":
        image.src = "./resources/media/pass.jpg";
            break;
        case "Dribbling":
            image.src = "./resources/media/dribble.jpg";
            break;
        case "Defending":
            image.src = "./resources/media/defence.jpg";
            break;
        case "Physicality":
            image.src = "./resources/media/physical.jpg";
            break;
        case "Keeping":
            image.src = "./resources/media/keep.jpg";
            break;
        default:
            image.src = "https://via.placeholder.com/150";
        
    }
}

function playerSwitcher(players) {
    const player1 = document.getElementById("player-1");
    const player2 = document.getElementById("player-2");

    let choice1 = players[Math.floor(Math.random() * players.length)];
    newArr = players.filter(item => item !== choice1);
    let choice2 = newArr[Math.floor(Math.random() * newArr.length)];

    player1.innerHTML = choice1;
    player2.innerHTML = choice2;
}

function main(winner) {

    let data;
    let players;

    let dataReq = new XMLHttpRequest();

    dataReq.onload = function() {
        data = this.responseText;
    };

    dataReq.open("GET", "https://ratings.zuiderheide.com/resources/scripts/get-data.php", false);
    dataReq.send();

    for (let i = 0; i < data.length; i++) {
        players.push(data[i]["Player"]);
    }

    console.log(data);

    if (winner) {
        const pagePlayer1 = document.getElementById("player-1").innerHTML;
        const pagePlayer2 = document.getElementById("player-2").innerHTML;
        const currentAttr = document.getElementById("attribute").innerHTML;
        let player1 = data.filter(item => item["Player"] === pagePlayer1);
        let player2 = data.filter(item => item["Player"] === pagePlayer2);
        let player1App = player1["Appearances"];
        let player2App = player2["Appearances"];
    

    
        let expected1 = 1 / (1 + 10 ** ((player2[currentAttr] - player1[currentAttr]) / C.D));
        let expected2 = 1 / (1 + 10 ** ((player1[currentAttr] - player2[currentAttr]) / C.D));
    
        if (winner === 1) {
    
            player1[currentAttr] += Math.floor(C.K * (1 - expected1));
            player2[currentAttr] += Math.floor(C.K * (0 - expected2));
    
        } else if (winner === 2) {
    
            player1[currentAttr] += Math.floor(C.K * (0 - expected1));
            player2[currentAttr] += Math.floor(C.K * (1 - expected2));
        }

        let sendData = new XMLHttpRequest();

        sendData.open("GET", `https://ratings.zuiderheide.com/resources/scripts/send-data.php?q=${player1[currentAttr]}_${player2[currentAttr]}_${player1App++}_${player2App++}_${currentAttr}_${pagePlayer1}_${pagePlayer2}`, false);
        sendData.send();

    }

    playerSwitcher(players);
    attrSwitcher();
}

main(0);