export default class Drag {
    constructor(conf) {
        this.CONF = conf;
        conf.note.forEach(nota => {
            this.addEvent(nota, 'dragstart', this.dragStartEvent);
            this.addEvent(nota, 'dragend', this.dragEndEvent);
            // console.log(this);
        });
        this.addEvent(conf.noteWrapper, 'dragover', this.dragOverEvent);
        this.addEvent(conf.trashBtn, 'dragover', this.trashOverEvent);
        this.addEvent(conf.trashBtn, 'dragleave', this.trashLeaveEvent);
        this.addEvent(conf.trashBtn, 'drop', this.trashDropEvent);
    }

    addEvent(element, type, fn) {
        // con bind cambiamo il binding di this, che farà riferimento all' istanza Note
        element.addEventListener(type, fn.bind(this));
    }

    trashOverEvent(e) {
        e.preventDefault();
        console.log('sei sopra il cestino');
        this.CONF.trashBtn.classList.add('color-trash-dragover');
    }

    trashLeaveEvent(e) {
        this.CONF.trashBtn.classList.remove('color-trash-dragover');
    }

    trashDropEvent(e) {
        e.preventDefault();
        this.CONF.trashBtn.classList.remove('color-trash-dragover');
        this.CONF.noteWrapper.removeChild(this.CONF.notaInDrag);
        // cancelliamo la nota dalla nodeList con filter
        this.CONF.note = this.CONF.note.filter(nota => nota != this.CONF.notaInDrag);
    }

    dragStartEvent(e) {
        this.CONF.notaInDrag = e.target;
        e.target.classList.add('drag');
    }

    dragEndEvent(e) {
        this.CONF.notaInDrag = null;
        e.target.classList.remove('drag');
        if ( this.CONF.soundBtn.dataset.sound === '1' ) {
            this.CONF.sound.play();
        }
    }

    dragOverEvent(e) {
        const notaInDrag = this.CONF.notaInDrag;
        const notaDaSostituire = this.getSubstituteNote(e);
        // console.log(notaInDrag, notaDaSostituire);
        if(notaInDrag == notaDaSostituire) return

        // return

        const notaInDragNext = notaInDrag.nextElementSibling;
        const notaDaSostituireNext = notaDaSostituire.nextElementSibling;

        this.replace(notaInDrag, notaDaSostituire, notaInDragNext, notaDaSostituireNext);
        this.replace(notaDaSostituire, notaInDrag, notaDaSostituireNext, notaInDragNext);
    }

    // destrutturiamo l' oggetto event per prendere solo le 2 proprietà che ci servono
    getSubstituteNote({ clientX, clientY }) {
        // console.log(clientX, clientY)
        let sostituto, distMinima = 1e5;
        this.CONF.note.forEach(nota => {
            // getBoundingClientRect ci da una serie di informazioni riguardanti la posizione di un elemento
            let pos = nota.getBoundingClientRect();
            // console.log(pos);
            // calcoliamo i cateti
            let spostamentoX = Math.abs(clientX - pos.x);
            let spostamentoY = Math.abs(clientY - pos.y);
            // calcoliamo l' ipotenusa
            let dist = Math.hypot(spostamentoX, spostamentoY);
            if( dist < distMinima ) {
                distMinima = dist;
                sostituto = nota;
            }
        });
        return sostituto;
    }

    replace(nota, sostituto, notaNext, sostitutoNext) {
        if( !sostitutoNext ) return this.CONF.noteWrapper.appendChild(nota);
        this.CONF.noteWrapper.insertBefore(nota, sostitutoNext);
    }
}