const body = document.body;
const toggleButton = document.getElementById('Change');

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const currentBG = body.style.backgroundImage;
    if (currentBG.includes('BackGroundForms.png')) {
        body.style.backgroundImage = 'url("otro-background.png")';
    } else {
        body.style.backgroundImage = 'url("BackGroundForms.png")';
    }
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});