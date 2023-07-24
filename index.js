var socket = new WebSocket("ws://localhost:3000");

var note = "";
function setup() {
	// The socket connection needs two event listeners:
	socket.onopen = openSocket;
}

function openSocket() {
	console.log("Socket open");
}

// Enable WebMidi.js and trigger the onEnabled() function when ready.
WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));

function onEnabled() {

  if (WebMidi.inputs.length < 1) {
    document.body.innerHTML+= "No device detected.";
  } else {
    WebMidi.inputs.forEach((device, index) => {
      document.body.innerHTML+= `${index}: ${device.name} <br>`;
    });
  }

  const mySynth = WebMidi.inputs[1];
//   // const mySynth = WebMidi.getInputByName("TYPE NAME HERE!")

  mySynth.channels[1].addListener("noteon", e => {
    // document.body.innerHTML+= `${e.note.identifier} <br>`;

    address = "/channel/1/noteon/"
    message = address + e.data[1];

    console.log(message);
    socket.send(message);


  });


  mySynth.channels[1].addListener("noteoff", e => {
    // document.body.innerHTML+= `${e.note.identifier} <br>`;

    address = "/channel/1/noteoff/"
    message = address + e.data[1];

    console.log(message);
    socket.send(message);


  });
  // mySynth.channels[1].addListener("noteoff", e => {
  //   // document.body.innerHTML+= `${e.note.identifier} <br>`;

  //   address = "/channel/1/note/"
  //   message = address + e.data[1];

  //   console.log(e);
  //   socket.send(message);


  // });


    mySynth.channels[10].addListener("noteon", e => {
    // document.body.innerHTML+= `${e.note.identifier} <br>`;
    address = "/channel/10/noteon/"
    message = address + e.data[1];
    console.log(message);
    socket.send(message);
  });
  mySynth.channels[10].addListener("noteoff", e => {
    // document.body.innerHTML+= `${e.note.identifier} <br>`;
    address = "/channel/10/noteoff/"
    message = address + e.data[1];
    console.log(message);
    socket.send(message);
  });
  mySynth.channels[1].addListener("controlchange", e => {
    // document.body.innerHTML+= `${e.note.identifier} <br>`;
    address = "/channel/1/controlchange/"
    message = address + e.controller.number + "/" + e.data[2]
    console.log(message);
    socket.send(message);


  });

  mySynth.channels[1].addListener("pitchbend", e => {
    // document.body.innerHTML+= `${e.note.identifier} <br>`;

    address = "/channel/1/pitchbend/"
    message = address + e.value;
    console.log(message);
    socket.send(message);
  });

  // mySynth.channels[1].addListener("control110", e => {
  //   // document.body.innerHTML+= `${e.note.identifier} <br>`;
  //   console.log(e);
  // });

  //   mySynth.channels[1].addListener("midimessage", e => {
  //   // document.body.innerHTML+= `${e.note.identifier} <br>`;
  //   console.log(e);
  // });


}

