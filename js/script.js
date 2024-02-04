const containerMain = document.querySelector('.container-main');
let mouse_clicked = false;

document.addEventListener('mousedown', () => {mouse_clicked = true;}, {capture: true})

document.addEventListener('mouseup', () => {mouse_clicked = false;})

createCanvas(16);

function createCanvas(size) {
    containerMain.replaceChildren();
    for (let i = 0; i < size; i++) {
        const rowContainer = document.createElement('div');
        for (let j = 0; j < size; j++) {
            const rowElement = document.createElement('div');
            rowElement.classList.toggle('squares');
            for (let k = 1; k < size; k++) {
                rowElement.addEventListener('mouseenter', setRandomColor);
                rowElement.addEventListener('mousedown', setRandomColor);
            }
            rowContainer.appendChild(rowElement);
        }
        rowContainer.classList.toggle('container-boxes');
        containerMain.appendChild(rowContainer);
    }
}

function setRandomColor() {
    if (mouse_clicked === true) 
    {
        let redVal = Math.floor(Math.random() * 256);
        let greenVal = Math.floor(Math.random() * 256);
        let blueVal = Math.floor(Math.random() * 256);
        this.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
    }
}