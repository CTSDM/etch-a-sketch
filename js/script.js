const containerMain = document.querySelector('.container-main');
let mouse_clicked = false;
const numberMatrixActivation = [[]];
const DARKENING_TOTAL_STEPS = 10;

document.addEventListener('mousedown', () => { mouse_clicked = true; }, { capture: true })

document.addEventListener('mouseup', () => { mouse_clicked = false; })

createCanvas(16);

function createCanvas(size) {
    containerMain.replaceChildren();
    for (let i = 0; i < size; i++) {
        numberMatrixActivation[i] = [];
        const rowContainer = document.createElement('div');
        for (let j = 0; j < size; j++) {
            numberMatrixActivation[i][j] = 0;
            const rowElement = document.createElement('div');
            rowElement.classList.toggle('squares');
            rowElement.classList.add(`${i}-${j}`)
            rowElement.addEventListener('mouseenter', setRandomColor);
            rowElement.addEventListener('mousedown', setRandomColor);

            rowContainer.appendChild(rowElement);
        }
        rowContainer.classList.toggle('container-boxes');
        containerMain.appendChild(rowContainer);
    }
}

function setRandomColor() {
    if (mouse_clicked === true) {
        const index = getArrayIndexBox(this.className);
        let nActivation = numberMatrixActivation[index[0]][index[1]];
        if (nActivation === 0) {
            let redVal = Math.floor(Math.random() * 256);
            let greenVal = Math.floor(Math.random() * 256);
            let blueVal = Math.floor(Math.random() * 256);
            this.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
        }
        else if (nActivation < 10) {
            let RgbCurrent = getCurrentColor(this.style.backgroundColor);
            // console.log(RgbCurrent)
            let newRgbArray = getNewColor(RgbCurrent, nActivation);
            // console.log(newRgbArray)
            this.style.backgroundColor = `rgb(${newRgbArray[0]}, ${newRgbArray[1]}, ${newRgbArray[2]})`;
        }
        numberMatrixActivation[index[0]][index[1]] += 1;
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
    if (nActivation === 0) return;
    if (nActivation === 9) {
        rgbArray = [0, 0, 0];
        return rgbArray
    }
    for (let idx in rgbArray) {
        if (nActivation > 0) {
            let color = rgbArray[idx];
            let baseColor = (DARKENING_TOTAL_STEPS * color) / (DARKENING_TOTAL_STEPS - (nActivation));
            rgbArray[idx] = parseInt(-(nActivation + 1) * (baseColor) / DARKENING_TOTAL_STEPS + baseColor);
        }
    }
    return rgbArray
}