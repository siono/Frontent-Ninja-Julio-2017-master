window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente

import SongsService from "./SongsService";
import UIManager from "./UIManager";

const songService = new SongsService("/songs/");
const songListUIManager = new UIManager(".songs-list");

// Cargar la lista de canciones con AJAX
songService.list(songs => {
    // Comprobamos si hay canciones
    if (songs.length == 0) {
        // Mostramos el estado vacío
        songListUIManager.setEmpty();
    } else {
        // Componemos el HTML con todas las canciones
        let html = "";
        for (let song of songs) {
            html += `<article class="song">
                <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover">
                <div class="artist">${song.artist}</div>
                <div class="title">${song.title}</div>
            </article>`;
        }

        // Metemos el HTML en el div que contiene las canciones
        $(".songs-list .ui-status.ideal").html(html);

        // Quitamos el mensaje de cargando y mostramos la lista de canciones
        songListUIManager.setIdeal();
    }
}, error => {
    // Mostrar el estado de error
    songListUIManager.setError();

    // Hacemos log del error en la consola
    console.error("Error al cargar las canciones", error);
});