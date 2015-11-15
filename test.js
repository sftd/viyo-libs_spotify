
'use strict';

/* External */
var exec = require('child_process').exec;
/* Internal */
// var VLSpotify_Player = require('./libs.js').VLSpotify_Player;
var VLSpotify_Uri = require('./libs.js').VLSpotify_Uri;


var p = new VLSpotify_Player('testSpotifyPlayer', 'localhost');

p.setOnPlayListener(function(uri) {
    var cmd = 'qdbus org.mpris.MediaPlayer2.spotify' +
            ' / org.freedesktop.MediaPlayer2.OpenUri ' + uri;

    exec(cmd, function(error, stdout, stderr) {
        console.log('Playing: %s.', uri);
    });
});

p.setOnPauseListener(function() {
    var cmd = 'qdbus org.mpris.MediaPlayer2.spotify' +
            ' / org.freedesktop.MediaPlayer2.Pause';

    exec(cmd, function(error, stdout, stderr) {
        console.log('Paused.');
    });
});

p.setOnResumeListener(function() {
    var cmd = 'qdbus org.mpris.MediaPlayer2.spotify' +
            ' / org.freedesktop.MediaPlayer2.Play';

    exec(cmd, function(error, stdout, stderr) {
        console.log('Resumed.');
    });
});
