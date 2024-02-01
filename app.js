const image=document.getElementById("cover");
const title=document.getElementById("music-title");
const artist=document.getElementById("music-artist");
const currentTimeEl=document.getElementById("current-time");
const durationEl=document.getElementById("duration");
const progress=document.getElementById("progress");
const playerProgress=document.getElementById("player-progress");
const prevBtn=document.getElementById("prev");
const nextBtn=document.getElementById("next");
const playBtn=document.getElementById("play");
const background=document.getElementById("bg-img");



const music= new Audio();


const songs=[
    {

        path:'assets/romeSong.mp3',
        displayName:'Rome',
        cover:'assets/roma.jpg',
        artist:'In my heart'
    },
    {

        path:'assets/londonSong.mp3',
        displayName:'London',
        cover:'assets/london.jpg',
        artist:'London call me'
    },
{

    path:'assets/songNewYork.mp3',
    displayName:'New york',
    cover:'assets/new hr.jpg ',
    artist:'JuliusH'
},
{

    path:'assets/singaporeSong.mp3',
    displayName:'Desert',
    cover:'assets/desert lake.jpeg',
    artist:'calm'
},
{

    path:'assets/rockSingapore.mp3',
    displayName:'Singapore',
    cover:'assets/singapore.jpeg',
    artist:'dance with the moon'
},


];


let musicIndex=0;
let isPlaying=false;

function togglePlay(){

    if(isPlaying){
        pauseMusic()
    }else{
       playMusic() 
    }
}

function playMusic(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');

    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseMusic(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');

    playBtn.setAttribute('title','Play');
    music.pause();
}


function loadMusic() {
    music.src = songs[musicIndex].path;
    title.textContent = songs[musicIndex].displayName;
    artist.textContent = songs[musicIndex].artist;
    image.src = songs[musicIndex].cover;
    background.src = songs[musicIndex].cover;}

function changeMusic(direction){
musicIndex=(musicIndex+direction+songs.length)%songs.length;
loadMusic(songs[musicIndex]);
playMusic();
}

function updateProgressBar(){
    const {duration,currentTime}=music;
    const progressPercent=(currentTime/duration)*100;
    progress.style.width= `${progressPercent}%`;
    const formatTime=(time)=> String(Math.floor(time)).padStart(2, '0');

    durationEl.textContent=` ${formatTime(duration/ 60)}:${formatTime (duration %60)}`;
    currentTimeEl.textContent=`${formatTime (currentTime/60)}:${currentTime%60}`;

}


function setProgressBar(e){
    const width=playerProgress.clientWidth;
    const clickX=e.offsetX;
    music.currentTime=(clickX/width)*music.duration;


}

playBtn.addEventListener('click',togglePlay);
prevBtn.addEventListener('click',()=>changeMusic(-1));
nextBtn.addEventListener('click',()=>changeMusic(1));
music.addEventListener('ended',()=>changeMusic(1));
music.addEventListener('timeupdate',updateProgressBar);
playerProgress.addEventListener('click',setProgressBar);

loadMusic(songs[musicIndex]);

