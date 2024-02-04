const containerMain = document.querySelector('.container-main');

let size = 16

function createCanvas(size) {
    containerMain.replaceChildren();
    for (let i = 0; i < size; i ++) {
        const rowContainer = document.createElement('div');
        for (let j = 0; j < size; j++) {
            const rowElement = document.createElement('div');
            rowElement.classList.toggle('squares');
            for (let k = 1; k < size; k++) {
                rowElement.addEventListener('mouseenter', setRandomColor);
            }
            rowContainer.appendChild(rowElement);
        }
        rowContainer.classList.toggle('container-boxes');
        containerMain.appendChild(rowContainer);
    }
}

function setRandomColor() {
    let redVal = Math.floor(Math.random() * 256);
    let greenVal = Math.floor(Math.random() * 256);
    let blueVal = Math.floor(Math.random() * 256);
    this.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
}