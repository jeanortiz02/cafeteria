const {src, dest, watch, series, parallel } = require ('gulp');

// CSS Y SASS
const sass = require ('gulp-sass')(require('sass'));
const postcss = require ('gulp-postcss');
const autoprefixer = require ('autoprefixer');

// Sourcemaps y CSS NANO
const sourcemaps = require ('gulp-sourcemaps');
const cssnano = require ('cssnano');

// IMAGENES 
const imagemin = require ('gulp-imagemin');
const webp = require ('gulp-webp');
const avif = require ('gulp-avif');


function css() {

    // compilar sass 
    // pasos: 1- identificar archivos , 2 - compilarla, 3- guardarla

    return src('src/scss/app.scss')
        .pipe( sourcemaps.init())
        .pipe(sass())
        .pipe (postcss( [autoprefixer(), cssnano()] ))
        .pipe (sourcemaps.write('.'))
        .pipe (dest('build/css'))


}

function imagenes () {
    return src( 'src/img/**/*')
        .pipe ( imagemin({ optimizationLevel: 2 }))
        .pipe( dest ('build/img') )

}

function versionWebp () {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe ( webp(opciones))
        .pipe (dest ('build/img'))
}

function versionAvif () {
    const opciones = {
        quality: 50
    }
    return src ('src/img/**/*.{png,jpg}')
        .pipe( avif( opciones))
        .pipe (dest ('build/img'))
}

function dev() {
    watch( 'src/scss/**/*.scss', css);
    watch ( 'src/img/**/*', imagenes);
}

 

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

// exports default
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);


// Series - ejecuta la primera tarea y cuando termine esa ejecuta la siguiente
// Parallel - ejecuta todas las tareas al mismo tiempo