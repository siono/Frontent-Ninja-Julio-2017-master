window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente

import SongsService from "./SongsService";
import UIManager from "./UIManager";
import SongsListManager from "./SongsListManager";

const songService = new SongsService("/songs/");
const songListUIManager = new UIManager(".songs-list"); //gestiona los estado de carga

const songsListManager = new SongsListManager(songService,songListUIManager);
songsListManager.init(); 