const grid = document.querySelector("#grid");
const colorPicker = document.querySelector("#colorPicker");
const colorBtn = document.querySelector("#colorBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const clearBtn = document.querySelector("#clearBtn");
const sizeSlider = document.querySelector("#sizeSlider");
const sizeSliderLabel = document.querySelector(`label[for="sizeSlider"]`);
let sizeSliderValue = sizeSlider.value;
let mode = "colorMode";
let mouseDown = false;
document.body.addEventListener("mousedown", () => mouseDown = true);
document.body.addEventListener("mouseup", () => mouseDown = false)

function modeChange(modeType) {
    mode = modeType;
}

function coloring(e) {
    if (e.type === "mouseover" && !mouseDown) return
    if (mode === "rainbowMode") {
        let R = Math.floor(Math.random() * 256);
        let G = Math.floor(Math.random() * 256);
        let B = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${R},${G},${B})`;
    }
    else if (mode === "colorMode") {
        e.target.style.backgroundColor = colorPicker.value;
    }
    else if (mode === "eraserMode") {
        e.target.style.backgroundColor = "#fefefe";
    }
    else if (mode === "clearMode") {
        grid.innerHTML = "";
        gridSetup();
    }
}

function gridSetup() {
    grid.style.gridTemplateColumns = `repeat(${sizeSliderValue}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${sizeSliderValue}, 1fr)`;
    for (let i = 0; i < sizeSliderValue * sizeSliderValue; i++) {
        let gridElement = document.createElement("div");
        gridElement.addEventListener("mouseover", coloring);
        gridElement.addEventListener("mousedown", coloring);
        grid.appendChild(gridElement);
    }
}

colorBtn.addEventListener("mousedown", () => modeChange("colorMode"))
rainbowBtn.addEventListener("click", () => modeChange("rainbowMode"))
eraserBtn.addEventListener("click", () => modeChange("eraserMode"))
clearBtn.addEventListener("click", () => modeChange("clearMode"))
sizeSlider.addEventListener("input", () => {
    sizeSliderValue = sizeSlider.value;
    sizeSliderLabel.innerText = `${sizeSliderValue} x ${sizeSliderValue}`;
})

window.addEventListener("load", () => {
    gridSetup()
})