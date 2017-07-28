const $ = require("jquery");
import UIManager from "./UIManager";

export default class SongsListManager extends UIManager {

    constructor(elementSelector,songsService, pubSub) {
        super(elementSelector);
        this.songsService = songsService;
        this.pubSub = pubSub;
    }

    init() {
        this.loadSongs();
        let self = this;
        this.element.on("click",".song",function(){
            let songId = this.dataset.id;
            self.deleteSong(songId);
            console.log("ELIMINAR CANCION",this);
        });
        this.pubSub.subscribe("new-song",(topic,song)=>{
            this.loadSongs();
        })
    }

    loadSongs() {
        this.songsService.list(songs => {
            // Comprobamos si hay canciones
            if (songs.length == 0) {
                // Mostramos el estado vacío
                this.setEmpty();
            } else {
                this.renderSongs(songs);
                // Quitamos el mensaje de cargando y mostramos la lista de canciones
                this.setIdeal();
            }
        }, error => {
            // Mostrar el estado de error
            this.setError();
            // Hacemos log del error en la consola
            console.error("Error al cargar las canciones", error);
        });
    }

    renderSongs(songs) {
        // Componemos el HTML con todas las canciones
        let html = "";
        for (let song of songs) {
            html += this.renderSong(song);
        }

        // Metemos el HTML en el div que contiene las canciones
        this.setIdealHtml(html);
    }

    renderSong(song){
        let cover_url = song.cover_url;
        let srcset = "";
        console.log(song.artist);
        console.log(srcset);
        if (cover_url == ""){
            cover_url = "img/disk-150px.png";
            srcset = 'srcset="img/disk-150px.png 150w, img/disk-250px.png 250w, img/disk-300px.png 300w"';
        }

        return `<article class="song" data-id="${song.id}">
                <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover" class="cover"${srcset}>
                <div class="artist">${song.artist}</div>
                <div class="title">${song.title}</div>
            </article>`
    }

    deleteSong(songId){
        this.setLoading();
        this.songsService.delete(songId,success => {
            this.loadSongs();
        },error=>{

        })
    }

}