/* partie menu */

let toggle = document.querySelector('.toggle');
let body = document.querySelector('body');

// bouton menu
toggle.addEventListener('click', function () {
    body.classList.toggle('open')
})

/* Lecteur audio personnalisé */
const audio = document.querySelector("audio");
const track = document.querySelector("#track");
const elapsed = document.querySelector("#elapsed");
const trackTime = document.querySelector("#track-time");
const playButton = document.querySelector("#play-btn");
const pauseButton = document.querySelector("#pause-btn");
const stopButton = document.querySelector("#stop-btn");
const volume = document.querySelector("#volume");
const volumeValue = document.querySelector("#volume-value");




//le bouton play
playButton.addEventListener("click", function () {
    audio.play();
    audio.volume = volume.value,
        pauseButton.style.display = "initial";
    stopButton.style.display = "initial";
    this.style.display = "none";
})


//button pause 
pauseButton.addEventListener("click", function () {
    audio.pause();
    playButton.style.display = "initial";
    this.style.display = "none";
})


//button stop
stopButton.addEventListener("click", function () {
    audio.pause();
    audio.currentTime = 0;
    playButton.style.display = "initial";
    pauseButton.style.display = "none";
    this.style.display = "none";
});

// le timer 
audio.addEventListener("timeupdate", function () {
    track.value = this.currentTime;
    elapsed.textContent = buildDuration(this.currentTime);
});

track.addEventListener("input", function () {
    elapsed.textContent = buildDuration(this.value);
    audio.currentTime = this.value;
});

// Bouton volume
volume.addEventListener("input", function () {
    audio.volume = this.value;
    volumeValue.textContent = this.value * 100 + "%";
});


// Affiche la durée de la musique 
audio.onloadedmetadata = function() {
    trackTime.textContent = buildDuration(audio.duration);
}

function buildDuration(duree) {
    let minutes = Math.floor(duree / 60);
    let reste = duree % 60;
    let secondes = Math.floor(reste);
    secondes = String(secondes).padStart(2, "0");
    return minutes + ":" + secondes;
};


/* Lecteur vidéo personnalisé */

const video = document.querySelector("video");
const play = document.querySelector("#play");
const stopVideo = document.querySelector("#stop-video");
const pause = document.querySelector("#pause");
const volumeVideo = document.querySelector("#volume-video");
const volumeValueVideo = document.querySelector("#volumeValueVideo");

// bouton play 
play.addEventListener('click', function () {
    video.play();
    pause.style.display = "initial";
    stopVideo.style.display = "initial";
    this.style.display = "none";
});

// Bouton pause 
pause.addEventListener('click', function () {
    video.pause();
    play.style.display = "initial";
    this.style.display = "none";
});

// bouton stop
stopVideo.addEventListener('click', function () {
    video.pause();
    play.style.display = "initial";
    pause.style.display = "none";
    this.style.display = "none";
});

// Bouton volume
volumeVideo.addEventListener('input', function () {
    video.volume = this.value;
    volumeValueVideo.textContent = this.value * 100 + "%";
});


/* Diaporama d'image */

let compteur = 0;
let timer, elements, slides, slideWidth, speed, transition;


window.onload = () => {
    // On récupère le diaporama
    const diapo = document.querySelector(".diapo");
    elements = document.querySelector(".elements");

    speed = diapo.dataset.speed;
    transition = diapo.dataset.transition;

    // On clone la 1ère image
    let firstImage = elements.firstElementChild.cloneNode(true);

    // On injecte le clone
    elements.appendChild(firstImage);


    slides = Array.from(elements.children);
    // On récuper la largeur d'un slide
    slideWidth = diapo.getBoundingClientRect().width;

    // On récupere les fleches
    let next = document.querySelector("#nav-droite");
    let preview = document.querySelector("#nav-gauche");

    // Bouton suivant et revenir
    next.addEventListener("click", slideNext);
    preview.addEventListener("click", slidePreview);

    // Défilement automatique
    timer = setInterval(slideNext, 3000);

}

// function qui fait défiler le diaporama vers la droite 
function slideNext() {
    // On incrémemte le compteur 
    compteur++;
    elements.style.transition = "1s linear";

    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;

    // revient à la 1ère image
    setTimeout(function () {
        if (compteur >= slides.length - 1) {
            compteur = 0;
            elements.style.transition = "unset";
            elements.style.transform = "translateX(0)";
        }
    }, 1000);
}

// function qui fait défiler le diaporama vers la gauche
function slidePreview() {
    // Décrement le compteur
    compteur--;
    elements.style.transition = "1s linear";

    if (compteur < 0) {
        compteur = slides.length - 1;
        let decal = -slideWidth * compteur;
        elements.style.transition = "unset";
        elements.style.transform = `translateX(${decal}px)`;
        setTimeout(slidePreview, 1);

    }
    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;
}

function stopTimer() {
    clearInterval(timer);
}
