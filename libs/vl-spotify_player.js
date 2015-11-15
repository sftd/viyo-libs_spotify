
'use strict';

var ABClient = require('../ab-dev/ab-libs_network/libs.js').ABClient;


var VLSpotify_Player = {
    self: null,

    EscapeUri: function(uri)
    {
        return uri.replace(/[^a-zA-Z0-9:]+/g, '');
    },

    name: '',
    client: null,

    listeners_OnPlay: null,
    listeners_OnPause: null,
    listeners_OnResume: null,

    Class: function(name, host) {
        this.self = this;
        var self = this.self;

        self.name = name;
        self.client = new ABClient();

        self.client.setOnDataReceivedListener(function(data) {
            self.onDataReceived(data);
        });
    },

    connect: function()
    {
        var self = this.self;

        var a = new VLAuthentication();

        a.addPlayer(self.name)
            .type('spotify_Player');
        a.addSensor(self.name)
            .type('spotify_Sensor');

        self.client.connect();
        self.client.send(a.getMessage());
    },

    onDataReceived: function(data)
    {
        var message = JSON.parse(data);

        if (message === null)
            console.warn('Cannot parse JSON data.');

        if (message.type === 'dataToPlayer') {
            var data = message.data;

            if (VLSpotify_Commands.Play.Check(data)) {
                if (self.listeners_OnPlay !== null)
                    self.listeners_OnPlay(data.uri);

                var d = new VLDataFromSensor(self.name)
                    .data({
                        'action': 'play'
                    });

                self.client.send(d.getMessage());

            }
            else if (VLSpotify_Commands.Pause.Check(data)) {
                if (self.listeners_OnPause)
                self.pause();
            }

            if (data.command === 'play')
                self.play(VLSpotify_Player.EscapeURI(data.uri));
            else if (data.command === 'pause')
                self.pause();
        }
    }

};
VLSpotify.Class.prototype = VLSpotify;
