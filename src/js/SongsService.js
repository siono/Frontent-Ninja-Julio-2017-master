const $ = require("jquery");

export default class SongsService {

    constructor(url) {
        this.url = url;
    }

    // Obtener listado de canciones
    list(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    // Crear o actualizar canción
    save(song,successCallback, errorCallback) {
        if (song.id){
            this.update(song,successCallback,errorCallback)
        }
        else{
            this.create(song,successCallback,errorCallback);
        }
    }

    // Crear una cancion
    create(song,successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            methode: "post",
            data: song,
            success: successCallback,
            error: errorCallback
        });
    }

    // Obtener el detalle de canción
    getDetail(songId,successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songId}`,
            success: successCallback,
            error: errorCallback
        });
    }

    // Actualizar una canción
    update(song,successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${song.id}`,
            methode: "update",
            data: song,
            success: successCallback,
            error: errorCallback
        });
    }

    // Borrar una canción
    delete(songId,successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songId}`,
            methode: 'delete',
            success: successCallback,
            error: errorCallback
        });
    }

}