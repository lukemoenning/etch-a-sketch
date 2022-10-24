const DEFAULT_MODE = "paint";
const DEFAULT_PAINT_COLOR = "#000000";
const DEAFULT_BACKGROUND_COLOR = "#FFFFFF";
const DEFAULT_GRID_SIZE = 16;
const GRID = document.getElementById("grid");

let paintMode = DEFAULT_MODE;
let paintColor = DEFAULT_PAINT_COLOR;
let gridSize = DEFAULT_GRID_SIZE


// create mousehold functionality
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// setup settings buttons
document.getElementById("paint").onclick = () => paintMode = "paint";
document.getElementById("erase").onclick = () => paintMode = "erase";
document.getElementById("clear").onclick = () => clearGrid();


function createGrid(gridSize) {
    let showGridLines = true;
    if (gridSize > 32) {
        showGridLines = false;
    }
    GRID.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    GRID.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize*gridSize; i++) {
        const gridPixel = document.createElement("div");
        gridPixel.classList.add("grid-pixel");
        if (showGridLines) gridPixel.classList.add("grid-pixel-lines");
        gridPixel.addEventListener("mouseover", paint);
        GRID.appendChild(gridPixel);
    }
}

function clearGrid() {
    console.log("test");
    GRID.innerHTML = "";
    createGrid(gridSize);
}

function paint(e) {
    if (!mouseDown && e.type === "mouseover") {
        return;
    }

    switch (paintMode) {
        case "paint":
            e.target.style.backgroundColor = paintColor;
            break;
        case "erase":
            e.target.style.backgroundColor = DEAFULT_BACKGROUND_COLOR;
            break;
        case "random":
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            break;
        default: 
            console.log("No Paint Mode Selected.");
            break;
    }
}

window.onload = () => {
    createGrid(gridSize);
}