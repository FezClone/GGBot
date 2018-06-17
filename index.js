//Sets up thr uptimerobot keeper upper
const express = require("express")
const expressApp = express()
expressApp.get("/", (req, res) => res.json("OK FAM"))
expressApp.listen(process.env.PORT)




console.log('GGBot is started.');
const Discord = require('discord.js');
const bot = new Discord.Client();
const YTDL = require("ytdl-core");
const PREFIX = ("gg");
const shortid = require('shortid');
const GoogleImages = require('google-images');
const fs = require("fs");
const owjs = require('overwatch-js');


bot.on("guildMemberAdd", member => {
  
  
  
  if(!member.user.bot){
    console.log('User ' + member.user.username + ' has joined the server and been set to Level 1.');

    var level1Role = member.guild.roles.find('name', 'Level 1');
  var djRole = member.guild.roles.find('name', 'DJ');

    member.addRole(level1Role);
  member.addRole(djRole);
  }
if(member.user.bot){
  console.log('The Bot ' + member.user.username + ' has joined the server and been set to a Bot.');
  var botRole = member.guild.roles.find('name', 'Bot');
  member.addRole(botRole);
  
}
});

bot.on("guildCreate", guild => {


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

bot.on("ready",()=>{
    bot.user.setActivity('GG help');
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


    server.dispatcher = connection.playStream(YTDL(server.queue[0], {
        filter: "audioonly"
    }));

    server.queue.shift();
   
    server.dispatcher.on("end", function () {
        if (server.queue[0])
            setTimeout(() => play(connection, message), 200);
        else connection.disconnect();

    });
}

bot.on("message", function (message) {

    if (message.content.indexOf(PREFIX) !== 0) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);

    switch (args[0].toLowerCase()) {
      case "test":

        break;
         case "owqp":
        var owUsername=args[1].replace('#','-');
   
        
        
        
       
        owjs.getOverall(args[3], args[2], owUsername).then(function(data){
   
          console.log(data);
          message.channel.send({
  "embed": {
    "title": data.profile.nick,
    "description": "Here is all your stats (Both QP and Comp):",
    "url": data.profile.url,
    "color": 13246671,
    "thumbnail": {
      "url": data.profile.avatar
    },
    
    "author": {
      "name": args[1],
      "url": data.profile.url,
      "icon_url": data.profile.avatar
    },
    "fields": [
     
      {
        "name": "Quick Play Stats (1)",
        "value": 
        "Average of damge done per 10mins: "+data.quickplay.global.all_damage_done_avg_per_10_min + "\n"+
        "Main hero: "+data.quickplay.global.masteringHeroe + "\n"+
        "MultiKills: "+data.quickplay.global.multikills + "\n"+
        "Barrier damge done: "+data.quickplay.global.barrier_damage_done + "\n"+
        "Final blows (melee): "+data.quickplay.global.melee_final_blows + "\n"+
        "Deaths: "+data.quickplay.global.deaths + "\n"+
        "Hero damage done: "+data.quickplay.global.hero_damage_done + "\n"+
        "Amount of time spent on fire: "+data.quickplay.global.time_spent_on_fire + "\n"+
        "Solo kills: "+data.quickplay.global.solo_kills+ "\n"+
        "Objective time: "+data.quickplay.global.objective_time + "\n"+
        "Objective time: "+data.quickplay.global.objective_kills + "\n"+
        "Finals blows: "+data.quickplay.global.final_blows + "\n"+
        "Eliminations: "+data.quickplay.global.eliminations + "\n"+
        "All damage done: "+data.quickplay.global.all_damage_done+ "\n"+
        "Enviromental kills: "+data.quickplay.global.environmental_kills + "\n"+
        "Defensive assists: "+data.quickplay.global.defensive_assists + "\n"+
        "Recon assists: "+data.quickplay.global.recon_assists + "\n"+
        "Offensive assists: "+data.quickplay.global.offensive_assists + "\n"+
        "Amount of healing done: "+data.quickplay.global.healing_done + "\n"+
        "Amount of teleporter pads destroyed: "+data.quickplay.global.teleporter_pads_destroyed + "\n"+
        "Most eliminations in one game: "+data.quickplay.global.eliminations_most_in_game + "\n"+
        "Most final blows in one game: "+data.quickplay.global.final_blows_most_in_game + "\n"+
        "Most damge done ins one game: "+data.quickplay.global.all_damage_done_most_in_game + "\n"+
        "Most healing done in one game: "+data.quickplay.global.healing_done_most_in_game + "\n"+
        "Most defensive assists in one game: "+data.quickplay.global.defensive_assists_most_in_game + "\n"+
        "Most offensive assists in one game: " + data.quickplay.global.offensive_assists_most_in_game + "\n" +
        "Most objective kills in one game: "+data.quickplay.global.objective_kills_most_in_game + "\n"+
        "Most objective time in one game: "+data.quickplay.global. objective_time_most_in_game + "\n"+
        "Multikill Best: "+data.quickplay.global.multikill_best + "\n"+
        "Most solo kills in one game: "+data.quickplay.global.solo_kills_most_in_game + "\n"+
        "Most time spent on fire in one game: "+data.quickplay.global.time_spent_on_fire_most_in_game + "\n"+
        "Most final blows (melee) in one game: "+data.quickplay.global.melee_final_blows_most_in_game + "\n"},
       {"name": "Quick Play (2)",
        "value": 
        "Most shield generators destroyed in one game: "+data.quickplay.global.shield_generator_destroyed_most_in_game + "\n"+
        "Most turrets destroyed in one game: "+data.quickplay.global.turrets_destroyed_most_in_game + "\n"+
        "Most enviromental kills in one game: "+data.quickplay.global.environmental_kills_most_in_game + "\n"+
        "Most teleporter pads destroyed in one game: "+data.quickplay.global.teleporter_pad_destroyed_most_in_game + "\n"+
        "Best kill streak: "+data.quickplay.global.kill_streak_best + "\n"+
        "Most hero damge done in one game: "+data.quickplay.global.hero_damage_done_most_in_game + "\n"+
        "Most barrier damage done in one game: "+data.quickplay.global.barrier_damage_done_most_in_game + "\n"+
        "Most recon assists done in one game: "+data.quickplay.global.recon_assists_most_in_game + "\n"+
        "Barrier damage done per 10mins: "+data.quickplay.global.barrier_damage_done_avg_per_10_min + "\n"+
        "Deaths per 10 mins: "+data.quickplay.global.deaths_avg_per_10_min + "\n"+
        "Hero damage done per 10mins: "+data.quickplay.global.hero_damage_done_avg_per_10_min + "\n"+
        "Time spent on fire per 10mins: "+data.quickplay.global.time_spent_on_fire_avg_per_10_min + "\n"+
        "Solo kills average per 10mins: "+data.quickplay.global.solo_kills_avg_per_10_min+ "\n"+
        "Objective time per 10mins: "+data.quickplay.global.objective_time_avg_per_10_min + "\n"+
        "Objective kills per 10mins: "+data.quickplay.global.objective_kills_avg_per_10_min + "\n"+
        "Healing done per 10mins: "+data.quickplay.global.healing_done_avg_per_10_min + "\n"+
        "Final blows done per 10mins: "+data.quickplay.global.final_blows_avg_per_10_min + "\n"+
        "Eliminations done per 10mins: "+data.quickplay.global.eliminations_avg_per_10_min + "\n"+
         "Cards: "+data.quickplay.global.cards + "\n"+
        "Medals: "+data.quickplay.global.medals + "\n"+
         "Gold Medals: "+data.quickplay.global.medals_gold + "\n"+
        "Silver Medals: "+data.quickplay.global.medals_silver + "\n"+
         "Bronze Medals: "+data.quickplay.global.medals_bronze + "\n"+
        "Amount of time played in QP: "+data.quickplay.global.time_played + "\n"+
         "Games Won: "+data.quickplay.global.games_won + "\n"+
         "Amount of shield generators destroyed: "+data.quickplay.global.shield_generators_destroyed + "\n"+
         "Amount of damage Done: "+data.quickplay.global.damage_done + "\n"+
         "Amount of turrets destroyed: "+data.quickplay.global.turrets_destroyed + "\n"
        }
    ]
  }
});
         
        });      
        
break;
        
        
         case "owcomp":
        var owUsername=args[1].replace('#','-');
   
        
        
        
       
        owjs.getOverall(args[3], args[2], owUsername).then(function(data){
   
          console.log(data);
          message.channel.send({
  "embed": {
    "title": data.profile.nick,
    "description": "Here is all your stats (Comp):",
    "url": data.profile.url,
    "color": 13246671,
    "thumbnail": {
      "url": data.profile.avatar
    },
    
    "author": {
      "name": args[1],
      "url": data.profile.url,
      "icon_url": data.profile.avatar
    },
    "fields": [
      {
        "name": "Competitive Stats (1)",
        "value": 
        "all_damage_done_avg_per_10_min: "+data.competitive.global.all_damage_done_avg_per_10_min + "\n"+
        "masteringHeroe: "+data.competitive.global.masteringHeroe + "\n"+
        "barrier_damage_done: "+data.competitive.global.barrier_damage_done+ "\n"+
        "melee_final_blows "+data.competitive.global.melee_final_blows + "\n"+
        "deaths: "+data.competitive.global.deaths + "\n"+
        "hero_damage_done: "+data.competitive.global.hero_damage_done + "\n"+
        "time_spent_on_fire: "+data.competitive.global.time_spent_on_fire + "\n"+
        "solo_kills: "+data.competitive.global.solo_kills + "\n"+
        "objective_time: "+data.competitive.global.objective_time + "\n"+
        "objective_kills: "+data.competitive.global.objective_kills + "\n"+
        "final_blows: "+data.competitive.global.final_blows + "\n"+
        "eliminations: "+data.competitive.global.eliminations + "\n"+
        "all_damage_done: "+data.competitive.global.all_damage_done + "\n"+
        "multikills: "+data.competitive.global.multikills + "\n"+
        "healing_done: "+data.competitive.global.healing_done + "\n"+
        "defensive_assists: "+data.competitive.global.defensive_assists + "\n"+
        "eliminations_most_in_game: "+data.competitive.global.eliminations_most_in_game + "\n"+
        "final_blows_most_in_game: "+data.competitive.global.final_blows_most_in_game + "\n"+
        "all_damage_done_most_in_game: "+data.competitive.global.all_damage_done_most_in_game + "\n"+
        "healing_done_most_in_game: "+data.competitive.global.healing_done_most_in_game+ "\n"+
        "defensive_assists_most_in_game: "+data.competitive.global.defensive_assists_most_in_game + "\n"+
        "objective_kills_most_in_game: "+data.competitive.global.objective_kills_most_in_game + "\n"+
        "objective_time_most_in_game: "+data.competitive.global.objective_time_most_in_game + "\n"+
        "multikill_best: "+data.competitive.global.multikill_best+ "\n"+
        "solo_kills_most_in_game: "+data.competitive.global.solo_kills_most_in_game + "\n"+
        "time_spent_on_fire_most_in_game: "+data.competitive.global.time_spent_on_fire_most_in_game + "\n"+
        "melee_final_blows_most_in_game: "+data.competitive.global.melee_final_blows_most_in_game + "\n"},
      {"name": "Competitive Stats (2)",
        "value": 
        "kill_streak_best: "+data.competitive.global.kill_streak_best + "\n"+
        "hero_damage_done_most_in_game: "+data.competitive.global.hero_damage_done_most_in_game + "\n"+
         " barrier_damage_done_most_in_game: "+data.competitive.global.barrier_damage_done_most_in_game + "\n"+
        "barrier_damage_done_avg_per_10_min: "+data.competitive.global.barrier_damage_done_avg_per_10_min + "\n"+
         "deaths_avg_per_10_min: "+data.competitive.global.deaths_avg_per_10_min + "\n"+
        "hero_damage_done_avg_per_10_min: "+data.competitive.global.hero_damage_done_avg_per_10_min + "\n"+
         "time_spent_on_fire_avg_per_10_min: "+data.competitive.global.time_spent_on_fire_avg_per_10_min + "\n"+
        "solo_kills_avg_per_10_min: "+data.competitive.global.solo_kills_avg_per_10_min + "\n"+
         "objective_time_avg_per_10_min: "+data.competitive.global.objective_time_avg_per_10_min + "\n"+
        "objective_kills_avg_per_10_min: "+data.competitive.global.objective_kills_avg_per_10_min + "\n"+
        "healing_done_avg_per_10_min: "+data.competitive.global.healing_done_avg_per_10_min + "\n"+
        "final_blows_avg_per_10_min: "+data.competitive.global.final_blows_avg_per_10_min + "\n"+
        "eliminations_avg_per_10_min: "+data.competitive.global.eliminations_avg_per_10_min + "\n"+
        "card: "+data.competitive.global.card + "\n"+
        "medals: "+data.competitive.global.medals + "\n"+
        "medals_gold: "+data.competitive.global.medals_gold + "\n"+
         "medals_silver: "+data.competitive.global.medals_silver + "\n"+
        "medals_bronze: "+data.competitive.global.medals_bronze + "\n"+
         "time_played: "+data.competitive.global.time_played + "\n"+
        "games_played: "+data.competitive.global.games_played + "\n"+
         "games_won: "+data.competitive.global.games_won + "\n"+
        "games_lost: "+data.competitive.global.games_lost + "\n"+
         "damage_done: "+data.competitive.global.damage_done + "\n"
        
     
      }
    ]
  }
});
         
        });      
        
break;
        
      case "ow":
        var owUsername=args[1].replace('#','-');
   
        
        
        
       
        owjs.getOverall(args[3], args[2], owUsername).then(function(data){
   
          console.log(data);
          message.channel.send({
  "embed": {
    "title": data.profile.nick,
    "description": "Here is all your stats (Both QP and Comp):",
    "url": data.profile.url,
    "color": 13246671,
    "thumbnail": {
      "url": data.profile.avatar
    },
    
    "author": {
      "name": args[1],
      "url": data.profile.url,
      "icon_url": data.profile.avatar
    },
    "fields": [
      {
        "name": "Account Stats",
        "value": "Level: "+data.profile.level + "\n"+"Rank: "+data.profile.rank + "\n" +"Ranking: "+data.profile.ranking,
        "inline": true
      },
      {
        "name": "Numbers",
        "value": "Eliminations: "+(data.competitive.global.eliminations+data.quickplay.global.eliminations)+ "\n"+"Final Blows: "+(data.competitive.global.final_blows+data.quickplay.global.final_blows)+ "\n" +"Deaths: "+(data.competitive.global.deaths+data.quickplay.global.deaths)+"\n"+"Kill/Death Ratio: "+((data.competitive.global.final_blows+data.quickplay.global.final_blows)/(data.competitive.global.deaths+data.quickplay.global.deaths))+ "\n"+"Damage Done: "+(data.competitive.global.all_damage_done+data.quickplay.global.all_damage_done)+ "\n"+"Healing Done: "+(data.competitive.global.healing_done+data.quickplay.global.healing_done),
        "inline": true
      },
      {
        "name": "Medals",
        "value": "Gold: "+(data.competitive.global.medals_gold+data.quickplay.global.medals_gold)+ "\n"+"Silver: "+(data.competitive.global.medals_silver+data.quickplay.global.medals_silver)+ "\n" +"Bronze: "+(data.competitive.global.medals_bronze+data.quickplay.global.medals_bronze),
        "inline": true
      }
    ]
  }
});
         
        });      
        
break;
        case "img":

            message.channel.startTyping();
            if (!args[1]) {
                message.channel.send("no search term? wow, you must be feeling lucky");
                message.channel.stopTyping();
                return;
            }
            const client = new GoogleImages(process.env.CSEID, process.env.youtubeapi);
            args.shift();
            var searchTerm = args.join(" ");

            client.search(searchTerm)
                .then(function (images) {
                    var randomOne = Math.floor(Math.random() * images.length);
                    const embed = {
                        "title": "Images()",
                        "color": 9442302,
                        "footer": {
                            "text": images[randomOne].type
                        },
                        "image": {
                            "url": images[randomOne].url
                        },
                    };
                    message.channel.send({
                        embed
                    });
                }).catch(function (err) {

                    message.channel.send("shit got fucked up (your search term was shit)");
                });
         
            message.channel.stopTyping();
break;


        case "revokewarn":


            if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name))) {
                message.channel.send("To quote Hamlet, Act III, Scene III, Line 87, 'No'.");
                return;
            }

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
                } //now it an object
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

            if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name))) {
                message.channel.send("To quote Hamlet, Act III, Scene III, Line 87, 'No'.");
                return;
            }

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
                }]
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

            if (!message.member.voiceChannel) {
                message.channel.sendMessage("***Get in a voice channel first, cunt.***")
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
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

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;

    }
})

//bot.login('no');

bot.login(process.env.TOKEN);
