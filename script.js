let album = document.querySelector(".album");
let songName = document.querySelector(".song_name");
let artistName = document.querySelector(".artist_name");
let audio = document.querySelector("#audio");
let progress = document.querySelector(".progress");
let current_time = document.querySelector(".current_time");
let durationEl = document.querySelector(".duration");
let backward = document.querySelector(".backward");
let play_pause = document.querySelector(".play_pause");
let forward = document.querySelector(".forward");
let volume = document.querySelector("#volume")

let current_index = 2;

let song_arr = [
  {
    name: "Chogada",
    artist: "Ayush Sharma, Warina, Darshan Raval",
    src: "songs/01 - Chogada (320 Kbps) - DownloadMing.SE.mp3",
    pic: "pics/chhogada.jpg",
  },
  {
    name: "Kamariya",
    artist: "Darshan Raval",
    src: "songs/04 Kamariya - Mitron.mp3",
    pic: "pics/kamariya.jpg",
  },
  {
    name: "Aao na",
    artist: "Sadhana Sargam",
    src: "songs/01  Aao Na - www.downloadming.com.mp3",
    pic: "pics/aao_na.jpg",
  },
];

function load_songs(current_index) {
  audio.src = song_arr[current_index].src;
  songName.textContent = song_arr[current_index].name;
  artistName.textContent = song_arr[current_index].artist;
  album.src = song_arr[current_index].pic;
}

function play_pause_song() {
  if (audio.paused) {
    audio.play();
    play_pause.classList.replace("fa-play-circle", "fa-pause-circle");
  } else {
    audio.pause();
    play_pause.classList.replace("fa-pause-circle", "fa-play-circle");
  }
}

forward.addEventListener("click", () => {
  current_index = (current_index + 1) % song_arr.length;
  load_songs(current_index);
  audio.play();
  play_pause.classList.replace("fa-play-circle", "fa-pause-circle");
});

backward.addEventListener("click", () => {
  current_index = (current_index - 1 + song_arr.length) % song_arr.length;
  load_songs(current_index);
  audio.play();
  play_pause.classList.replace("fa-play-circle", "fa-pause-circle");
});

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  progress.value = (currentTime / duration) * 100;
  current_time.textContent = formatTime(currentTime)
  durationEl.textContent = formatTime(duration)
});

progress.addEventListener("input",()=>{
    audio.currentTime = (progress.value / 100) * audio.duration
})

volume.addEventListener("input",()=>{
    audio.volume = volume.value
})

function formatTime(time)
{
    let minutes = Math.floor(time/60)
    let seconds = Math.floor(time%60)
    return `${minutes}:${seconds< 10 ? "0" :""}${seconds}`
}

play_pause.addEventListener("click", play_pause_song);
load_songs(current_index);
