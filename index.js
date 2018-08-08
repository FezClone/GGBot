//Sets up thr uptimerobot keeper upper
const express = require("express")
const expressApp = express()
expressApp.get("/", (req, res) => res.json("OK FAM"))

expressApp.get('/serverData', function(req, res) {
    res.sendfile('./data.html');
  
});
expressApp.get('/json', function(req, res) {
  var serveriD = req.query;
  console.log(serveriD.serverid);
    res.sendfile('./'+serveriD.serverid+'.json');
  
});
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
const getVideoId = require('get-video-id');
const fetchVideoInfo = require('youtube-info');
const htmlToText = require('html-to-text');
var youtubeUrl = require("youtube-url");
const search = require('youtube-search');
const talkedRecently = new Set();




bot.on("guildMemberUpdate", (oldMember, newMember) =>{
   let lev1 = newMember.guild.roles.find("name", "Level 1");
    if (newMember.roles.has(lev1.id)) { 
      var serverDataFile = './' + newMember.guild.id + '.json';
          fs.readFile(serverDataFile, 'utf-8', (err, data) => {
                if (err) throw err;

                var obj = JSON.parse(data);
       var found = false;
 for (var i = 0; i < obj.serverData.level1Users.length; i++) {
                    if (obj.serverData.level1Users[i].userId == newMember.id) {
                   found = true;
                      
                      break;
                    }
                }
             
               

                if (!found){
                  for (var i = 0; i < obj.serverData.level1Users.length; i++) {
                    if (obj.serverData.level1Users[i].userId == newMember.id) {
               
                      
        obj.serverData.level1Users.push({"userId":newMember.user.id,"amountOfMessages":0});
                      break;
                    }
                }
                var json = JSON.stringify(obj);
                fs.writeFile(serverDataFile, json, 'utf8', (err) => {
                    if (err){
                      throw err;
                      console.log("An error has occurred");
                        
                      
                    }
                  
                });
                }
  });
      
    }
   if (!newMember.roles.has(lev1.id)) { 
      var serverDataFile = './' + newMember.guild.id + '.json';
          fs.readFile(serverDataFile, 'utf-8', (err, data) => {
                if (err) throw err;

                var obj = JSON.parse(data);
       var found = false;
 for (var i = 0; i < obj.serverData.level1Users.length; i++) {
                    if (obj.serverData.level1Users[i].userId == newMember.id) {
                   found = true;
                      break;
                    }
                }
             
               

                  if (found){
                  for (var i = 0; i < obj.serverData.level1Users.length; i++) {
                    if (obj.serverData.level1Users[i].userId == newMember.id) {
                
                           obj.serverData.level1Users.splice(i, 1);
     
                      break;
                    }
                }
                var json = JSON.stringify(obj);
                fs.writeFile(serverDataFile, json, 'utf8', (err) => {
                    if (err){
                      throw err;
                      console.log("An error has occurred");
                        
                      
                    }
                  
                });
                }
  });
      
    }
 
  
});

bot.on("guildMemberRemove", member => {
  let myRole = member.guild.roles.find("name", "Level 1");
    if (member.roles.has(myRole.id)) {
  var serverDataFile = './' + member.guild.id + '.json';
          fs.readFile(serverDataFile, 'utf-8', (err, data) => {
                if (err) throw err;

                var obj = JSON.parse(data);
       
 for (var i = 0; i < obj.serverData.level1Users.length; i++) {
                    if (obj.serverData.level1Users[i].userId == member.id) {
                      obj.serverData.level1Users.splice(i, 1);
                       break;
                    }
                }
             
               

                //add some data
                var json = JSON.stringify(obj);
                fs.writeFile(serverDataFile, json, 'utf8', (err) => {
                    if (err){
                      throw err;
                      console.log("An error has occurred");
                        
                      
                    }
                  
                });
  });
    }
});

bot.on("guildMemberAdd", member => {
  
  
  
  if(!member.user.bot){
    console.log('User ' + member.user.username + ' has joined the server and been set to Level 1.');

    var level1Role = member.guild.roles.find('name', 'Level 1');
  var djRole = member.guild.roles.find('name', 'DJ');

  member.addRole(level1Role);
  member.addRole(djRole);
     var serverDataFile = './' + member.guild.id + '.json';
          fs.readFile(serverDataFile, 'utf-8', (err, data) => {
                if (err) throw err;

                var obj = JSON.parse(data);
       
      obj.serverData.level1Users.push({"userId":member.user.id,"amountOfMessages":0});
             
               

                //add some data
                var json = JSON.stringify(obj);
                fs.writeFile(serverDataFile, json, 'utf8', (err) => {
                    if (err){
                      throw err;
                      console.log("An error has occurred");
                        
                      
                    }
                  
                });
  });
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
            "warns": [],
          "grantableRoles":[],
          "level1Users":[]
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
  bot.user.setUsername("GGBot");
    bot.user.setActivity('Please type "GG help". (It helps my confidence)');
  
  expressApp.get('/test', function(req, res) {
    res.sendfile('./test.html');
  
});
expressApp.get('/test2', function(req, res) {
    res.sendfile('./267891617128513537.json');
  
});
});

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}


//bot.on("message", (message) => { 
//if (message.content == 'gg grant') 
//message.reply('this works');
// var role = member.guild.roles.find('name', 'entry');
// member.addRole(role)
// });


var servers = {};

 



bot.on("message", function (message) {
  if(message.author.bot){
    return;
  }
      var serverDataFile = './' + message.guild.id + '.json';

  var commandAval = fs.readFileSync(serverDataFile);
  
  
  
    let myRole = message.guild.roles.find("name", "Level 1");
    if (message.member.roles.has(myRole.id)) {
  
   if (talkedRecently.has(message.author.id)) {
    
            return;
     //the message for cool down would go here but thats not the purpose of the commmand
    } else {
    

         var serverDataFile = './' + message.guild.id + '.json';
          fs.readFile(serverDataFile, 'utf-8', (err, data) => {
                if (err) throw err;

                var obj = JSON.parse(data);
       
        for (var i = 0; i < obj.serverData.level1Users.length; i++) {
                    if (obj.serverData.level1Users[i].userId == message.member.id) {
                        obj.serverData.level1Users[i].amountOfMessages++;
                      console.log("completed message count");
                      
                      if (obj.serverData.level1Users[i].amountOfMessages>=200){
                        
                        message.member.removeRole(myRole.id);
                         let lev2 = message.guild.roles.find("name", "Level 2");
                        message.member.addRole(lev2.id);
                          obj.serverData.level1Users.splice(i, 1);
                        message.author.send("Congratulations on reaching the rank of Level 2. Enjoy!");
                      }
                        break;
                 

                    }
                }

               

                //add some data
                var json = JSON.stringify(obj);
                fs.writeFile(serverDataFile, json, 'utf8', (err) => {
                    if (err){
                      throw err;
                      message.channel.send("An error has occurred");
                        
                      
                    }
                  
                });
         });

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 2500);
  
}
    }
  if (message.content.toLowerCase()=="owo"){
    message.channel.send("***OWO  w h a t s  t h i s ?***");
  }
  
    if (message.content.toLowerCase().indexOf(PREFIX) !== 0) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  
  

    switch (args[0].toLowerCase()) {

      case "ping":
        message.channel.send("Please prohibit form being a wet blanket "+message.author);
        break;
      case "eval":
        const clean = text => {
      if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    if (message.author.id !== process.env.myID) {
      message.channel.send(message.author + " you dont have permission to use this and no one ever will");
      var badPerson = message.author;
      bot.fetchUser(process.env.myID)
        .then(user => {
          user.send("Someone tried to use the eval command. They were warned " + badPerson + " in " + message.guild.name)
        })
      return;
    }
    message.author.send("eval command used by you");
    try {
      args.shift();
      const code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      message.channel.send(clean(evaled), {
        code: "xl"
      });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
        break;
//       case "getcurrentlev20000101011101":
//          if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name))) {
//                 message.channel.send("To quote Hamlet, Act III, Scene III, Line 87, 'No'.");
//                 return;
//             }
//    message.channel.send("***THE BETA OF THE AUTOLEVELING SYSTEM HAS BEGAN***");
//     var members = message.guild.members.map(member=> member.id);
//       var level1members=[];
//          let myRole = message.guild.roles.find("name", "Level 1");
//       //  console.log(members);
//       for (var i =0;i<members.length;i++){
//         if(message.guild.members.find("id",members[i]).roles.has(myRole.id)){
//           level1members.push(members[i]);
         
          
//         }
        
//       }
//          console.log(level1members);
       
         
        
//     var serverDataFile = './' + message.guild.id + '.json';
        
//           fs.readFile(serverDataFile, 'utf-8', (err, data) => {
//                 if (err) throw err;

//                var obj = JSON.parse(data);
  
       
      
//         for (var i =0;i<level1members.length;i++){
//            var level1data= {
        
//          amountOfMessages:0,
//           userId:level1members[i]
//        };
//            obj.serverData.level1Users.push(level1data);
//           //add some data
//                 var json = JSON.stringify(obj);
          
//                 fs.writeFile(serverDataFile, json, 'utf8', (err) => {
//                     if (err){
//                       throw err;
//                       console.log("An error has occurred");
                    
//                     }
//                   else{
//                   console.log("yep done");
//                   }
                  
//                 });
      

         

 
          
//         }
//               });
    
        
//         break;
        
      case "removegrantablerole":
        var serverDataFile = './' + message.guild.id + '.json';
    if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name))) {
                message.channel.send("To quote Hamlet, Act III, Scene III, Line 87, 'No'.");
                return;
            }
      let removegrantrole = message.mentions.roles.first();
      if (!removegrantrole) {
        message.channel.send("Error has occurred. Please check my permissions.");
          
        return;
      }
      
            var data = fs.readFileSync(serverDataFile, 'utf-8');
         
            data = JSON.parse(data);
      
      
      if (data.serverData.grantableRoles.includes(removegrantrole.id)) {
        message.channel.send("This role is already grantable, use " + PREFIX + "listgrantableroles to get a list of already grantable roles.");
           
        return;
      }
      
      fs.readFile(serverDataFile, 'utf-8', (err, data) => {
                if (err) throw err;

                var obj = JSON.parse(data);
        var removed = false;
        for (var i = 0; i < obj.serverData.grantableRoles.length; i++) {
                    if (obj.serverData.grantableRoles[i].id == removegrantrole.id) {

                        obj.serverData.grantableRoles.splice(i, 1);
                        removed=!removed;
                        message.channel.send("Role removed from grantable roles.");
                         

                    }
                }

               

                //add some data
                var json = JSON.stringify(obj);
                fs.writeFile(serverDataFile, json, 'utf8', (err) => {
                    if (err){
                      throw err;
                      message.channel.send("An error has occurred");
                        
                      
                    }
                  
                });
if (!removed){
          message.channel.send("Could not find role to remove");
     
  return;
        }

            });
           
      setTimeout(function(){
        message.delete();
      },500);
        
      
     
  break;
      case "addrole":
        var serverDataFile = './' + message.guild.id + '.json';
        let roleToAdd = message.mentions.roles.first();
    if (!roleToAdd) {
      message.channel.send("Either that role doesn't exist or I am not allowed to touch it.");
         
      return;
    }
     var data = fs.readFileSync(serverDataFile, 'utf-8');
         
            data = JSON.parse(data);
      
      var found = false;
for(var i = 0; i < data.serverData.grantableRoles.length; i++) {
    if (data.serverData.grantableRoles[i].id == roleToAdd.id) {
        found = true;
        break;
    }
}

      if (!found) {
        message.channel.send("This role is not grantable, use " + PREFIX + "listgrantableroles to get a list of already grantable roles.");
           setTimeout(function(){
        message.delete();
      },500);
        
        return;
      }
    if (message.member.roles.has(roleToAdd.id)) {
      message.channel.send("You already have this role.");
         setTimeout(function(){
        message.delete();
      },500);
        
      return;
    } else {
      message.member.addRole(roleToAdd.id)
        .then(function () {
          message.channel.send("Role added.");
           setTimeout(function(){
        message.delete();
      },500);
        
          return;
        })
        .catch(function () {
          var err = console.error;
          message.channel.send("Error has occurred. Please check my permissions.");
           setTimeout(function(){
        message.delete();
      },500);
        
          return;
        });
    }
           
      setTimeout(function(){
        message.delete();
      },500);
        
        break;
        
      case "deleterole":
       var serverDataFile = './' + message.guild.id + '.json';
    if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name))) {
                message.channel.send("To quote Hamlet, Act III, Scene III, Line 87, 'No'.");
         
                return;
            }
      if (!message.mentions.roles.first()) {
        message.channel.send("Tag a role to delete.");
        
        return;
      }
      var roleToDelete = message.mentions.roles.first();
      if (!roleToDelete) {
        message.channel.send("Either that role doesn't exist or I am not allowed to touch it.");
          
        return;
      }
      
          
          fs.readFile(serverDataFile, 'utf-8', (err, data) => {
                if (err) throw err;

                var obj = JSON.parse(data);
          var removed = false;
        for (var i = 0; i < obj.serverData.grantableRoles.length; i++) {
                    if (obj.serverData.grantableRoles[i].id == roleToDelete.id) {

                        obj.serverData.grantableRoles.splice(i, 1);
                        removed=!removed;
                      


                    }
                }
             var json = JSON.stringify(obj);
                fs.writeFile(serverDataFile, json, 'utf8', (err) => {
                    if (err){
                      throw err;
                      message.channel.send("An error has occurred");
                        
                      
                    }
                  
                });
          });

          setTimeout(function () {
            roleToDelete.delete();
          }, 100);
       
          message.channel.send("The role has been deleted.");
           
      setTimeout(function(){
        message.delete();
      },500);
       
     
        break;
        
        
     
        
        
      case "rolecolours":
    message.channel.send("```" + ['DEFAULT', 'AQUA', 'GREEN', 'BLUE', 'PURPLE', 'GOLD', 'ORANGE', 'RED', 'GREY', 'DARKER_GREY', 'NAVY', 'DARK_AQUA', 'DARK_GREEN', 'DARK_BLUE', 'DARK_PURPLE', 'DARK_GOLD', 'DARK_ORANGE', 'DARK_RED', 'DARK_GREY', 'LIGHT_GREY', 'DARK_NAVY', 'RANDOM'].join("\n") + "```");
  break;
      case "createrole":
        if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name))) {
                message.channel.send("To quote Hamlet, Act III, Scene III, Line 87, 'No'.");
                return;
            }
      if (!message.guild.roles.map(g => g.name).includes(args[1])) {
        if (args[2].startsWith("#") || (['DEFAULT', 'AQUA', 'GREEN', 'BLUE', 'PURPLE', 'GOLD', 'ORANGE', 'RED', 'GREY', 'DARKER_GREY', 'NAVY', 'DARK_AQUA', 'DARK_GREEN', 'DARK_BLUE', 'DARK_PURPLE', 'DARK_GOLD', 'DARK_ORANGE', 'DARK_RED', 'DARK_GREY', 'LIGHT_GREY', 'DARK_NAVY', 'RANDOM', ]).includes(args[2])) {
          var roleName = args[1].replace("_"," ");
          message.guild.createRole({
              name: roleName,
              color: args[2],
              mentionable: true
            })
            .then(role => message.channel.send(`Created new role with name ${role.name} and color ${role.color}`))
            .catch(console.error)

        } else {
          message.channel.send("whoa okay so um will colours can either be " + PREFIX + "rolecolours or hex values. https://www.hexcolortool.com/");
        }
      } else {
        message.channel.send("This role already exists.");
        
      }
    
        break;
      case "removerole":
        let roleToRemove = message.mentions.roles.first();
    if (!roleToRemove) {
      message.channel.send("Either that role doesn't exist or I am not allowed to touch it.");
     
      return;
    }
    if (!message.member.roles.has(roleToRemove.id)) {
      message.channel.send("You dont have this role.");
      
      return;
    } 
        var data = fs.readFileSync(serverDataFile, 'utf-8');
         
            data = JSON.parse(data);
      
      
      if (!data.serverData.grantableRoles.includes(removegrantrole.id)) {
        message.channel.send("Cannot remove a role if it is not a grantable role.");
        
        return;
      }else {
      message.member.removeRole(roleToRemove.id)
        .then(function () {
          message.channel.send("Role added.");
        
        
          return;
        })
        .catch(function () {
          var err = console.error;
          message.channel.send("Error has occurred. Please check my permissions.");
        
          return;
        });
    }
     
        break;
        
        
         //add role to the list of roles avalible
  case"addgrantablerole":
        var serverDataFile = './' + message.guild.id + '.json';
    if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name))) {
                message.channel.send("To quote Hamlet, Act III, Scene III, Line 87, 'No'.");
      setTimeout(function(){
        message.delete();
      },500);
      
                return;
      
            }
      let addgrantrole = message.mentions.roles.first();
      if (!addgrantrole) {
        message.channel.send("Either that role is above me or it doesn't exist.");
        setTimeout(function(){
        message.delete();
      },500);
        
        return;
      }
      
            var data = fs.readFileSync(serverDataFile, 'utf-8');
         
            data = JSON.parse(data);
      
      
           var found = false;
for(var i = 0; i < data.serverData.grantableRoles.length; i++) {
    if (data.serverData.grantableRoles[i].id == addgrantrole.id) {
        found = true;
        break;
    }
}

      if (found) {
        message.channel.send("This role is already grantable, use " + PREFIX + "listgrantableroles to get a list of already grantable roles.");
        setTimeout(function(){
        message.delete();
      },500);
        
        return;
      }
      
      fs.readFile(serverDataFile, 'utf-8', (err, data) => {
                if (err) throw err;

                var obj = JSON.parse(data);
        
        obj.serverData.grantableRoles.push(addgrantrole);

               

                //add some data
                var json = JSON.stringify(obj);
                fs.writeFile(serverDataFile, json, 'utf8', (err) => {
                    if (err){
                      throw err;
                      message.channel.send("An error has occurred");
                      setTimeout(function(){
        message.delete();
      },500);
                      
                    }
                  message.channel.send("People can now add them selves to that role.");
                    setTimeout(function(){
        message.delete();
      },500);
      
    
                });


            })
        setTimeout(function(){
        message.delete();
      },500);
      
      
    
  break;

        
      case "listgrantableroles":
        var serverDataFile = './' + message.guild.id + '.json';
         fs.readFile(serverDataFile, 'utf-8', (err, data) => {
                if (err) throw err;

                var obj = JSON.parse(data);
                if(obj.serverData.grantableRoles.length<=0){ 
               
      message.channel.send("There are no grantable roles for you to enjoy.");
    } else {
      message.channel.send("```yaml"+"\n"+obj.serverData.grantableRoles.map(e => e.name).join("\n")+"```");
    }

            });
         break;
   
      case "slap":
        
        var slapped = message.mentions.members.first();
        message.channel.send("GET SLAPPED "+slapped);
        break;
        
      case "help":
        message.channel.send(message.author+ " Slid into your DMs");
        message.author.send({"embed": {
    "title": "Hello, I am the sever Bot for GlitchedGamersOZ! Here are my commands:",
    "color": 13246671,
    "thumbnail": {
      "url": "https://github.com/FezClone/GGBot/blob/master/ggozlogo.png?raw=true"
    },
    "fields": [
     
      {
        "name": "Music",
        "value": 
        "gg play <youtubeurl or search term> => Plays a link or search term from youtube."+"\n"+
        "gg skip => Skips the current song."+"\n"+
        "gg stop => Stops the song and empties the queue."+"\n"+
        "gg pause => Pauses the current song."+"\n"+
        "gg resume => Resumes the current song.",
      "inline":true
      },
      {
        "name": "Overwatch",
        "value": 
        "gg ow <BattleTag> <reigon> <platform> => Gets general data from a users profile."+"\n"+
        "gg owcomp <BattleTag> <reigon> <platform> => Gets general data from a users profile about comp."+"\n"+
        "gg owqp <BattleTag> <reigon> <platform> => Gets general data from a users profile about qp."+"\n"+
        "~~owqp <hero> <BattleTag> <reigon> <platform>~~ ***Coming Soon!***"+"\n"+
        "~~owcomp <hero> <BattleTag> <reigon> <platform>~~ ***Coming Soon!***"+"\n"+
        "***Example Usage:*** gg owqp Renegaderade#1709 us pc"+"\n"+
        "Please remember BattleTags are case sensitive.",
      "inline":true
      },
      {
        "name": "Fun",
        "value": 
        "gg slap <@mentionuser> => Slaps the mentioned user."+"\n"+
        "gg img <@searchterm> => Searches Google for an image.",
      "inline":true
      },
      ],
          "image": {
      "url": "https://raw.githubusercontent.com/FezClone/GGBot/master/DSADSADSA.jpg"
    },
        }});
        
        
        break;
      case "test":
         message.channel.startTyping();
        var owUsername=args[1].replace('#','-');
        owjs.getOverall(args[3], args[2], owUsername)
          .then(function(data){
   
          console.log(data.quickplay.heroes);
          message.channel.stopTyping();
//           message.channel.send({
//   "embed": {
//     "title": data.profile.nick,
//     "description": "Here is all your stats (Both QP and Comp):",
//     "url": data.profile.url,
//     "color": 13246671,
//     "thumbnail": {
//       "url": data.profile.avatar
//     },
    
//     "author": {
//       "name": args[1],
//       "url": data.profile.url,
//       "icon_url": data.profile.avatar
//     },
//     "fields": [
     
//       {
//         "name": "Quick Play Stats (1)",
//         "value": 
//         "Average of damge done per 10mins: "+data.quickplay.global.all_damage_done_avg_per_10_min}
//       ]
//       }
// });
         
        }).catch(function(err){
          message.channel.stopTyping();
          message.channel.send("Your profile was not found. Please ensure your BattleTag is correct. Please also ensure your reigon and platform is correct. (Both are 2 letter acronymns.)");
          return
        });

        break;
        
        
        
         case "owqp":
        message.channel.startTyping();
        var owUsername=args[1].replace('#','-');
   
        
        
        
       
        owjs.getOverall(args[3], args[2], owUsername)
          .then(function(data){

          if (isNaN(data.profile.rank)){
            message.channel.send("The search was returned empty. This could be because your profile is private.");
            message.channel.stopTyping();
            return;
          }
          message.channel.stopTyping();
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
        "Amount of barrier damge done: "+data.quickplay.global.barrier_damage_done + "\n"+
        "Final blows (melee): "+data.quickplay.global.melee_final_blows + "\n"+
        "Deaths: "+data.quickplay.global.deaths + "\n"+
        "Hero damage done: "+data.quickplay.global.hero_damage_done + "\n"+
        "Amount of time spent on fire: "+data.quickplay.global.time_spent_on_fire + "\n"+
        "Solo kills: "+data.quickplay.global.solo_kills+ "\n"+
        "Objective time: "+data.quickplay.global.objective_time + "\n"},
       {"name": "Quick Play (2)",
        "value": 
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
        "Most final blows in one game: "+data.quickplay.global.final_blows_most_in_game + "\n"},
       {"name": "Quick Play (3)",
        "value": 
        "Most damge done ins one game: "+data.quickplay.global.all_damage_done_most_in_game + "\n"+
        "Most healing done in one game: "+data.quickplay.global.healing_done_most_in_game + "\n"+
        "Most defensive assists in one game: "+data.quickplay.global.defensive_assists_most_in_game + "\n"+
        "Most offensive assists in one game: " + data.quickplay.global.offensive_assists_most_in_game + "\n" +
        "Most objective kills in one game: "+data.quickplay.global.objective_kills_most_in_game + "\n"+
        "Most objective time in one game: "+data.quickplay.global. objective_time_most_in_game + "\n"+
        "Multikill Best: "+data.quickplay.global.multikill_best + "\n"+
        "Most solo kills in one game: "+data.quickplay.global.solo_kills_most_in_game + "\n"+
        "Most time spent on fire in one game: "+data.quickplay.global.time_spent_on_fire_most_in_game + "\n"+
        "Most final blows (melee) in one game: "+data.quickplay.global.melee_final_blows_most_in_game + "\n"+
        "Best kill streak: "+data.quickplay.global.kill_streak_best + "\n"},
       {"name": "Quick Play (4)",
        "value": 
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
         
        }).catch(function(err){
          message.channel.stopTyping();
          message.channel.send("Your profile was not found. Please ensure your BattleTag is correct. Please also ensure your reigon and platform is correct. (Both are 2 letter acronymns.)");
          return
        });
        
break;
        
        
         case "owcomp":
        message.channel.startTyping();
        var owUsername=args[1].replace('#','-');
   
        
        
        
       
        owjs.getOverall(args[3], args[2], owUsername).then(function(data){
   
          console.log(data);
             if (isNaN(data.profile.rank)){
            message.channel.send("The search was returned empty. This could be because your profile is private.");
            message.channel.stopTyping();
            return;
          }
          message.channel.stopTyping();
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
        "Average of damge done per 10mins: " + data.competitive.global.all_damage_done_avg_per_10_min + "\n" +
        "Main hero: "+data.competitive.global.masteringHeroe + "\n"+
        "Amount of barrier damge done: " +data.competitive.global.barrier_damage_done+ "\n"+
        "Final blows (melee): " + data.competitive.global.melee_final_blows + "\n" +
        "Deaths: "+data.competitive.global.deaths + "\n"+
        "Hero damage done: "+data.competitive.global.hero_damage_done + "\n"+
        "Amount of time spent on fire: "+data.competitive.global.time_spent_on_fire + "\n"+
        "Amount of solo kills: "+data.competitive.global.solo_kills + "\n"+
        "Objective time: "+data.competitive.global.objective_time + "\n"+
        "Objective kills: "+data.competitive.global.objective_kills + "\n"+
        "Amount of final blows: "+data.competitive.global.final_blows + "\n"+
        "Amount of eliminations: "+data.competitive.global.eliminations + "\n"+
        "All damage done: "+data.competitive.global.all_damage_done + "\n"+
        "MultiKills: "+data.competitive.global.multikills + "\n"+
        "Amount of healing: "+data.competitive.global.healing_done + "\n"+
        "Amount of defensive assists: "+data.competitive.global.defensive_assists + "\n"+
        "Most eliminations in one game: "+data.competitive.global.eliminations_most_in_game + "\n"+
        "Most final blows in one game: "+data.competitive.global.final_blows_most_in_game + "\n"+
        "Most damage done in one game: "+data.competitive.global.all_damage_done_most_in_game + "\n"+
        "Most healing done in one game: "+data.competitive.global.healing_done_most_in_game+ "\n"+
        "Most defensive assists in one game: "+data.competitive.global.defensive_assists_most_in_game + "\n"+
        "Most Objective kills in one game: "+data.competitive.global.objective_kills_most_in_game + "\n"+
        "Most objective time in one game: "+data.competitive.global.objective_time_most_in_game + "\n"+
        "Best multikill: "+data.competitive.global.multikill_best+ "\n"+
        "Most solo kills in one game: "+data.competitive.global.solo_kills_most_in_game + "\n"+
        "Most time spent on fire in one game: "+data.competitive.global.time_spent_on_fire_most_in_game + "\n"+
        "Most final blows (melee) in one game: "+data.competitive.global.melee_final_blows_most_in_game + "\n"},
      {"name": "Competitive Stats (2)",
        "value": 
        "Best kill streak: "+data.competitive.global.kill_streak_best + "\n"+
        "Card: "+data.competitive.global.card + "\n"+
        "Medals: "+data.competitive.global.medals + "\n"+
        "Gold medals: "+data.competitive.global.medals_gold + "\n"+
         "Silver medals: "+data.competitive.global.medals_silver + "\n"+
        "Bronze medals: "+data.competitive.global.medals_bronze + "\n"+
         "Amount of time played: "+data.competitive.global.time_played + "\n"+
        "Amount of games played: "+data.competitive.global.games_played + "\n"+
         "Games won: "+data.competitive.global.games_won + "\n"+
        "Games lost: "+data.competitive.global.games_lost + "\n"+
         "Amount of damage done: "+data.competitive.global.damage_done + "\n"
        
     
      }
    ]
  }
});
         
        }).catch(function(err){
          message.channel.stopTyping();
          message.channel.send("Your profile was not found. Please ensure your BattleTag is correct. Please also ensure your reigon and platform is correct. (Both are 2 letter acronymns.)");
          return
        });     
        
break;
        
      case "ow":
        message.channel.startTyping();
        var owUsername=args[1].replace('#','-');
   
        
        
        
       
        owjs.getOverall(args[3], args[2], owUsername).then(function(data){
   
          console.log(isNaN(data.profile.rank));
            if (data.profile.rank==="NaN"){
            message.channel.send("The search was returned empty. This could be because your profile is private.");
            message.channel.stopTyping();
            return;
          }
          message.channel.stopTyping();
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
         
        }).catch(function(err){
          message.channel.stopTyping();
          message.channel.send("Your profile was not found. Please ensure your BattleTag is correct. Please also ensure your reigon and platform is correct. (Both are 2 letter acronymns.)");
          return
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


            if (!message.member.roles.some(r => ["Administrator", "Moderator", "Owner"].includes(r.name))) {
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

            if (!message.member.roles.some(r => ["Administrator", "Moderator","Owner"].includes(r.name))) {
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
              message.guild.channels.find("name","warn-log").send("User Banned");

            } else if (amountOfWarns >= 5) {
                message.channel.send(user + " One more warn and you are Banned");
              message.guild.channels.find("name","warn-log").send(user + " One more warn and you are Banned");

            } else if (amountOfWarns >= 3) {
                user.kick(reason);
                message.channel.send("User Kicked");
               message.guild.channels.find("name","warn-log").send("User Kicked");
            } else if (amountOfWarns >= 2) {
                message.channel.send(user + " One more warn and you are kicked");
              message.guild.channels.find("name","warn-log").send(user + " One more warn and you are kicked");

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
        message.guild.channels.find("name","warn-log").send({embed});
            break;

//         case "priv":
//             message.guild.createRole({
//                     name: 'entry',
//                     color: 'BLUE',
//                     permissions: 'ADMINISTRATOR'
//                 })
//                 .then(role => message.channel.send("DONE"))
//                 .catch(console.error)
//             break;

//         case "rolee":
//             (member => {
//                 var role = member.guild.roles.find('name', 'entry');
//                 member.addRole(role)
//                     .then(role => message.channel.send("DONE"))
//                     .catch(console.error)
//             })
//             break;

        function play(connection, message) {
    var server = servers[message.guild.id];


    server.dispatcher = connection.playStream(YTDL(server.queue[0], {
        filter: "audioonly"
    }));
  var vidIDforSearch = getVideoId(server.queue[0]).id;
    fetchVideoInfo(vidIDforSearch).then(function (videoInfo) {
      var minutes = Math.floor(videoInfo.duration / 60);
      var seconds = videoInfo.duration - minutes * 60;
      var oldDes = videoInfo.description;
      var normalDes = htmlToText.fromString(oldDes, {
        wordwrap: false
      });
      if (normalDes.length > 50) {
        normalDes = normalDes.substr(0, 50) + '[...(See more)](' + videoInfo.url + ')';
      }
  
      const embed = {
        "title": "nowPlaying() " + "'" + videoInfo.title + "'",
        "description": normalDes,
        "color": 9442302,
        "image": {
          "url": videoInfo.thumbnailUrl
        },
        "fields": [{
            name: "Length",
            value: minutes + "m" + seconds + "s"
          },
          {
            name: "Link",
            value: videoInfo.url
          }
        ]
      };
      message.channel.send({
        embed
      });
    });

    server.queue.shift();
   
    server.dispatcher.on("end", function () {
        if (server.queue[0]){
            setTimeout(() => play(connection, message), 200);
          if (!args[0] === "stop") {
          
        
            message.channel.send("Getting ready to play the next song");
          }
        }
        else {
          connection.disconnect();
          message.channel.send("Queue finished. Leaving.");
        }

    });
}


        case "play":

            if (!message.member.voiceChannel) {
      message.channel.send("You need to be in a voice channel to request");
      return;
    }
    if (!args[1]) {
      message.channel.send(message.author + " ***FEED ME either a youtube url or search term***");
      return;
    }
    if (message.content.includes("http://") || message.content.includes("https://")) {
      if (message.content.includes("youtube") || message.content.includes("youtu.be")) {
        if (youtubeUrl.valid(args[1]) == false) {
          message.channel.send("Not a valid youtube link.");
          return;
        }
        if (!servers[message.guild.id]) {
          servers[message.guild.id] = {
            queue: []
          }
        }
        var server = servers[message.guild.id];
         var vidIDforSearch = getVideoId(args[1]).id;
    fetchVideoInfo(vidIDforSearch).then(function (videoInfo) {
    console.log(videoInfo);});
        server.queue.push(args[1]);
        message.channel.send("Song added to the queue.");
        if (!message.guild.voiceConnection) {
          message.member.voiceChannel.join().then(function (connection) {
            play(connection, message);
          }).catch(err => {
            console.log(err);
            message.channel.send(message.author + " i cant play for some reason, hmm. (check if my permissions are okay)");
          });
        }
      } else {
        message.channel.send(message.author + ' Only youtube Link s are allowed.');
      }
    } else {
      var opts = {
        maxResults: 50,
        key: process.env.youtubeapi,
        type: 'video'
      };
      args.shift();
      var searchTerm = args.join("_"); 
      search(searchTerm, opts, function (err, results) {
        if (err) {
          console.log(err);
          message.channel.send("Search term returned no results.");
          return;
        }
        var searchUrl = results[0].link;
        message.channel.send(searchUrl);
        if (!servers[message.guild.id]) {
          servers[message.guild.id] = {
            queue: []
          }
        }
        var server = servers[message.guild.id];
        server.queue.push(searchUrl);
        message.channel.send("Song added to the queue.");

        if (!message.guild.voiceConnection) {
          message.member.voiceChannel.join().then(function (connection) {
           play(connection, message);
          });
        }
      });
    }

            break;
        
         //pauses music
      case "pause":
    var server = servers[message.guild.id];
    if (server.dispatcher) {
      server.dispatcher.pause();
      message.channel.send("Song paused.");
    }
  break;

  //resumes music
      case "resume":
    var server = servers[message.guild.id];
    if (server.dispatcher) {
      server.dispatcher.resume();
      message.channel.send("Song resumed.");
    }
  break;

        case "skip":
            var server = servers[message.guild.id];
            message.channel.sendMessage("***Song has been heckin Skipped***")

            if (server.dispatcher) server.dispatcher.end();

            break;

        case "stop":
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) {
      server.queue = [];
      message.guild.voiceConnection.disconnect();
    }
            break;

    }
})

//bot.login('no');

bot.login(process.env.TOKEN);
