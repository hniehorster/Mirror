
var socket = new WebSocket('wss://data.alpaca.markets/stream');

socket.onopen = function(e) {
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket.send('{"action": "authenticate", "data": {"key_id": "2f5677eb2c35fa628c3f677497377344", "secret_key": "f8852310b4ab0f2680de8d7960318182455d9609"}}');
};


socket.onmessage = function(event) {
    alert(`[message] Data received from server: ${event.data}`);
};