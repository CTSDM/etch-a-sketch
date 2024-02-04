const containerMain = document.querySelector('.container-main');

let size = 16

function createCanvas(size) {
    containerMain.replaceChildren();
    for (let i = 0; i < size; i ++) {
        const rowContainer = document.createElement('div');
        rowContainer.classList.toggle('active');
        for (let j = 0; j < size; j++) {
            const rowElement = document.createElement('div');
            rowElement.classList.toggle('squares');
            rowContainer.appendChild(rowElement);
        }
        containerMain.appendChild(rowContainer);
    }
}
