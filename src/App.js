import React, { useEffect, useState } from 'react';
import './App.css';


const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];


function App() {

  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");
  const [speed, setSpeed] = useState(0.5);

  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(' ');
    const interval = setInterval(() => {
    const audioTag = document.getElementById(recordArray[index]);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    index++;
    }, speed * 600);
    setTimeout(() => clearInterval(interval), 600 * speed * recordArray.length -1);
  };

  return (
    <div className="App">
      <h1>Drum Machine</h1>
      <div id="drum-machine" className="drum-machine">
        {audioClips.map(clip => {
          return <Pad key = {clip.id} clip = {clip} volume={volume} setRecording = {setRecording}/>
        })}
      </div>

          <div className="ip-section">
            <h3>Volume</h3>
            <input type = "range"
                  step = "0.01" 
                  onChange={(event) => setVolume(event.target.value)} 
                  value={volume} 
                  max="1" 
                  min="0" 
                  className="volume"
                  />
          </div>

          <div className="record">
            <h3>Sequence: {recording}</h3>
            <button onClick={playRecording}>Play</button>
            <button onClick={() => setRecording("")}>Clear</button>
            <br/>
            <h4>Speed</h4>
            <input type = "range"
                   step = "0.01" 
                   onChange={(event) => setSpeed(event.target.value)} 
                   value={speed} 
                   max="1.2" 
                   min="0.1" 
                   className="volume"
            />
          </div>
          
          <div className="footer">
            <footer>
              <p className="footer__text">
              © 2021 - Website developed by <a href="https://github.com/bishalmallick" target="_blank" rel="noopener noreferrer"> Bishal Mallick</a>
              </p>
            </footer>
          </div>
    </div>
  );
}

const Pad = ({clip, volume, setRecording}) => {

  const [active, setActive] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  })

  const handleKeyPress = (e) => {
    if(e.keyCode === clip.keyCode){
      playSound();
    }
  }

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setActive(true);
    setTimeout(() => setActive(false), 200);
    setRecording((prev) =>  prev + clip.keyTrigger + " ");
  }


  return(
    <div onClick = {playSound} className={`drum ${active && "active"}`}>
      <audio id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  )

}

export default App;
