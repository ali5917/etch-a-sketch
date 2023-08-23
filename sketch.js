function scrollToSelect() {
    const target = document.getElementById('select-container');
    target.scrollIntoView();
}

function scrollToSketch() {
    const target = document.getElementById('sketch-section');
    target.scrollIntoView();
}

let vBoxes = 20;
let hBoxes = 20;
let sketchColor = 'black';
let currentMode = 'classic'
makeSketch();

// Event listener for grid size buttons
const sizeBtns = document.querySelectorAll('.sizeBtn')
sizeBtns.forEach((thisbtn) => {
    thisbtn.addEventListener('click', () => {
        vBoxes = thisbtn.id;
        hBoxes = thisbtn.id;
        makeSketch();
        scrollToSketch();
    })
})

// Event listener for grid-size input 
const sizeInput = document.querySelector('.grid-text');
const sizeSubmit = document.querySelector('.grid-submit');

sizeSubmit.addEventListener('click', () => {
    let usrInput = sizeInput.value;
    if (isNaN(usrInput) || usrInput < 1 || usrInput > 60) {
        alert('WTF');
    }
    else {
        hBoxes = usrInput;
        vBoxes = usrInput;
        makeSketch();
        scrollToSketch();
    }
})

// Event listener for color picker
const colorPicker = document.querySelector('.c-picker')
colorPicker.addEventListener('input', (e) => {
    sketchColor = e.target.value;
});

// Event listener for classic button
const classicBtn = document.querySelector('.btn1');
classicBtn.addEventListener('click', () => {
    currentMode = 'classic';
});

// Event listener for rainbow button
const rainbowBtn = document.querySelector('.btn2');
rainbowBtn.addEventListener('click', () => {
    currentMode = 'rainbow';
});

// Event listener for eraser button
const eraserBtn = document.querySelector('.btn3');
eraserBtn.addEventListener('click', () => {
    currentMode = 'eraser';
});

// Making sketch
function makeSketch() {
    const headingSize = document.querySelector('.head-size');
    headingSize.textContent = `( ${hBoxes} x ${vBoxes} )`;
    const outline = document.querySelector('.outline-container');
    outline.innerHTML = '';
    for(let i = 0; i < vBoxes; i++) {
        for(let j = 0; j < hBoxes; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            outline.appendChild(square);
            square.style.width = `calc(100%/${hBoxes})`;
            square.style.height = `calc(100%/${vBoxes})`;
            
            square.addEventListener('mouseover', () => {
                if (currentMode === 'classic') {
                    square.style.backgroundColor = sketchColor;
                } 
                else if (currentMode === 'rainbow') {
                    square.style.backgroundColor = randomColor();
                }
                else if (currentMode === 'eraser') {
                    square.style.backgroundColor = 'white';
                }
            })
        }
    }
}

function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.style.backgroundColor = 'white';
    });
}

function randomColor() {
    const letters = "0123456789ABCDEF";
    let thiscolor = '#';
    for(let i = 0; i < 6; i++) {
        thiscolor += letters[Math.floor(Math.random()*16)];
    }
    return thiscolor;
}