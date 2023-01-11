import {deleteAsync} from 'del';
import gulp from 'gulp';

import browser_sync from 'browser-sync';
const browserSync = browser_sync.create();

//Import sass - Build scss to css
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';

//Import ejs - Build ejs to html
import ejs from 'gulp-ejs';
import rename from 'gulp-rename';

//var replace = require('gulp-replace');

import cachebust from 'gulp-cache-bust';

//dirname
const devDir = './dev';
const buildDir = './public';


// Clean assets
function clean() {
    return deleteAsync([buildDir+"/assets/"]);
}

//Compile scss to css
function style(){
    return gulp
        //1. Where is my scss file
        .src(devDir+'/assets/sass/**/*.scss')

        //2. sourceMap scss
        .pipe(sourcemaps.init())

        //3. pass that file through sass compilier
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))

        //4. auto prefix
        .pipe(autoprefixer({
            cascade: false
        }))

        //5. source map css
        .pipe(sourcemaps.write('.'))
        
        //6. Where do I save the compiled CSS?
        .pipe(gulp.dest(buildDir+'/assets/css'))

        //7. stream changes to all browser
        .pipe(browserSync.stream());
}

//JS
function scripts(){
    return gulp
        .src(devDir+'/assets/js/**/*.js')
        .pipe(gulp.dest(buildDir+'/assets/js'));
}

//Images
function images(){
    return gulp
        .src(devDir+'/assets/img/**/*.+(jpg|jpeg|png|gif|svg)')
        .pipe(gulp.dest(buildDir+ "/assets/img"));
}

//Font
function fonts(){
    return gulp
        .src(devDir+'/assets/fonts/**/*.+(woff|ttf|otf|woff2|jfproj)')
        .pipe(gulp.dest(buildDir+ "/assets/fonts"));
}

//Cache Bust
// function cacheBustCss(){
//     var cbString = new Date().getTime();
//     return gulp
//     .src([devDir+"/ejs/inc/_header.ejs"])
//     .pipe(
//         replace(/cache_bust=\d+/g, function() {
//             return "cache_bust=" + cbString;
//         })
//     )
//     .pipe(gulp.dest(buildDir));
// }

//Compile ejs to html
function ejsTemplate(){
    return gulp
        .src(devDir+'/ejs/*.ejs')
        .pipe(ejs({ title: 'gulp-ejs' }))
        .pipe(rename({ extname: '.html' }))
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest(buildDir))
}

function watch(){
    browserSync.init({
        server: {
            baseDir: buildDir
        },
        port: 8080
    });
    gulp.watch(devDir+'/assets/sass/**/*.scss', gulp.parallel(style, ejsTemplate));
    gulp.watch(devDir+'/assets/js/**/*.js', gulp.parallel(scripts, ejsTemplate));
    gulp.watch(devDir+'/assets/img/*', images);
    gulp.watch(devDir+'/assets/fonts/*', fonts);
    gulp.watch(devDir+'/ejs/**/*.ejs',ejsTemplate);
    gulp.watch(buildDir+'/*.html').on('change', browserSync.reload);
}

// var exports = {};

// exports.build = gulp.series(clean, gulp.parallel(style, scripts, images, ejsTemplate));
// exports.watch = watch;

gulp.task('build',gulp.series(clean, gulp.parallel(style, scripts, images, ejsTemplate)));
gulp.task('watch',watch);



