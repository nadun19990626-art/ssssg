// ==============================
// Buttons
// ==============================

const intro = document.getElementById("intro");
const story = document.getElementById("story");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const timer = document.getElementById("timer");
const letter = document.querySelector("#letter p");

const music = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");

// ==============================
// Moving NO button
// ==============================

function moveNoButton() {

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

// ==============================
// YES button
// ==============================

yesBtn.onclick = () => {

    intro.classList.add("fadeOut");

    setTimeout(() => {

        intro.style.display = "none";

        story.classList.add("fadeIn");

        if (typeof startTree === "function") {
            startTree();
        }

    }, 1200);

    music.play().catch(() => {});

    startTyping();

    updateTimer();
    setInterval(updateTimer, 1000);

};

// ==============================
// Relationship Timer
// ==============================

const startDate = new Date("2019-08-25T00:00:00");

function updateTimer() {

    const now = new Date();

    let diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    diff %= (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));

    diff %= (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));

    diff %= (1000 * 60);

    const seconds = Math.floor(diff / 1000);

    timer.innerHTML =
        "❤️ " +
        days +
        " Days &nbsp;&nbsp;" +
        hours +
        " Hours &nbsp;&nbsp;" +
        minutes +
        " Minutes &nbsp;&nbsp;" +
        seconds +
        " Seconds ❤️";
}

// ==============================
// Typing Love Letter
// ==============================

const message = `

My Dearest Love,

On 25 August 2019,
my life became more beautiful because of you.

Every smile,
every laugh,
every challenge,
every memory...

has been special because we faced it together.

Thank you for staying beside me.

Happy Anniversary ❤️

I Love You Forever.

`;

let index = 0;

function startTyping() {

    function type() {

        if (index < message.length) {

            letter.innerHTML += message.charAt(index);

            index++;

            setTimeout(type, 45);

        }

    }

    type();

}

// ==============================
// Music Button
// ==============================

musicBtn.onclick = () => {

    if (music.paused) {

        music.play();

        musicBtn.innerHTML = "🔊 Music";

    } else {

        music.pause();

        musicBtn.innerHTML = "🔈 Muted";

    }

};