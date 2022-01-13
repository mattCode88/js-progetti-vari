const PAGINAZIONE = document.getElementById("paginazione");
let LABELS = document.querySelectorAll("#paginazione > label");
const PAGINE = document.getElementById("pagine");
const RADIO_BTN = document.querySelectorAll("#pagine > input[type=radio]");
let paginaCorrente = 0;
let toccoInizialeX = 0;
let toccoFinaleX = 0;

PAGINAZIONE.addEventListener("click", changePage);

// GESTIAMO GLI SWIPE TRAMITE GLI EVENTI TOUCHSTART E TOUCHEND
PAGINE.addEventListener("touchstart", touchStart, false);
PAGINE.addEventListener("touchend", touchEnd, false);

function changePage(e) {
    if ( e.target.nodeNmae = "LABEL" ) {
        goToPage( e.target.dataset.page - 1 );
    }
}

function touchStart(e) {
    toccoInizialeX = e.changedTouches[0].screenX;
}

function touchEnd(e) {
    toccoFinaleX = e.changedTouches[0].screenX;
    toccoFinaleX < toccoInizialeX ? moveTo('next') : moveTo('prev');
}

function moveTo( direction ) {
    if ( direction === "next" && paginaCorrente < LABELS.length - 1 ) {
        goToPage(paginaCorrente + 1);
    } else if ( direction === "prev" && paginaCorrente > 0 ) {
        goToPage(paginaCorrente - 1);
    }
}

function goToPage(numPagina) {
    LABELS[paginaCorrente].classList.remove( "lab-sel" );
    LABELS[numPagina].classList.add( "lab-sel" );
    RADIO_BTN[numPagina].checked = true;
    paginaCorrente = numPagina;
}