const visualDom = document.querySelector('.visual');
const ellipseDom = document.querySelector('.ellipse');
const probImg = document.querySelector('.probe-img');
const infoModal = document.getElementById('info-modal');
const tissueOptions = document.querySelectorAll('.tissues button');
const probeQuantityOptions = document.querySelectorAll('.probe-quantity button');
const probeSelectArrow = document.querySelector('.probe .arrow');

// default values
let tissue = 'LV';
let probe = '1P';
let time = 5;
let power = 60;
let probeQuantity = 1;
let probeOpen = false;

// static values
const MIN_TIME = 1;
const MAX_TIME = 5;
const MIN_POWER = 35;
const MAX_POWER = 60;
const TIME_STEP = 1;
const POWER_STEP = 5;
const THRESHOLD = 4;

// modal
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

// mount event
window.onload = function () {
    visualDom.style.height = visualDom.clientWidth + "px";
    renderEllipse();
    renderTime();
    renderPower();
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
        tissue = option.getAttribute('value');
        renderEllipse();
    });
});

probeQuantityOptions.forEach(option => {
    option.addEventListener('click', function () {
        unselectAll(probeQuantityOptions);
        option.className = "clicked";
        probeQuantity = option.getAttribute('value')
    });
});

function renderTime() {
    document.querySelector('.time .value').innerHTML = time + ':00';
    document.querySelector('.time .step .up').disabled = time === MAX_TIME
    document.querySelector('.time .step .down').disabled = time === MIN_TIME
}

function renderPower() {
    document.querySelector('.power .value').innerHTML = power;
    document.querySelector('.power .step .up').disabled = power === MAX_POWER
    document.querySelector('.power .step .down').disabled = power === MIN_POWER
}

function changeTime(direction) {
    time += TIME_STEP * direction;
    renderTime();
    renderEllipse()
}

function changePower(direction) {
    power += POWER_STEP * direction
    renderPower();
    renderEllipse()
}

// probe type selector
function changeProbe(e) {
    probe = e.value
    e.blur()
    renderEllipse()
}

function focusProbe() {
    probeSelectArrow.classList.add('up')
    probeSelectArrow.classList.remove('down')
}

function blurProbe() {
    probeSelectArrow.classList.add('down')
    probeSelectArrow.classList.remove('up')
}

function renderEllipse() {
    let Dimensions = { Length: 200, Height: 150, Offset: null };
    const equations = Calculations.filter(({ Probe, Tissue }) => Probe === probe && Tissue === tissue)

    probImg.setAttribute('src', `assets/img/probs/${probe}.png`)

    if (equations.length === 0) {
        ellipseDom.style.display = "none"
        probImg.style.marginRight = 0;
    }
    else {
        ellipseDom.style.display = "block"
        equations.forEach(e => {
            Dimensions[e.Dimension] = e['Variable 1'] * Math.log(time) + e['Variable 2'] * power + e['Variable 3']
        })

        ellipseDom.querySelector('.length-line div').innerHTML = Dimensions.Length.toFixed(1) + 'cm'
        ellipseDom.querySelector('.height-line div').innerHTML = Dimensions.Height.toFixed(1) + 'cm'
        ellipseDom.querySelector('.offset-line div').innerHTML = Math.abs(Dimensions.Offset).toFixed(1) + 'cm'

        ellipseDom.style.width = (visualDom.clientWidth * Dimensions.Length / THRESHOLD) + 'px';
        ellipseDom.style.height = (visualDom.clientWidth * Dimensions.Height / THRESHOLD) + 'px';

        probImg.style.marginRight = (visualDom.clientWidth * Dimensions.Offset / THRESHOLD) + 'px';
        ellipseDom.querySelector('.offset-line').style.width = (visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 'px';

        if (Dimensions.Offset < 0) {
            ellipseDom.querySelector('.offset-line').style.right = (visualDom.clientWidth * Dimensions.Offset / THRESHOLD) + 'px';
            ellipseDom.querySelector('.offset-line').style.bottom = '-8px';
            ellipseDom.querySelector('.height-line div').style.marginTop = '-16px';
        }
        else {
            ellipseDom.querySelector('.offset-line').style.right = 0;
            ellipseDom.querySelector('.offset-line').style.bottom = 0;
            ellipseDom.querySelector('.height-line div').style.marginTop = 0;
        }
    }
}
