import MagicGrid from 'magic-grid';

document.addEventListener("DOMContentLoaded", () => {
    // for (let i = 0; i < 1; i++) {
    //     add_card();
    // }

    let magicGrid = new MagicGrid({
        container: '.container',
        static: true,
        animate: true,
    });

    let container = document.getElementsByClassName('container')[0];
    let observer = new MutationObserver(() => {
        magicGrid.listen();
    });

    observer.observe(container, { childList: true });
});