/*jshint esversion: 8 */
/**
 * @fileOverview File with important functions for the bot
 * */

var {PREFIX, EXPERIMENTAL} = require('./../config.json');

/**
 * Function which connects you to the web radio and plays music
 *
 * @param {GuildChannel} voiceChannel - Voice Channel
 * @param {Message} msg - Message
 * @param {String} radioType - Which radio is playing now?
 * @param {String} streamLink - Stream link to the radio
 */
exports.playRadio = (voiceChannel, msg, radioType, streamLink) => {

  // Check if the bot is already in the channel and if the user is in the same channel.
  // If the bot and the user are in the same channel, the bot will not "rejoin" but he will
  // change the radio. If they are both not in the same channel,
  // the bot will check first if the user is in a channel and then tries to connect to it and tries to play the music
  // from iLoveRadio.
  if(msg.guild.voiceConnection && msg.member.voiceChannel.id === msg.guild.voiceConnection.channel.id){

    // User limit property from the voice channel
    let userLimit;
    if (voiceChannel.userLimit === 0) {
      userLimit = "unlimited";
    } else {
      userLimit = voiceChannel.userLimit;
    }

    // logging channel data
    console.log(`\nSwitching the radio on a server. Here is some data:\n 
          Radio type: ${radioType}\n
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`);

    // Sending a response that the bot is now playing the music
    msg.channel.send(`🎶 Playing now **${radioType}**! If you want to stop me, type the command \`\`${PREFIX}stop\`\` or \`\`${PREFIX}leave\`\` :wink:`);

    // This message will be send if the bot is currently under an experimental mode or under maintenance
    if (EXPERIMENTAL === "1") {
      msg.channel.send("**Im in development mode, This mean i can stop playing randomly.** \n" +
        "You can see if im in development mode on my status (Orange point)");
    }

    // Playing the music
    const dispatcher = msg.guild.voiceConnection.playStream(`${streamLink}`);

  }else {

    // If the user is in a channel
    if (voiceChannel) {
      // Then try to join his channel
      voiceChannel.join().then(connection => {

        // User limit property from the voice channel
        let userLimit;
        if (voiceChannel.userLimit === 0) {
          userLimit = "unlimited";
        } else {
          userLimit = voiceChannel.userLimit;
        }

        // logging channel data
        console.log(`\nJoined a channel and now playing ${radioType}! Here is some data:\n 
          Radio type: ${radioType}\n
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`);

        // Sending a response that the bot is now playing the music
        msg.channel.send(`🎶 Playing now **${radioType}**! If you want to stop me, type the command \`\`${PREFIX}stop\`\` or \`\`${PREFIX}leave\`\` :wink:`);

        // This message will be send if the bot is currently under an experimental mode or under maintenance
        if (EXPERIMENTAL === "1") {
          msg.channel.send("**Im in development mode, This mean i can stop playing randomly.** \n" +
            "You can see if im in development mode on my status (Orange point)");
        }

        // Playing the music
        const dispatcher = msg.guild.voiceConnection.playStream(`${streamLink}`);

        // catch error
      }).catch(e => {
        // Error message
        msg.channel.send(`❌ I cant join your channel. (${e})`);
        console.log(e);
      });

    } else {
      // User must join a channel first before the bot can do something
      msg.reply('You need to join a voice channel!').catch(e => {
        console.log(`${msg.guild.name} -> Error appeared: ${e}`);
      });
    }
  }
};