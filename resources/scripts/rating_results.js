let getData = new XMLHttpRequest();

getData.onreadystatechange = (attribute) => {

    console.log("Get Working...");
    let data = JSON.parse(getData.responseText);

    for (let i = 0; i < data.length; i++) {
        for (let [key, val] of Object.entries(data[i])) {
            if (key !== "Player")
            data[i][key] = parseInt(val);
        }
    }

    let newData = [];

    for (let i = 0; i < data.length; i++) {
        newData.push([data[i]["Player"], data[i][attribute]]);
    }

    newData.sort((a, b) => a[1] - b[1]);

    let values = [];
    let keys = [];

    for (let i = 0; i < newData.length; i++) {
        values.push(newData[i][1]);
    }

    for (let i = 0; i < newData.length; i++) {
        keys.push(newData[i][0]);
    }

    const ctx = document.getElementById('myChart');

    ctx.remove();

    const ctx = document.createElement("canvas");

    ctx.setAttribute("width", 600);
    ctx.setAttribute("height", 600);
    ctx.setAttribute("width", 600);
    ctx.id = "myChart";

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: keys,
            datasets: [{
                label: `Elo Score for ${attribute}`,
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

// Charting

function main(obj) {
    const attribute = obj.innerHTML;
    getData.open("GET", "https://ratings.zuiderheide.com/resources/scripts/get-data.php");
    getData.send();
}