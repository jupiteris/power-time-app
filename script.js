const visualDom = document.querySelector('.visual');
const ellipseDom = document.querySelector('.ellipse');
const offsetLine = document.querySelector('.offset-line');
const probImg = document.querySelector('.prob-img');
const infoModal = document.getElementById('info-modal');
const tissueOptions = document.querySelectorAll('.tissues button');
const probeQuantityOptions = document.querySelectorAll('.prob-quantity button');
const timeDom = document.querySelectorAll('.time .value');
const powerDom = document.querySelectorAll('.power .value');

// app variables
let length = 230; // should be less than parent width
let height = 150;
let offset = 10;
let tissue = 'LV';
let probe = '1P';
let time = 1;
let power = 35;
let probeQuantity = 1;

// ellipse visual dynamic style
visualDom.style.height = visualDom.clientWidth + "px";

ellipseDom.style.width = length + 'px';
ellipseDom.style.height = height + 'px';
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

function unselectAll(options) {
    for (let i = 0; i < options.length; i++) {
        options[i].className = "";
    }
}

tissueOptions.forEach(option => {
    option.addEventListener('click', function () {
        unselectAll(tissueOptions);
        option.className = "clicked";
        tissue = option.getAttribute('value')
        valueChanged()
    });
});

probeQuantityOptions.forEach(option => {
    option.addEventListener('click', function () {
        unselectAll(probeQuantityOptions);
        option.className = "clicked";
        probeQuantity = option.getAttribute('value')
        valueChanged()
    });
});

function changeTime(direction) {
    time += direction;
    valueChanged()
}

function changePower(direction) {
    power += direction * 5
    valueChanged()
}

function changeProbe(e) {
    probe = e.value
    valueChanged()
}

function valueChanged() {
    console.log({ tissue, probe, probeQuantity, time, power })
}