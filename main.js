const container = document.createElement("div")
container.classList = "container";
document.body.appendChild(container)
const white = document.createElement("div");

function piano(){
    for(let d = 0; d < 2; d++){
        for(let i = 0; i < 2; i++){
            const white = document.createElement("div");
            white.classList = "white";
            container.appendChild(white);
            const black = document.createElement("div");
            black.classList = "black";
            white.appendChild(black);
            white.setAttribute("data-id", "1")
        }
            const div = document.createElement("div");
            div.classList = "white";
            container.appendChild(div);
            div.setAttribute("data-id", "2")
                for (let j = 0; j < 3; j++) {   
                    const white = document.createElement("div");
                    white.classList = "white";
                    container.appendChild(white);
                    const black = document.createElement("div");
                    black.classList = "black";
                    white.appendChild(black);
                    white.setAttribute("data-id", "3")
                }
                const blanc = document.createElement("div");
            blanc.classList = "white";
            container.appendChild(blanc);
           blanc.setAttribute("data-id", "4")
        }    
    }
piano();


const btn = document.createElement("button");
btn.classList = "btn";
btn.innerHTML = `MAPPING`
document.body.appendChild(btn)

function mappingBtn(){
    btn.addEventListener("click", () => {
        white.classList.add("aqua")
    })
}
mappingBtn();
// for(let i = 0; i <= 17; i++){


//     white.addEventListener("click", () => {
//         let rdm = Math.floor(Math.random() * 10);
//         white.style.backgroundColor = "aqua"
//     })
// }


navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

let notes = [{
    Do: "do",
    Ré: "ré",
    Mi: "mi",
    Fa: "fa",
    Sol: "sol",
    La: "la",
    Si: "si"
}]

function onMIDISuccess(midiAccess) {
    midiAccess.inputs.forEach((input) => {
        console.log(input)
        input.onmidimessage = onMIDIMessage;
    });
}

function onMIDIFailure(error) {
    // console.log(error);
}

function onMIDIMessage(event) {
  let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
  for (const character of event.data) {
    str += `0x${character.toString(16)} `;
  }
   console.log(event.data);
  console.log(str);
}

function startLoggingMIDIInput(midiAccess) {
  midiAccess.inputs.forEach((entry) => {
    entry.onmidimessage = onMIDIMessage;
  });
}

function getMIDIMessage(message) {
    let command = message.data[0];
    let note = message.data[1];
    let velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

    switch (command) {
        case 144: // noteOn
            if (note > 0) {
                noteOn();
            } else {
                noteOff();
            }
            break;
        case 128: // noteOff
            noteOff();
            break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
   console.log(message.data[1]);

}

function noteOn(note) {
}
function noteOff(note) {
}