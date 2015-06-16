require.config({
    baseUrl: './app/',
    paths: {
        "underscore": "../bower_components/lodash/dist/lodash.underscore",
        "lodash": "../bower_components/lodash/dist/lodash",
        "template": "../bower_components/lodash-template-loader/loader",
        //"jquery": "../bower_components/jquery/dist/jquery",
        "jquery-ui": "../bower_components/jquery-ui/jquery-ui",
        "jquery-ui/draggable": "../bower_components/jquery-ui/ui/draggable",
        "backbone": "../bower_components/backbone/backbone",
        "backbone.marionette": "../bower_components/marionette/lib/core/backbone.marionette",
        "backbone.radio": "../bower_components/backbone.radio/build/backbone.radio",
        "backbone.babysitter": "../bower_components/backbone.babysitter/lib/backbone.babysitter",
        "text": "../bower_components/text/text"
    },
    map: {
        '*': {
            'backbone.wreqr': 'backbone.radio'
        }
    },
    deps: ["main"],
    urlArgs: "v=" + +new Date
});
