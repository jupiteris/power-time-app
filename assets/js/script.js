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
const midPointTip = document.querySelector('.info span b');

// default values
let tissue = 'Liver';
let probe = 'PR';
let time = 5;
let power = 60;
let probeQuantity = 1;
let showProbeList = false;

let MAX_POWER = 140;
let MIN_POWER = 30;
const MAX_TIME = 10;
let MIN_TIME = 0;
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
window.onclick = function(event) {
    if (event.target == infoModal) {
        infoModal.style.display = "none";
    }

    if (showProbeList) {
        handleDropdown();
    }
}

// mount event
window.onload = function() {
    splashModal.style.display = "block";
    renderTimePower();
    renderEllipse();
}

function unselectAll(options) {
    for (let i = 0; i < options.length; i++) {
        options[i].className = "";
    }
}

tissueOptions.forEach(option => {
    option.addEventListener('click', function() {
        unselectAll(tissueOptions);
        option.className = "clicked";
        tissue = option.textContent;
        disableProbeQuantities();
        renderEllipse();
    });
});

probeQuantityOptions.forEach(option => {
    option.addEventListener('click', function() {
        unselectAll(probeQuantityOptions);
        option.className = "clicked";
        probeQuantity = parseInt(option.getAttribute('value'));
        disableTissues();
        renderTimePower();
        renderEllipse();
    });
});

function changeTime(direction) {
    time += TIME_STEP * direction;
    renderTimePower();
    renderEllipse();
}

function changePower(direction) {
    power += POWER_STEP * direction;
    renderTimePower();
    renderEllipse();
}

function changeProbe(value) {
    document.querySelector('.probe-value').innerHTML = value;
    probe = value;

    renderTimePower();
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
    tissueOptions.forEach(tissueOption => {
        tissueOption.disabled = false;
        if (probeQuantity > 1 && tissueOption.textContent !== 'Liver') {
            tissueOption.disabled = true;
        }
    });
}

function renderTimePower() {
    if (probeQuantity > 1) {
        const val = MULTI_PROBES.find(e => e.Count === probeQuantity && e.Probe === probe);
        if (!val) return;
        power = val.Power;
        time = val.Time;
        document.querySelector('.time .value').innerHTML = time + ':00';
        document.querySelector('.power .value').innerHTML = power;
        document.querySelector('.time .chevron-up').disabled = true;
        document.querySelector('.time .chevron-down').disabled = true;
        document.querySelector('.power .chevron-up').disabled = true;
        document.querySelector('.power .chevron-down').disabled = true;
    } else {
        MIN_POWER = parseInt(Object.keys(POWER_TIME_LIMIT[probe])[0]);
        MAX_POWER = MAX_POWERS[probe];

        if (power > MAX_POWER) {
            power = MAX_POWER;
        }

        if (power < MIN_POWER) {
            power = MIN_POWER;
        }

        MIN_TIME = POWER_TIME_LIMIT[probe][power] ?? 0;
        if (time < MIN_TIME) {
            time = MIN_TIME;
        }

        document.querySelector('.time .value').innerHTML = time + ':00';
        document.querySelector('.time .chevron-up').disabled = time >= MAX_TIME;
        document.querySelector('.time .chevron-down').disabled = time <= MIN_TIME;

        document.querySelector('.power .value').innerHTML = power;
        document.querySelector('.power .chevron-up').disabled = power >= MAX_POWER;
        document.querySelector('.power .chevron-down').disabled = power <= MIN_POWER;
    }
}

function renderEllipse() {
    // visualDom.style.height = visualDom.clientWidth * (0.55 + probeQuantity / 10) + "px";
    let Dimensions = {};
    if (probeQuantity === 1) {
        CALCULATIONS
            .filter(({ Probe, Tissue }) => Probe === probe && Tissue === tissue)
            .forEach(e => {
                Dimensions[e.Dimension] = e['Variable 1'] * Math.log(time) + e['Variable 2'] * power + e['Variable 3'];
            });
    } else {
        Dimensions = MULTI_PROBES.filter(({ Count, Probe }) => Count === probeQuantity && Probe === probe)[0];
    }

    if (!Dimensions || Object.keys(Dimensions).length === 0) {
        // remove previous rendered ellipse
        visualDom.style.display = 'none';
        document.querySelector('.no-data').style.display = "block";
        return;
    };

    visualDom.style.display = "flex";
    document.querySelector('.no-data').style.display = "none";

    // render probe images 
    probesContainerDom.innerHTML = '';
    for (let i = 0; i < probeQuantity; i++) {
        probesContainerDom.innerHTML += `<img alt="probe" src="assets/img/probs/${probe}.png" />`;
    }
    probesContainerDom.style.marginRight = (visualDom.clientWidth * Dimensions.Offset / THRESHOLD) + 'px';

    ellipseDom.style.width = (visualDom.clientWidth * Dimensions.Length / THRESHOLD) + 'px';
    ellipseDom.style.height = (visualDom.clientWidth * Dimensions.Height / THRESHOLD) + 'px';
    midPointTip.innerHTML = ((Dimensions.Length - Dimensions.Offset) / 2).toFixed(2) + 'cm';
    ellipseDom.querySelector('.length-line .value').innerHTML = Dimensions.Length.toFixed(1) + 'cm';
    ellipseDom.querySelector('.height-line .value').innerHTML = Dimensions.Height.toFixed(1) + 'cm';
    ellipseDom.querySelector('.offset-line').style.visibility = "visible";
    ellipseDom.querySelector('.offset-line .value').innerHTML = Dimensions.Offset.toFixed(1) + 'cm';
    ellipseDom.querySelector('.offset-line').style.width = (visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 'px';
    ellipseDom.querySelector('.offset-line .len').style.width = (visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 'px';
    ellipseDom.querySelector('.offset-line').style.height = (visualDom.clientWidth * Dimensions.Height / (2 * THRESHOLD)) + 16 + 'px';

    if (Dimensions.Offset < 0) {
        ellipseDom.querySelector('.offset-line').style.right = (visualDom.clientWidth * Dimensions.Offset / THRESHOLD) + 'px';
        ellipseDom.querySelector('.height-line').style.right = -((visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 14) + 'px';
        visualDom.style.marginRight = ((visualDom.clientWidth * Math.abs(Dimensions.Offset) / THRESHOLD) + 64) + 'px';
    }
    else {
        ellipseDom.querySelector('.offset-line').style.right = 0;
        ellipseDom.querySelector('.height-line').style.right = '-14px';
        visualDom.style.marginRight = '64px';
    }

    if (!Dimensions.Offset) {
        ellipseDom.querySelector('.offset-line').style.visibility = "hidden";
    }
}

