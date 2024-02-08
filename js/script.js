const containerMain = document.querySelector('.container-main');
const btnsMode = document.querySelectorAll('.mode');
const btnClear = document.querySelector('.clear')
const btnGrid = document.querySelector('#grid');
const divText = document.querySelector('#mode-display');
const sliderSize = document.querySelector('#grid-size');
let mouseClicked = false;
const numberMatrixActivation = [[]];
const DARKENING_TOTAL_STEPS = 10;
let modeValue = 0; // 0: rainbow mode; 1: darkening mode; 2: whitening mode, 3: erase mode, 4: clear
let modeTexts = ['Rainbow', 'Darkening', 'Whitening', 'Erase', 'Clear'];
let darkening = true;
let whitening = false;
let clear = false; // Indicates if the canvas is totally clear, all white
let gridOn = false;
sizeInitial = 16;  // Initial size of the canvas


document.addEventListener('mousedown', () => { mouseClicked = true; }, { capture: true })
document.addEventListener('mouseup', () => { mouseClicked = false; })
for (let i = 0; i < btnsMode.length; ++i) {
    btnsMode[i].addEventListener('click', () => {
        btnsMode[modeValue].classList.toggle('active');
        modeValue = i;
        btnsMode[modeValue].classList.toggle('active');
        divText.textContent = `Current mode: ${modeTexts[i]}`
    })
}

sliderSize.addEventListener('click', () => {
    createCanvas(sliderSize.value);
})

// This is in average around 1.5 times faster than just creating a new Canvas (running locally on Chrome 121.0.6167.139)
btnClear.addEventListener('click', clearCanvas)

btnGrid.addEventListener('click', () => {
    gridOn = !gridOn;
    addGrid();
    let modeText = gridOn ? 'Disable' : 'Enable';
    btnGrid.textContent = `${modeText} grid`;
})

function addGrid() {
    for (let i = 0; i < sizeInitial; ++i) {
        for (let j = 0; j < sizeInitial; ++j) {
            containerMain.childNodes[i].childNodes[j].classList.toggle('grid');
        }
    }
}

function clearCanvas() {
    if (!clear) {
        for (let i = 0; i < sizeInitial; ++i) {
            for (let j = 0; j < sizeInitial; ++j) {
                containerMain.childNodes[i].childNodes[j].style.backgroundColor = `rgb(255, 255, 255)`;
            }
        }
        clear = !clear;
    }
}

function createCanvas(s) {
    clear = false;
    sizeInitial = s;
    containerMain.replaceChildren();
    for (let i = 0; i < s; i++) {
        numberMatrixActivation[i] = [];
        const rowContainer = document.createElement('div');
        for (let j = 0; j < s; j++) {
            numberMatrixActivation[i][j] = 0;
            const rowElement = document.createElement('div');
            rowElement.classList.toggle('squares');
            rowElement.classList.add(`${i}-${j}`)
            rowElement.addEventListener('mouseenter', setColor);
            rowElement.addEventListener('mousedown', setColor);
            rowContainer.appendChild(rowElement);
        }
        rowContainer.classList.toggle('container-boxes');
        containerMain.appendChild(rowContainer);
    }
    if (gridOn) addGrid();
}

function setColor() {
    if (mouseClicked === true) {
        const index = getArrayIndexBox(this.className);
        let nActivation = numberMatrixActivation[index[0]][index[1]];

        if (modeValue === 0) {
            let redVal = Math.floor(Math.random() * 256);
            let greenVal = Math.floor(Math.random() * 256);
            let blueVal = Math.floor(Math.random() * 256);
            this.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
            nActivation = 1;
            clear = false;
        } else if (modeValue === 3) {
            this.style.backgroundColor = `rgb(${255}, ${255}, ${255})`;
            nActivation = 0;
        }
        else if (modeValue === 1 && nActivation < 10) {
            let RgbCurrent = getCurrentColor(this.style.backgroundColor);
            let newRgbArray = getNewColor(RgbCurrent, nActivation);
            this.style.backgroundColor = `rgb(${newRgbArray[0]}, ${newRgbArray[1]}, ${newRgbArray[2]})`;
            nActivation++;
            clear = false
        }
        else if (modeValue === 2 && nActivation > 0) {
            // call whitening
            // eventually it will be merged with the top on
            nActivation--;
        }
        numberMatrixActivation[index[0]][index[1]] = nActivation;
    }
}

function getArrayIndexBox(classNames) {
    let indexesString = classNames.slice(8);
    const indexArray = indexesString.split('-');
    indexArray[0] = parseInt(indexArray[0]);
    indexArray[1] = parseInt(indexArray[1]);
    return indexArray
}

function getCurrentColor(colorStr) {
    let rgbColorArray = colorStr.slice(4, -1).split(',');
    for (let idx in rgbColorArray) {
        rgbColorArray[idx] = parseInt(rgbColorArray[idx]);
    }
    return rgbColorArray
}

function getNewColor(rgbArray, nActivation) {
    let refColor = modeValue[2] ? 255 : 0;
    if (nActivation === 9 && darkening) {
        rgbArray = [0, 0, 0];
        return rgbArray
    }
    // cambiar l'ogica para que aclaree, that is, road to 255
    for (let idx in rgbArray) {
        if (nActivation >= 0) {
            let color = rgbArray[idx];
            let baseColor = (DARKENING_TOTAL_STEPS * color - (nActivation) * refColor) / (DARKENING_TOTAL_STEPS - (nActivation));
            rgbArray[idx] = parseInt((nActivation + 2) * (refColor - baseColor) / DARKENING_TOTAL_STEPS + baseColor);
        }
    }
    return rgbArray
}

createCanvas(sizeInitial);