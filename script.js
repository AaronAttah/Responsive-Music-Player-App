const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn= document.querySelector('#prev')
const nextBtn = document.querySelector('#next') 
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Song titles
const songs = ['ADA__I_TESTIFy', 'All-that-matters', 'enwudu kone', 'solomon-lange', 'There is a Place', 'Too Faithful', 'frank edward 1'] //the songs names must be same with the music name

// keep track of songs
let songIndex = 0

// Initially load song into document
loadSong(songs[songIndex])   

//update songs details
function loadSong(song) {
    title.innerText = song;
    audio.src =`music/${song}.mp3 ` // that is go to music folder you will find hey1-hey3.mp3 there.
    cover.src =`images/${song}.png ` // that is go to image folder you will find hey1-hey3.jpg there.
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
  
    console.log("play song is working")

    audio.play()

}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    console.log("pause song is working")

    audio.pause()
}

function prevSong() {
    songIndex--

    if(songIndex<0) {
        songIndex = songs.length -1 
    }
    loadSong(songs[songIndex])

    playSong()

}

function nextSong() {
    songIndex++

    if(songIndex> songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e) {
    // console.log(e.srcElement.currentTime)
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
     
}

function setProgress(e) {
    // e.preventDefault()
    const width = this.clientWidth 
    // console.log(width)
    const clickX = e.offsetX
    // console.log(clickX)
    const duration = audio.duration 

    audio.currentTime =(clickX / width) * duration

}

// Event Listeners for play and pause

playBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    const isPlaying = musicContainer.classList.contains('play') //that is go to musicContainer that has/contains a "play class list" 

    if (isPlaying) {
        pauseSong()
    }else{
        playSong()
    }
})

//change song addEventListener
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// event listener to update and drag the progressbar  left to right vise-versa
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)

//  an event that makes the song loop when a particular one is document
audio.addEventListener('ended', nextSong)


