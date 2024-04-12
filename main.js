const container = document.getElementById('container');

function start(){
  const keyword = document.createElement('div');
  keyword.classList.add('keyword');
  container.appendChild(keyword);

  let pattern = 'BNBNBBNBNBNBBNBNBBNBNBNBB';
  let notesIndex = 0;
  let whiteConsecutive = 0;
  let decalage = 0;

  for(let i = 0; i < pattern.length; i++){
    const notes = document.createElement('div');
    if(pattern[i] === 'B'){
      // Create white notes
      notes.classList.add('notes' + (notesIndex+1), 'white');
      whiteConsecutive++;
    } else {
      // Create black notes
      notes.classList.add('notes' + (notesIndex+1), "black");
      if(whiteConsecutive === 2){
        decalage += 4;
        notes.style.left = decalage + 'em';
      } else {
        notesIndex === 1 ? decalage += 1.5 : decalage += 2;
        notes.style.left = decalage + 'em';
      }
      whiteConsecutive = 0;
    }
    keyword.appendChild(notes);
    notesIndex++;
  }
  initEvent();
}

function initEvent(){

  function midiMessageReceived(event) {
    const notes_ON = 9;
    const notes_OFF = 8
    const cmd = event.data[0]; 
    const pitch = event.data[1];
    const timestamp = Date.now();
    if (cmd === notes_OFF) { 
        const notesStartTime = notessOn.get(pitch);
        if (notesStartTime) {
          const notes = document.querySelector('.notes' + (pitch - 47));
          if(notes){
            console.log(pitch- 47);
            notes.classList.remove('active');
          }
          notessOn.delete(pitch);
        }
    } else if (cmd === notes_ON) { 
        const notes = document.querySelector('.notes' + (pitch - 47));
        if(notes){
          console.log(pitch- 47);
          notes.classList.add('active');
        }
        notessOn.set(pitch, timestamp);
    }
  }

  const notessOn = new Map();

  function createMapping(){
    btn.addEventListener("click", clickMapping)  
   }

   const btn = document.createElement("button");
   btn.classList = "button"
   btn.innerHTML = `MAP`
   container.appendChild(btn)  
   let isMapping = false;

   function clickMapping(event){
    let key_div_map = [{}];
    let mapCounter = 0;
    isMapping = true;
    let notesIndex = 0;
    const divColor = document.querySelector(".notes .white")
    if(isMapping === true){
      let noteSequences = [{
        note1: "48", 
        note2: "49", 
        note3: "50", 
        note4: "51", 
        note5: "52", 
        note6: "53", 
        note7: "54", 
        note8: "55", 
        note9: "56", 
        note10: "57", 
        note11: "58", 
        note12: "59", 
        note12: "60", 
        note13: "61", 
        note14: "62", 
        note15: "63", 
        note16: "64", 
        note17: "65", 
        note18: "66", 
        note19: "67", 
        note20: "68", 
        note21: "69", 
        note22: "70", 
        note23: "71", 
        note24: "72"
      }];

      let map = []; 
      btn.innerHTML = `MAPPING`;
        btn.disabled = true;
        alert("Attention, tu map ton MIDI donc si tu reappuies sur la même touche et bah CHEH!!!" + " C'est tes choix")
            key_div_map.push(noteSequences)
            console.log(key_div_map)
            const pitche = event.data;
            const notes = document.querySelector('.notes .white' + (pitche - 47));
            for(let index = 0; index < 25; index++){
              notes.classList.add("yellow")
            }
      }  else {
      console.warn("error");
    } 
  }

  function onMIDISuccess(midiAccess) {
    console.log('MIDI Access Granted');
    initDevices(midiAccess);
  }

  function onMIDIFailure() {
    console.error('MIDI Access Denied');
  }

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

  function initDevices(midiAccess) {
    midiIn = [];
    midiOut = [];
    const inputs = midiAccess.inputs.values();
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        midiIn.push(input.value);
    }
    const outputs = midiAccess.outputs.values();
    for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
        midiOut.push(output.value);
    }
    startListening();
    createMapping();
  }

  function startListening() {
    for (const input of midiIn) {
      input.addEventListener('midimessage', midiMessageReceived);
    }
  }


}

start();
 

