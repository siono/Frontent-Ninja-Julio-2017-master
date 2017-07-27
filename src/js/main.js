window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente

import SongsService from "./SongsService";
import UIManager from "./UIManager";
import SongsListManager from "./SongsListManager";
import SongFormManager from "./SongFormManager";
import PubSub from 'pubsub-js';

const songService = new SongsService("/songs/"); //le pasamos la ruta donde el api rest nos devuelve el json y generamos los métodos ajax.
const songListUIManager = new UIManager(".songs-list"); //gestiona los estado de carga

const songsListManager = new SongsListManager(songService,songListUIManager);
songsListManager.init(); 

const songFormManager = new SongFormManager(".song-form", songService);
songFormManager.init();
