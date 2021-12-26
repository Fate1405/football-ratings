let data = {Red: 1000, Green: 1000, Blue: 1000, Yellow: 1000};

const players = Object.keys(data);

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

function updateTable() {
    const red = document.getElementById("red");
    const green = document.getElementById("green");
    const blue = document.getElementById("blue");
    const yellow = document.getElementById("yellow");

    red.innerHTML = data.Red;
    green.innerHTML = data.Green;
    blue.innerHTML = data.Blue;
    yellow.innerHTML = data.Yellow;
}

function playerSwitcher() {
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

    let dataReq = new XMLHttpRequest();

    dataReq.onload = function() {
        data = this.responseText;
    };

    dataReq.open("GET", "https://ratings.zuiderheide.com/resources/scripts/get-data.php");
    dataReq.send();

    console.log(data);

    if (winner) {
        const player1 = document.getElementById("player-1").innerHTML;
        const player2 = document.getElementById("player-2").innerHTML;
    
    
        let expected1 = 1 / (1 + 10 ** ((data[player2] - data[player1]) / C.D));
        let expected2 = 1 / (1 + 10 ** ((data[player1] - data[player2]) / C.D));
    
        if (winner === 1) {
    
            data[player1] += Math.floor(C.K * (1 - expected1));
            data[player2] += Math.floor(C.K * (0 - expected2));
    
        } else if (winner === 2) {
    
            data[player1] += Math.floor(C.K * (0 - expected1));
            data[player2] += Math.floor(C.K * (1 - expected2));
        }
    }

    playerSwitcher();
    updateTable();
    attrSwitcher();
}

main(0);