const visualWindow = document.querySelector('.visual');
const ellipse = document.querySelector('.ellipse');
const offsetLine = document.querySelector('.offset-line');
const probImg = document.querySelector('.prob-img');
const infoModal = document.getElementById('info-modal');

let length = 270; // should be less than parent width
let height = 180;
let offset = 10;

visualWindow.style.height = visualWindow.clientWidth + "px";
ellipse.style.width = length + 'px';
ellipse.style.height = height + 'px';
offsetLine.style.width = offset + 'px';
probImg.style.marginRight = offset + 'px';

function openInfoModal() {
    infoModal.style.display = "block";
}

function onCloseModal() {
    infoModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == infoModal) {
        infoModal.style.display = "none";
    }
}