const visualDom = document.querySelector('.visual');
const ellipseDom = document.querySelector('.ellipse');
const probImg = document.querySelector('.probe-img');
const infoModal = document.getElementById('info-modal');
const splashModal = document.getElementById('splash-modal');
const tissueOptions = document.querySelectorAll('.tissues button');
const probeQuantityOptions = document.querySelectorAll('.probe-quantity button');
const probeSelectArrow = document.querySelector('.probe .arrow');

// default values
let tissue = 'LV';
let probe = '1P';
let time = 5;
let power = 60;
let probeQuantity = 1;
let showProbeList = false;

// static values
const MIN_TIME = 1;
const MAX_TIME = 6;
const MIN_POWER = 35;
const MAX_POWER = 65;
const TIME_STEP = 1;
const POWER_STEP = 5;
const THRESHOLD = 4.6 + 0.6; // Max length + Max offset

// modal
function openInfoModal() {
    infoModal.style.display = "block";
}

function onCloseInfoModal() {
    infoModal.style.display = "none";
}

function onCloseSplashModal() {
    splashModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == infoModal) {
        infoModal.style.display = "none";
    }
}

// mount event
window.onload = function () {
    splashModal.style.display = "block";
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
        probeQuantity = option.getAttribute('value');

        // TODO: option for now
        // renderEllipse();
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
function changeProbe(value) {
    probe = value;
    renderEllipse();
}

function handleDropdown() {
    showProbeList = !showProbeList
    document.querySelector('.probe .dropdown-content').style.display = showProbeList ? 'block' : 'none'
    if (showProbeList) {
        probeSelectArrow.classList.add('up')
        probeSelectArrow.classList.remove('down')
    } else {
        probeSelectArrow.classList.add('down')
        probeSelectArrow.classList.remove('up')
    }
}

function renderEllipse() {
    let Dimensions = { Length: 200, Height: 150, Offset: null };
    const equations = Calculations.filter(({ Probe, Tissue }) => Probe === probe && Tissue === tissue)

    probImg.setAttribute('src', `assets/img/probs/${probe}.png`);
    document.querySelector('.probe-value').innerHTML = probe;

    if (equations.length === 0) {
        ellipseDom.style.display = "none"
        probImg.style.marginRight = 0;
    }
    else {
        ellipseDom.style.display = "block"
        equations.forEach(e => {
            Dimensions[e.Dimension] = e['Variable 1'] * Math.log(time) + e['Variable 2'] * power + e['Variable 3']
        })

        probImg.style.marginRight = (visualDom.clientWidth * Dimensions.Offset / THRESHOLD) + 'px';
        ellipseDom.style.width = (visualDom.clientWidth * Dimensions.Length / THRESHOLD) + 'px';
        ellipseDom.style.height = (visualDom.clientWidth * Dimensions.Height / THRESHOLD) + 'px';

        ellipseDom.querySelector('.length-line .value').innerHTML = Dimensions.Length.toFixed(1) + 'cm'
        ellipseDom.querySelector('.height-line .value').innerHTML = Dimensions.Height.toFixed(1) + 'cm'
        ellipseDom.querySelector('.offset-line .value').innerHTML = Dimensions.Offset.toFixed(1) + 'cm'
        ellipseDom.querySelector('.offset-line').style.width = (visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 'px';
        ellipseDom.querySelector('.offset-line .len').style.width = (visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 'px';
        ellipseDom.querySelector('.offset-line').style.height = (visualDom.clientWidth * Dimensions.Height / (2 * THRESHOLD)) + 16 + 'px';

        if (Dimensions.Offset < 0) {
            ellipseDom.querySelector('.offset-line').style.right = (visualDom.clientWidth * Dimensions.Offset / THRESHOLD) + 'px';
            ellipseDom.querySelector('.height-line').style.right = -((visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 14) + 'px';
            visualDom.style.marginRight = ((visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 40) + 'px';
        }
        else {
            ellipseDom.querySelector('.offset-line').style.right = 0;
            ellipseDom.querySelector('.height-line').style.right = '-14px';
            visualDom.style.marginRight = '40px'
        }
    }
}

