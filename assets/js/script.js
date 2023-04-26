const visualDom = document.querySelector('.visual');
const ellipseDom = document.querySelector('.ellipse');
const probesContainerDom = document.querySelector('.probes-container');
const probeDropdown = document.querySelector('.probe .dropdown-content');
const infoModal = document.getElementById('info-modal');
const splashModal = document.getElementById('splash-modal');
const tissueOptions = document.querySelectorAll('.tissues button');
const probeOptions = document.querySelectorAll('.probe .dropdown-content button');
const probeQuantityOptions = document.querySelectorAll('.probe-quantity button');
const probeSelectArrow = document.querySelector('.probe .fa');

// default values
let tissue = 'Liver';
let probe = 'PR';
let time = 5;
let power = 60;
let probeQuantity = 1;
let showProbeList = false;
let MAX_POWER = 65;

// static values
const MIN_TIME = 1;
const MAX_TIME = 10;
const MIN_POWER = 5;
const TIME_STEP = 1;
const POWER_STEP = 5;
const THRESHOLD = 6.8; // Max length

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

    if (showProbeList) {
        handleDropdown();
    }
}

// mount event
window.onload = function () {
    splashModal.style.display = "block";
    disableProbes();
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
        tissue = option.textContent;
        disableProbes();
        disableProbeQuantities();
        renderEllipse();
    });
});

probeQuantityOptions.forEach(option => {
    option.addEventListener('click', function () {
        unselectAll(probeQuantityOptions);
        option.className = "clicked";
        probeQuantity = parseInt(option.getAttribute('value'));
        if (probeQuantity !== 1) {
            document.querySelector('.time i').disabled = true;
            document.querySelector('.power i').disabled = true;
        }
        disableTissues();
        renderEllipse();
    });
});

function renderTime() {
    document.querySelector('.time .value').innerHTML = time + ':00';
    document.querySelector('.time .chevron-up').disabled = time >= MAX_TIME
    document.querySelector('.time .chevron-down').disabled = time <= MIN_TIME
}

function renderPower() {
    document.querySelector('.power .value').innerHTML = power;
    document.querySelector('.power .chevron-up').disabled = power >= MAX_POWER
    document.querySelector('.power .chevron-down').disabled = power <= MIN_POWER
}

function changeTime(direction) {
    time += TIME_STEP * direction;
    renderTime();
    renderEllipse();
}

function changePower(direction) {
    power += POWER_STEP * direction;
    renderPower();
    renderEllipse();
}

// probe type selector
function changeProbe(value) {
    probe = value;
    MAX_POWER = MAX_POWERS[value];
    if (power > MAX_POWER) {
        power = MAX_POWER;
    }

    renderPower();
    disableTissues();
    renderEllipse();
}

function handleDropdown(e) {
    e?.stopPropagation();

    showProbeList = !showProbeList
    probeDropdown.style.display = showProbeList ? 'flex' : 'none'
    if (showProbeList) {
        probeSelectArrow.classList.add('fa-angle-up')
        probeSelectArrow.classList.remove('fa-angle-down')
    } else {
        probeSelectArrow.classList.add('fa-angle-down')
        probeSelectArrow.classList.remove('fa-angle-up')
    }
}

function disableProbes() {
    const availableProbes = [...new Set(CALCULATIONS.filter(e => e.Tissue === tissue).map(e => e.Probe))];

    probeOptions.forEach(probeOption => {
        probeOption.disabled = false;
        if (!availableProbes.includes(probeOption.textContent)) {
            probeOption.disabled = true;
        }
    })
}

function disableProbeQuantities() {
    probeQuantityOptions.forEach(option => {
        option.disabled = false;
        if (tissue !== 'Liver' && option.value != 1) {
            option.disabled = true;
        }
    })
}

function disableTissues() {
    let availableTissues = [...new Set(CALCULATIONS.filter(e => e.Probe === probe).map(e => e.Tissue))];
    if (probeQuantity !== 1 && availableTissues.includes('Liver')) {
        availableTissues = ['Liver']
    }

    tissueOptions.forEach(tissueOption => {
        tissueOption.disabled = false;
        if (!availableTissues.includes(tissueOption.textContent)) {
            tissueOption.disabled = true;
        }
    });
}

function renderEllipse() {
    visualDom.style.height = (document.querySelector('.container').clientWidth * (0.55 + probeQuantity / 10)) + "px";

    let Dimensions = { Length: 200, Height: 150, Offset: null };
    if (probeQuantity === 1) {
        CALCULATIONS
            .filter(({ Probe, Tissue }) => Probe === probe && Tissue === tissue)
            .forEach(e => {
                Dimensions[e.Dimension] = e['Variable 1'] * Math.log(time) + e['Variable 2'] * power + e['Variable 3']
            })
    } else {
        Dimensions = MULTI_PROBES.filter(({ Count, Probe }) => Count === probeQuantity && Probe === probe)[0];
    }

    // render selected probe type
    document.querySelector('.probe-value').innerHTML = probe;

    // render probe images 
    probesContainerDom.innerHTML = '';
    for (let i = 0; i < probeQuantity; i++) {
        probesContainerDom.innerHTML += `<img alt="probe" src="assets/img/probs/${probe}.png" />`
    }
    probesContainerDom.style.marginRight = (visualDom.clientWidth * Dimensions.Offset / THRESHOLD) + 'px';

    ellipseDom.style.display = "block"
    ellipseDom.style.width = (visualDom.clientWidth * Dimensions.Length / THRESHOLD) + 'px';
    ellipseDom.style.height = (visualDom.clientWidth * Dimensions.Height / THRESHOLD) + 'px';
    ellipseDom.querySelector('.length-line .value').innerHTML = Dimensions.Length.toFixed(1) + 'cm'
    ellipseDom.querySelector('.height-line .value').innerHTML = Dimensions.Height.toFixed(1) + 'cm'
    ellipseDom.querySelector('.offset-line').style.visibility = "visible";
    ellipseDom.querySelector('.offset-line .value').innerHTML = Dimensions.Offset.toFixed(1) + 'cm'
    ellipseDom.querySelector('.offset-line').style.width = (visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 'px';
    ellipseDom.querySelector('.offset-line .len').style.width = (visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 'px';
    ellipseDom.querySelector('.offset-line').style.height = (visualDom.clientWidth * Dimensions.Height / (2 * THRESHOLD)) + 16 + 'px';

    if (Dimensions.Offset < 0) {
        ellipseDom.querySelector('.offset-line').style.right = (visualDom.clientWidth * Dimensions.Offset / THRESHOLD) + 'px';
        ellipseDom.querySelector('.height-line').style.right = -((visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 14) + 'px';
        visualDom.style.marginRight = ((visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 60) + 'px';
    }
    else {
        ellipseDom.querySelector('.offset-line').style.right = 0;
        ellipseDom.querySelector('.height-line').style.right = '-14px';
        visualDom.style.marginRight = '60px'
    }

    if (!Dimensions.Offset) {
        ellipseDom.querySelector('.offset-line').style.visibility = "hidden";
    }
}

