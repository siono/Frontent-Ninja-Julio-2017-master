const $ = require("jquery");

import UIManager from './UIManager';

export default class SongFormManager extends UIManager {

    constructor(elementSelector, songsService, pubSub) {
        super(elementSelector); // llamada al constructor de la clase UIManager
        this.songsService = songsService;
        this.pubSub = pubSub;
    }

    init() {
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {
        this.element.on("submit", () => {
            this.validateAndSendData();
            // en jQuery podemos hacer un preventDefault haciendo un return false en los manejadores de evento
            return false; // == event.preventDefault();
        });
    }

    validateAndSendData() {
        if (this.isValid()) {
            this.send();
        }
    }

    isValid() {
        const inputs = this.element.find("input");
        for (let input of inputs) {
            if (input.checkValidity() == false) {
                const errorMessage = input.validationMessage;
                input.focus();
                this.setErrorHtml(errorMessage);
                this.setError();
                return false;
            }
        }
        // Llegamos aquí, si no hay ningún error
        this.setIdeal(); 
        return true;
    }

    send() {
        this.setLoading();
        const song = {
            artist: this.element.find("#artist").val(),
            title: this.element.find("#title").val(),
            cover_url: this.element.find("#cover_url").val()
        };
        this.songsService.save(song, success => {
            // TODO: recargar el listado de canciones
            this.pubSub.publish("new-song",song); //publicamos el evento que informa de la creación de una canción.
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setErrorHtml("Se ha producido un error al guardar la canción en el servidor.");
            this.setError();
        });
    }

    resetForm() {
        this.element[0].reset(); // resetea el formulario
    }

    disableFormControls() {
        this.element.find("input, button").attr("disabled", true);
    }

    enableFormControls() {
        this.element.find("input, button").attr("disabled", false);
    }

    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

    setError() {
        super.setError();
        this.enableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }

}