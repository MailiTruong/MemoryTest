/**
 * @class       : toolbar
 * @author      : mailitg (mailitg@$HOSTNAME)
 * @created     : Monday Nov 11, 2024 16:17:02 CET
 * @description : toolbar
 */

const toolbar = document.getElementById('toolbar-container');
const toggleButton = document.getElementById('menu-toggle');

toggleButton.addEventListener('click', () => {
    if (toolbar.style.left === '-250px') {
        toolbar.style.left = '0';
    } else {
        toolbar.style.left = '-250px';
    }
});


