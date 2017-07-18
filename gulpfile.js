var gulp = require("gulp"); //importamos gulp
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var notify = require("gulp-notify");

//definir la tarea por defecto
gulp.task("default", function(){

    //iniciamos el servidor de desarrollo
    browserSync.init({server: "./src/"}); // arranca el servidor en la carpeta src
    
    //observa  cambios en los archivos SASS, y entones ejecuta la tarea 'sass'
    gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"], ["sass"]);

    //observa cambios en los archivos html y recarga el navegador
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

//complar sass
gulp.task("sass",function(){
    gulp.src("src/scss/style.scss") //cargamos el archivo style.scss
        .pipe(sass().on("error", function(error){ //lo compilamos con gulp-sass
            return notify().write(error); //si ocurre un error, mostramos una notificación
        })) 
        .pipe(gulp.dest("src/css/")) //guardamos el resultado en la carpeta css
        .pipe(browserSync.stream()) //recargue el CSS del navegador
        .pipe(notify("SASS Compilado 🤠")); //notificación 
});