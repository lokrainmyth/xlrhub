const tracks = [
  { name:'VOCAL', file:'vocal.mp3', level:78 },
  { name:'DRUMS', file:'drums.mp3', level:82 },
  { name:'BASS', file:'bass.mp3', level:74 },
  { name:'GUITAR', file:'guitar.mp3', level:68 },
  { name:'EFFECTS', file:'effects.mp3', level:55 }
];
const effects = ['LO-FI','REVERB','FILTER','DISTORTION'];
const mixerGrid = document.querySelector('#mixerGrid');
const effectBank = document.querySelector('#effectBank');
const audio = tracks.map(track => new Audio(`assets/${track.file}`));
audio.forEach(a => { a.loop = true; a.preload = 'none'; });

tracks.forEach((track, index) => {
  const card = document.createElement('article');
  card.className = 'channel';
  card.innerHTML = `<div class="channel-head"><span class="channel-name">${track.name}</span><span class="channel-index">0${index + 1}</span></div><div class="channel-controls"><div class="fader" style="--level:${track.level}%"><input aria-label="${track.name} volume" type="range" min="0" max="100" value="${track.level}"></div><div class="knob channel-knob"><span></span></div><button class="mute" aria-pressed="false">MUTE</button></div><div class="channel-footer"><small>${track.file}</small><span class="signal"><i></i><i></i><i></i></span></div>`;
  const input = card.querySelector('input');
  const mute = card.querySelector('.mute');
  input.addEventListener('input', () => { audio[index].volume = input.value / 100; card.querySelector('.fader').style.setProperty('--level', `${input.value}%`); });
  mute.addEventListener('click', () => { const isMuted = mute.classList.toggle('active'); mute.setAttribute('aria-pressed', isMuted); audio[index].muted = isMuted; });
  mixerGrid.appendChild(card);
});

effects.forEach(name => {
  const button = document.createElement('button'); button.className = 'effect'; button.textContent = name; button.setAttribute('aria-pressed','false');
  button.addEventListener('click', () => { const active = button.classList.toggle('active'); button.setAttribute('aria-pressed', active); });
  effectBank.appendChild(button);
});

let playing = false; let seconds = 0; let timer;
const playBtn = document.querySelector('#playBtn'); const state = document.querySelector('#transportState'); const elapsed = document.querySelector('#elapsed');
function formatTime(value){ return `${String(Math.floor(value/60)).padStart(2,'0')}:${String(value%60).padStart(2,'0')}`; }
function setPlaying(next){ playing = next; if(next){ audio.forEach(a=>a.play().catch(()=>{})); state.textContent='PLAYING'; playBtn.textContent='Ⅱ'; timer=setInterval(()=>{ seconds=(seconds+1)%223; elapsed.textContent=formatTime(seconds); },1000); } else { audio.forEach(a=>a.pause()); state.textContent='STOPPED'; playBtn.textContent='▶'; clearInterval(timer); } }
playBtn.addEventListener('click',()=>setPlaying(!playing));
document.querySelector('#stopBtn').addEventListener('click',()=>{ setPlaying(false); seconds=0; elapsed.textContent='00:00'; audio.forEach(a=>{a.currentTime=0}); });
document.querySelector('#resetBtn').addEventListener('click',()=>{ tracks.forEach((_,i)=>{audio[i].muted=false; const card=mixerGrid.children[i]; card.querySelector('.mute').classList.remove('active'); card.querySelector('.mute').setAttribute('aria-pressed','false'); }); });
