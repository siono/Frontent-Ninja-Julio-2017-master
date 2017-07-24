window.$ = window.jQuery = require("jquery");


//Cargar la lista de canciones con AJAX
$.ajax({
    url: "/songs/",
    success: songs => {
        //comprobamos si hay canciones
        if (songs.lenght == 0){
            //Mostramos el estado vacío
            $(".songs-list").removeClass("loading").addClass("empty");

        }else{

        let html = "";
        //componeos el HTML con todas las canciones
        for (let song of songs){
            html += `<article class="song">
                        <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover">
                        <div class="artist">${song.artist}</div>
                        <div class="title">${song.title}</div>
                    </article>`;
        }
        $(".songs-list .ui-status.ideal").html(html);

        //Quitamos la clase de loading y ponemos ideal.
        $(".songs-list").removeClass("loading").addClass("ideal");
        }
    },
    error: error => {
        //Mostrar el estado de error
        $(".songs-list").removeClass("loading").addClass("error");
        console.error("Error al cargar las canciones", error)
    }
});