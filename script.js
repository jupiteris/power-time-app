const visualWindow = document.querySelector('.visual');
const ellipse = document.querySelector('.ellipse');
const offsetLine = document.querySelector('.offset-line');
const probImg = document.querySelector('.prob-img');

let length = 200; // should be less than parent width
let height = 120;
let offset = 10;

visualWindow.style.height = visualWindow.clientWidth + "px";
ellipse.style.width = length + 'px';
ellipse.style.height = height + 'px';
offsetLine.style.width = offset + 'px';
probImg.style.marginRight = offset + 'px';