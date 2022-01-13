import Drag from './drag.js';

export default class Note extends Drag{
    constructor(conf) {
        super(conf)
        this.CONF = conf;
        this.addEvent(conf.ricerca, 'input', this.search);
        this.addEvent(conf.soundBtn, 'click', this.soundBtnEvent);
        this.addEvent(conf.newNoteBtn, 'click', this.newNoteBtnEvent);
        this.addEvent(conf.close, 'click', this.closeNewNote);
        this.addEvent(conf.save, 'click', this.saveNewNote);
    }

    search(e) {
        const titoloRicercato = e.target.value;
        this.CONF.note.forEach(nota => {
            const titoloNota = nota.querySelector('p');
            if ( titoloNota.textContent.includes(titoloRicercato) ) {
                // con replace applicato a classList, sostituiamo le classi specificate
                return nota.classList.replace('hide', 'show');
            }
            nota.classList.replace('show', 'hide');
        });
    }

    soundBtnEvent(e) {
        const soundBtn = this.CONF.soundBtn;
        // abs prende il valore assoluto quindi -1 diventa 1
        soundBtn.dataset.sound = Math.abs(soundBtn.dataset.sound - 1);
        if(soundBtn.dataset.sound === '1') {
            return soundBtn.className = "fas fa-volume-up attivo";
        }
        soundBtn.className = "fas fa-volume-mute"
    }

    newNoteBtnEvent(e) {
        this.CONF.newNoteWrapper.classList.replace('close', 'open');
        this.CONF.titolo.focus();
    }

    closeNewNote(e) {
        this.CONF.newNoteWrapper.classList.replace('open', 'close');
    }

    saveNewNote(e) {
        const titolo = this.CONF.titolo.value;
        const testo = this.CONF.testo.value;
        if (titolo.length === 0) return alert('Inserisci titolo');
        const newNoteNode = this.createNewNoteNode(titolo, testo);
        this.addEvent(newNoteNode, 'dragstart', this.dragStartEvent);
        this.addEvent(newNoteNode, 'dragend', this.dragEndEvent);
        this.CONF.note = document.querySelectorAll('.nota');
        this.CONF.titolo.value = ''; 
        this.CONF.testo.value = ''; 
        this.closeNewNote();
    }

    createNewNoteNode(titolo, testo) {
        const newNote = document.createElement('DIV');
        // cons Date.now() creiamo un id univoco per la nuova nota
        newNote.setAttribute('id', `nota-${Date.now()}`);
        newNote.setAttribute('data-drag', `false`);
        newNote.setAttribute('draggable', `true`);
        newNote.setAttribute('class', `nota show`);

        const iconDrag = document.createElement('I');
        iconDrag.setAttribute('class', 'fas fa-arrows-alt');

        const nodoTitolo = document.createElement('P');
        nodoTitolo.appendChild(document.createTextNode(titolo));

        const nodoTesto = document.createElement('P');
        nodoTesto.appendChild(document.createTextNode(testo));

        newNote.append(iconDrag, nodoTitolo, nodoTesto);
        this.CONF.noteWrapper.appendChild(newNote);
        return newNote;
    }
}