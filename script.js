// Plotly.newPlot('chart', [{
//     y: [0],
//     type: 'line',
//     layout: {
//         xaxis: {
//             title: 'Time'
//         },
//         yaxis: {
//             title: 'Humidity (%)'
//         },
//         width: 200,
//         height: 200,
//     },
//     scrollZoom: true
// }]);

var layout = {
    showlegend: false,


};

var trace1 = {
    y: [0],
    type: 'line',
    line: { color: '#f30242' }
};

var data = [trace1]

var config = {
    displayModeBar: false,
    scrollZoom: true,
    responsive: true,
    autosizable: true,
};


// Plotly.newPlot('chart', [{y: [0]}] , layout, {scrollZoom: true});
Plotly.newPlot('chart', data, layout, config);





var gateway = `ws://192.168.199.144/ws`;

var websocket;
window.addEventListener('load', onload);

function onload(event) {
    initWebSocket();
    navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
}

window.addEventListener("load", onload)





function getReadings() {
    websocket.send("getReadings");
}

function initWebSocket() {
    console.log('Trying to open a WebSocket connection…');
    websocket = new WebSocket(gateway);
    console.log("hi");
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log('Connection opened');
    getReadings();
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}


function onMessage(event) {
    console.log(event.data);
    var myObj = JSON.parse(event.data);
    var key = "message";
    plotter(parseInt(myObj[key]));
    document.getElementById("humidity").innerHTML = myObj[key];
}

function plotter(data) {
    var cnt = 0;
    Plotly.extendTraces('chart', { y: [[data]] }, [0]);
    cnt++;

    if (cnt > 500) {
        Plotly.relayout('chart', {
            xaxis: {
                range: [cnt - 500, cnt]
            }
        });
    }

}
