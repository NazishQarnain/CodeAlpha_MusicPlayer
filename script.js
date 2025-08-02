const songs = [
  {
    name: "song1.mp3",
    title: "Faded",
    artist: "Alan Walker"
  },
  {
    name: "song2.mp3",
    title: "Let Me Love You",
    artist: "DJ Snake ft. Justin Bieber"
  }
];

let index = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let isPlaying = false;

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = `songs/${song.name}`;
}

loadSong(songs[index]);

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.innerText = "⏸️";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.innerText = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % songs.length;
  loadSong(songs[index]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(songs[index]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100;
  updateTime(currentTime, currentTimeEl);
  updateTime(duration, durationEl);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

function updateTime(time, element) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  element.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audio.addEventListener("ended", () => {
  index = (index + 1) % songs.length;
  loadSong(songs[index]);
  playSong();
});
