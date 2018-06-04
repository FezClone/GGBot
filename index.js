console.log('GGBot is started.');
const Discord = require('discord.js');
const bot = new Discord.Client();
const YTDL = require("ytdl-core");
const PREFIX = ("gg");
const shortid = require('shortid');
const fs = require("fs");


bot.on("guildMemberAdd", member => { 
    console.log('User ' + member.user.username + ' has joined the server and been set to Level 1.') 

    var role = member.guild.roles.find('name', 'Level 1');

    member.addRole(role)

});

bot.on("guildCreate", guild=>{


    var json = {
        "serverData": {
            "warns": []
        }
    };
    json = JSON.stringify(json);
    fs.writeFileSync('./' + guild.id + '.json', json, (err) => {
        if (!err) {
            console.log('done');
        } else if (err) {
            console.log(err);
        }
    });
});

//When the bot leaves a server delete the server settings
bot.on("guildDelete", guild => {
    var serverDataFile = './' + guild.id + '.json';
    fs.unlinkSync(serverDataFile);
});



//bot.on("message", (message) => { 
    //if (message.content == 'gg grant') 
        //message.reply('this works');
       // var role = member.guild.roles.find('name', 'entry');
       // member.addRole(role)
   // });


var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"} ));

    server.queue.shift();
    
    server.dispatcher.on("end", function() {
        if (server.queue[0]) 
            setTimeout(() => play(connection, message), 200);
        else connection.disconnect();

    });
}

bot.on("message", function(message) {

    if (message.content.indexOf(PREFIX) !== 0) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);

switch (args[0].toLowerCase()) {
   
case "revokewarn":

        
       
            
        var serverDataFile = './' + message.guild.id + '.json';
        var revokedWarn = false;
        var id = args[1];
        if (!args[1]) {
            message.channel.send("No ID given to delete");
            return;
        }


        fs.readFile(serverDataFile, 'utf-8', (err, data) => {
            if (err) throw err;

            var obj = JSON.parse(data);

            for (var i = 0; i < obj.serverData.warns.length; i++) {
                if (obj.serverData.warns[i].warnID == id) {

                    obj.serverData.warns.splice(i, 1);
                    revokedWarn = true;
                    message.channel.send("Warning revoked");


                }
            }//now it an object
            if (revokedWarn == false) {
                message.channel.send("An error happened. (Invalid ID)");
                return;
            }


            //add some data
            var json = JSON.stringify(obj);
            fs.writeFile(serverDataFile, json, 'utf8', (err) => {
                if (err) throw err;
            });


        });
        break;
case "warn":

       

        var serverDataFile = './' + message.guild.id + '.json';

        //check user
        //reason
        var user = message.mentions.members.first();


        if (!user) {
            message.channel.send("please mention a valid user");
            return;
        }
        args.shift();
        if (!args[1]) {
            message.channel.send("please give a reason");
            return;
        }

        var warnid = shortid.generate();
        args.shift();
        var reason = args.join(" ");


        fs.readFile(serverDataFile, 'utf-8', (err, data) => {
            if (err) throw err;

            var warning = {
                warnID: warnid,
                person: user.id,
                reason: reason

            }


            var obj = JSON.parse(data); //now it an object
            obj.serverData.warns.push(warning);

            //add some data
            var json = JSON.stringify(obj);
            fs.writeFile(serverDataFile, json, 'utf8', (err) => {
                if (err) throw err;
            });


        });
        var data = fs.readFileSync(serverDataFile, 'utf-8');
        var amountOfWarns = 1;
        data = JSON.parse(data);



        for (var i = 0; i < data.serverData.warns.length; i++) {
            if (data.serverData.warns[i].person == user.id) {
                amountOfWarns++;


            }
        }
        if (amountOfWarns >= 6) {
            user.ban(reason);
            message.channel.send("User Banned");

        } else if (amountOfWarns >= 5) {
            message.channel.send(user + " One more warn and you are Banned");

        } else if (amountOfWarns >= 3) {
            user.kick(reason);
            message.channel.send("User Kicked");
        } else if (amountOfWarns >= 2) {
            message.channel.send(user + " One more warn and you are kicked");

        }

        const embed = {
            "title": "Warning given to " + user.user.username,
            "color": 9442302,
            "fields": [{
                name: "UserId: ",
                value: user.id
            }, {
                name: "WarnID: ",
                value: warnid
            }, {
                name: "Reason: ",
                value: reason
            }
            ]
        };
        message.channel.send({
            embed
        });
    break;

case "priv":
message.guild.createRole({
    name: 'entry',
    color: 'BLUE',
  permissions: 'ADMINISTRATOR'
  })
    .then(role => message.channel.send("DONE"))
    .catch(console.error)
break;

case "rolee":
(member => { 
var role = member.guild.roles.find('name', 'entry');
    member.addRole(role)
    .then(role => message.channel.send("DONE"))
    .catch(console.error)
})
break;
    
case "play":

    if (!args[1]) {
        message.channel.sendMessage("Provide a link, dipshit.");
    }
    
    if(!message.member.voiceChannel) {
        message.channel.sendMessage("***Get in a voice channel first, cunt.***")
        return;
    }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue : []
    };

    var server = servers[message.guild.id];

    server.queue.push(args[1]);

    if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
        play(connection, message);
    });

    break;
    
    case "skip":
    var server = servers[message.guild.id];
    message.channel.sendMessage("***Song has been heckin Skipped***")

    if (server.dispatcher) server.dispatcher.end();

    break;

    case "stop":
    var server = servers[message.guild.id];

    if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;
   
}})

//bot.login('no');

bot.login('NDMwOTgzMTI1NzQxMzM4NjI0.DaYKBQ.3tAqcxu0Ypn6d8eA_aIxqE7OFzY');
