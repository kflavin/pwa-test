const $ = (id) => document.getElementById(id);

// Display mode: "standalone" means it's running as an installed app
const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
$('mode').textContent = standalone ? 'installed (standalone)' : 'browser tab';

// Network status
const updateNet = () => ($('net').textContent = navigator.onLine ? 'online' : 'offline');
addEventListener('online', updateNet);
addEventListener('offline', updateNet);
updateNet();

// Service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => navigator.serviceWorker.ready)
    .then(() => ($('sw').textContent = 'active (offline ready)'))
    .catch((e) => ($('sw').textContent = 'failed: ' + e.message));
} else {
  $('sw').textContent = 'not supported';
}

// Install prompt (Chrome/Android/Edge fire beforeinstallprompt; iOS Safari does not)
let deferred;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
if (standalone) {
  $('install-help').textContent = 'Already installed.';
} else if (isIOS) {
  $('install-help').textContent = 'On iOS: tap the Share button, then "Add to Home Screen".';
} else {
  $('install-help').textContent = 'Waiting for the browser to offer install… (or use the browser menu → "Install app" / "Add to Home screen").';
}
addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferred = e;
  $('install').hidden = false;
  $('install-help').textContent = '';
});
$('install').addEventListener('click', async () => {
  if (!deferred) return;
  deferred.prompt();
  await deferred.userChoice;
  deferred = null;
  $('install').hidden = true;
});
addEventListener('appinstalled', () => ($('install-help').textContent = 'Installed! Open it from your home screen.'));

// Counter persisted in localStorage
let count = Number(localStorage.getItem('count') || 0);
$('count').textContent = count;
$('inc').addEventListener('click', () => {
  localStorage.setItem('count', ++count);
  $('count').textContent = count;
});
