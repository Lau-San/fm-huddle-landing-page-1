const { src, dest, watch, series } = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const postcss = require("gulp-postcss")
const cssnano = require("cssnano")
const autoprefixer = require("autoprefixer")
const browserSync = require("browser-sync").create()

function scssCompile() {
    return src("./assets/scss/main.scss", { sourcemaps: true })
        .pipe(sass())
        .pipe(
            postcss([
                autoprefixer(),
                cssnano(),
            ])
        )
        .pipe(dest("assets/css", { sourcemaps: "." }))
}

function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: ".",
        },
    })
    cb()
}

function browserSyncReload(cb) {
    browserSync.reload()
    cb()
}

function watchTask() {
    watch("*.html", browserSyncReload)
    watch("./assets/scss/**/*.scss", series(scssCompile, browserSyncReload))
}

exports.default = series(scssCompile, browserSyncServe, watchTask)
