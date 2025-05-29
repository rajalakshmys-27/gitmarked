// This script dynamically sets the --vh CSS variable to the real viewport height on mobile devices.
function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh * 100}px`);
}

window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);
setVh();
