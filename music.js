window.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById("background-music");
    const volumeControl = document.getElementById("volumeControl");

    music.volume = volumeControl.value;

    volumeControl.addEventListener('input', () => {
        music.volume = volumeControl.value;
    });
});
