
'use strict';

var http = require('http');
var VLAuthentication = require('../ab-dev/viyo-server/libs.js').VLAuthentication;
var ABClient = require('../ab-dev/ab-libs_network/libs.js').ABClient;


var VLSpotify_Controller = {
    self: null,

    client: null,

    Class: function() {
        this.self = this;
        var self = this.self;

        self.client = new ABClient('');
    },

    connect: function()
    {
        var self = this.self;

        var a = new VLAuthentication();

        a.addController('spotifyController')
            .observesType('spotifyPlayer');

        self.client.connect();
        self.client.send(a.getMessage());
    },

    play: function(uri)
    {
        var self = this.self;

        var d = new VLDataToPlayer()
            .playerTypes('spotifyPlayer')
            .data({
                command: 'play',
                uri: uri
            });

        self.client.send(d.getMessage());
    },

    pause: function()
    {
        var self = this.self;

        var d = new VLDataToPlayer();

        d.setPlayerTypes('spotifyPlayer');
        d.setData({
            command: 'pause'
        });

        self.client.send(d.getMessage());
    }

};
VLSpotify.Class.prototype = VLSpotify;
