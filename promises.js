<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Animated Slider</title>
<style>
 {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}
body {
    background: #111;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.slider {
    position: relative;
    width: 700px;
    max-width: 95%;
    overflow: hidden;
    border-radius: 12px;
    background: #000;
}
.slides {
    display: flex;
    transition: transform 0.6s ease;
}
.slide {
    min-width: 100%;
}
.slide img {
    width: 100%;
    display: block;
}
.controls {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}
.controls button {
    background: #222;
    color: #fff;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 6px;
}
.controls button:hover {
    background: #444;
}
.indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 10px;
}
.indicator {
    width: 12px;
    height: 12px;
    background: #555;
    border-radius: 50%;
    cursor: pointer;
}
.indicator.active {
    background: #fff;
}
.fullscreen {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
}
</style>
</head>
<body>
<div class="slider" id="slider">
    <div class="slides" id="slides">
        <div class="slide"><img src="https://picsum.photos/id/1011/900/500"></div>
        <div class="slide"><img src="https://picsum.photos/id/1015/900/500"></div>
        <div class="slide"><img src="https://picsum.photos/id/1025/900/500"></div>
        <div class="slide"><img src="https://picsum.photos/id/1035/900/500"></div>
    </div>
    <div class="controls">
        <button onclick="firstSlide()">First</button>
        <button onclick="prevSlide()">Prev</button>
        <button onclick="toggleAuto()">Auto</button>
        <button onclick="nextSlide()">Next</button>
        <button onclick="lastSlide()">Last</button>
        <button onclick="toggleFullscreen()">Toggle fullscreen</button>
    </div>
    <div class="indicators" id="indicators"></div>
</div>



  
<script>
const slides = document.getElementById("slides");
const slider = document.getElementById("slider");
const indicatorsContainer = document.getElementById("indicators");
const totalSlides = slides.children.length;
let currentIndex = 0;
let autoInterval = null;
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.className = "indicator";
    dot.onclick = () => goToSlide(i);
    indicatorsContainer.appendChild(dot);
}
function updateSlider() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll(".indicator").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}
function stopAuto() {
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
    }
}
function nextSlide() {
    stopAuto();
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}
function prevSlide() {
    stopAuto();
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}
function firstSlide() {
    stopAuto();
    currentIndex = 0;
    updateSlider();
}
function lastSlide() {
    stopAuto();
    currentIndex = totalSlides - 1;
    updateSlider();

function goToSlide(index) {
    stopAuto();
    currentIndex = index;
    updateSlider();
}
function toggleAuto() {
    if (autoInterval) {
        stopAuto();
    } else {
        autoInterval = setInterval(() => {
            if (currentIndex === totalSlides - 1) {
                stopAuto(); // stop at last slide
            } else {
                currentIndex++;
                updateSlider();
            }
        }, 2000);
    }
}
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        slider.requestFullscreen();
        slider.classList.add("fullscreen");
    } else {
        document.exitFullscreen();
        slider.classList.remove("fullscreen");
    }
}
updateSlider();
</script>
</body>
</html>
