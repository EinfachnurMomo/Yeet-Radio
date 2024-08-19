/*jshint esversion: 11 */
// Load up the discord.js library. Else throw an error.
try {
    var Discord = require('discord.js');
    if (process.version.slice(1).split('.')[0] < 8) {
      throw new Error('Node 8.0.0 or higher is required. Please upgrade / update Node.js on your computer / server.');
    }
  } catch (e) {
    console.error(e.stack);
    console.error('Current Node.js version: ' + process.version);
    console.error("In case you´ve not installed any required module: \nPlease run 'npm install' and ensure it passes with no errors!");
    process.exit();
  }
  const client = new Discord.Client({disableEveryone: true});
  
  const radio = require('./modules/radio');
  
  // Create a config file like the example-config.json
  // Put EXPERIMENTAL to 1 if you are developing!
  var {TOKEN, PREFIX, VERSION, EXPERIMENTAL} = require('./config.json');
  
  let clientStatus;
  
  if (EXPERIMENTAL === '1') {
    clientStatus = 'idle';
  } else {
    clientStatus = 'online';
  }
  
  client.on('warn', console.warn);
  
  client.on('error', console.error);
  
  client.on('ready', async () => {
    console.log('Starte Bot...\nNode version: ' + process.version + '\nDiscord.js version: ' + Discord.version + '\n');
    console.log('Bot online! Running on version ' + VERSION);
    client.user.setPresence({
      status: clientStatus,
      game: {
        name: `on ${client.guilds.size} Server! ${PREFIX}help`
      }
    }).catch(e => {
      console.error(e);
    });
    console.log(`Ready on ${client.guilds.size} Servers and playing radio for ${client.users.size} User!`);
  
    // This is only for development purposes, you can write everything you want here
    if (EXPERIMENTAL === '1') {
      // console.log("\nOnline on these servers:")
      // client.guilds.map(g => {
      //   console.log(g.name);
      // })
    }
  });
  
  client.on('disconnect', () => console.log('I disconnected currently but I will try to reconnect!'));
  
  // client.on('reconnecting', () => console.log('Reconnecting...'));
  
  // This event triggers only when the bot joins a guild.
  client.on('guildCreate', guild => {
    console.log(`Joined a new guild -> ${guild.name}. (id: ${guild.id}) This guild has ${guild.memberCount} members!`);
    client.user.setPresence({
      game: {
        name: `auf ${client.guilds.size} Server! ${PREFIX}help`
      }
    }).catch(e => {
      console.error(e);
    });
  });
  
  // This event triggers only when the bot is removed from a guild.
  client.on('guildDelete', guild => {
    console.log(`I have been removed from -> ${guild.name}. (id: ${guild.id})`);
    client.user.setPresence({
      game: {
        name: `auf ${client.guilds.size} Server! ${PREFIX}help`
      }
    }).catch(e => {
      console.error(e);
    });
  });
  
  client.on('message', async msg => {
    if (msg.isMentioned(client.user)) {
      msg.delete().catch(e => {
        // console.error(e)
        msg.channel.send('❌ **Please give me the rights to delete messages!**');
      });
      msg.author.send({
        embed: {
          color: 0xbb395f,
          title: 'Yeet Radio | Commands',
          fields: [
            {
              name: PREFIX + 'radio',
              value: 'If you are in a voice channel i will come to you and whisper in your ear.'
            },
            {
              name: PREFIX + 'stop oder ' + PREFIX + 'leave',
              value: 'Stop the Bot and/or he will leave the channel'
            },
            {
              name: PREFIX + 'invite',
              value: 'Create an invite link!'
            },
            {
              name: PREFIX + 'botinfo',
              value: 'All Info about me!'
            },
            {
              name: PREFIX + 'list oder ' + PREFIX + 'radiolist',
              value: 'Sends a list of all my Radio senders'
            }
          ],
          timestamp: new Date()
        }
      });
    }
  
    if (msg.author.bot) return;
    if (!msg.content.startsWith(PREFIX)) return undefined;
  
    const args = msg.content.split(' ');
  
    let command = msg.content.toLowerCase().split(' ')[0];
    command = command.slice(PREFIX.length);
  
    if (command === 'radio') {
      console.log(args);
  
      // If no other argument was given, then the bot will play the main radio
      if (args[1] === 'iloveradio') {
        radio.playRadio(msg.member.voiceChannel, msg, 'I LOVE RADIO', 'http://stream01.iloveradio.de/iloveradio1.mp3');
      }
      if (args[1] === 'bigfm') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Big FM', 'http://streams.bigfm.de/bigfm-deutschland-128-aac?usid=0-0-H-A-D-30');
      }
      if (args[1] === '1liveDiggi') {
        radio.playRadio(msg.member.voiceChannel, msg, '1Live Diggi', 'https://wdr-1live-diggi.sslcast.addradio.de/wdr/1live/diggi/mp3/128/stream.mp3?ar-key=BcHBEcAgCATAYjLj0-FAAR8Woygl5JHqs_tOfCWmcwVGhVP1cie6sLrzgIo9mRFXdlMcIlskcF6mTTJO2u4_');
      }
      if (args[1] === '1live') {
        radio.playRadio(msg.member.voiceChannel, msg, '1Live', 'https://wdr-1live-live.sslcast.addradio.de/wdr/1live/live/mp3/128/stream.mp3?ar-key=BcG5DcAgEATAYiwRIvY-9gKKwSdTggNX75l34Wu1KB3IDo7O9iy4SpAAFH6pVYzct5Ql_XBIGI_uWZE2PX4');
      }
      if (args[1] === '89rtl') {
        radio.playRadio(msg.member.voiceChannel, msg, '89.0 RTL', 'http://fhhalle.hoerradar.de/890rtl-live-mp3-hq?sABC=5o5nrp8o%230%2380345r9q53024nn5opop8r9001624q69%23qverxgyvaxUC&amsparams=playerid:direktlinkHP;skey:1532685451');
      }
      if (args[1] === 'antenne1') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Antenne 1', 'http://stream.antenne1.de/a1stg/livestream2.mp3');
      }
      if (args[1] === 'antenne180') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Antenne 1 80er', 'http://stream.antenne1.de/80er/livestream2.mp3');
      }
      if (args[1] === 'antenne190') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Antenne 1 90er', 'http://stream.antenne1.de/90er/livestream2.mp3');
      }
      if (args[1] === 'antennebayernchill') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Antenne Bayern - Chillout', 'http://www.antenne.de/webradio/channels/chillout.m3u');
      }
      if (args[1] === 'antennebayern80') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Antenne Bayern 80er Kulthits', 'http://www.antenne.de/webradio/channels/80er-kulthits.m3u');
      }
      if (args[1] === 'antennebayern') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Antenne Bayern', 'http://www.antenne.de/webradio/antenne.m3u');
      }
      if (args[1] === 'antennebayerntop40') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Antenne Bayern Top 40', 'http://www.antenne.de/webradio/channels/top-40.m3u');
      }
      if (args[1] === 'b5') {
        radio.playRadio(msg.member.voiceChannel, msg, 'B5 Aktuell', 'http://br-b5aktuell-live.cast.addradio.de/br/b5aktuell/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'ballermann') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Ballermann Radio', 'https://www.ballermann-radio.de/radioplayer/');
      }
      if (args[1] === 'bayern1') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Bayern 1', 'http://br-br1-franken.cast.addradio.de/br/br1/franken/mp3/128/stream.mp3');
      }
      if (args[1] === 'bayern3') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Bayern 3', 'http://br-br3-live.cast.addradio.de/br/br3/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'bigfmpfalz') {
        radio.playRadio(msg.member.voiceChannel, msg, 'bigFM Rheinland-Pfalz', 'http://streams.bigfm.de/bigfm-bw-128-aac?usid=0-0-H-A-D-30');
      }
      if (args[1] === 'black') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Black', 'http://stream.laut.fm/blackblack');
      }
      if (args[1] === 'blackbeatsfm') {
        radio.playRadio(msg.member.voiceChannel, msg, 'BlackBeats.FM', 'http://stream.blackbeatslive.de/');
      }
      if (args[1] === 'brpuls') {
        radio.playRadio(msg.member.voiceChannel, msg, 'BR Puls', 'http://br-bayernplus-live.cast.addradio.de/br/bayernplus/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'bremen1') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Bremen Eins', 'http://rb-bremeneins-live.cast.addradio.de/rb/bremeneins/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'bremen4') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Bremen Vier', 'http://rb-bremenvier-live.cast.addradio.de/rb/bremenvier/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'dasding') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Dasding', 'https://swr-dasding-live.sslcast.addradio.de/swr/dasding/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'defjay') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Defjay', 'https://www.defjay.com/player/');
      }
      if (args[1] === 'delta') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Delta Radio', 'http://streams.deltaradio.de/black/mp3-192/streams.deltaradio.de/');
      }
      if (args[1] === 'deluxelounge') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Deluxe Lounge Radio', 'https://www.deluxemusic.tv/fileadmin/Webdata/downloads/Playlisten/DELUXE_LOUNGE_RADIO.m3u');
      }
      if (args[1] === 'detektor') {
        radio.playRadio(msg.member.voiceChannel, msg, 'detektor.fm', 'https://detektor.fm/stream/mp3/musik/');
      }
      if (args[1] === 'deutschlandfunk') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Deutschlandfunk', 'http://st01.dlf.de/dlf/01/128/mp3/stream.mp3');
      }
      if (args[1] === 'deutschlandkultur') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Deutschlandradio Kultur', 'http://st02.dlf.de/dlf/02/128/mp3/stream.mp3');
      }
      if (args[1] === 'egofm') {
        radio.playRadio(msg.member.voiceChannel, msg, 'egoFM', 'http://www.egofm.de/stream/192kb');
      }
      if (args[1] === 'electroradio') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Electro Radio', 'http://stream.electroradio.fm/192k');
      }
      if (args[1] === 'energyberlin') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Energy Berlin', 'http://nrj.de/berlin');
      }
      if (args[1] === 'energybremen') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Energy Bremen', 'http://nrj.de/bremen');
      }
      if (args[1] === 'energyhamburg') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Energy Hamburg', 'http://nrj.de/hamburg');
      }
      if (args[1] === 'energymünchen') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Energy München', 'http://nrj.de/muenchen');
      }
      if (args[1] === 'energystuttgart') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Energy Stuttgart', 'http://nrj.de/stuttgart');
      }
      if (args[1] === 'ffn') {
        radio.playRadio(msg.member.voiceChannel, msg, 'ffn', 'http://ffn-de-hz-fal-stream06-cluster01.radiohost.de/ffn_192');
      }
      if (args[1] === 'fm4') {
        radio.playRadio(msg.member.voiceChannel, msg, 'FM 4', 'http://185.85.29.141/index.html?sid=1');
      }
      if (args[1] === 'fritz') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Fritz', 'http://rbb-fritz-live.cast.addradio.de/rbb/fritz/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'hitradioffh') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Hit Radio FFH', 'http://mp3.ffh.de/radioffh/hqlivestream.mp3');
      }
      if (args[1] === 'hitradioantenne') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Hit-Radio Antenne', 'http://stream.antenne.com/antenne-nds/mp3-192/stream.antenne.com/');
      }
      if (args[1] === 'housetime') {
        radio.playRadio(msg.member.voiceChannel, msg, 'HouseTime.FM', 'http://listen.housetime.fm/dsl.pls');
      }
      if (args[1] === 'hr3') {
        radio.playRadio(msg.member.voiceChannel, msg, 'hr3', 'http://hr-hr3-live.cast.addradio.de/hr/hr3/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'jamfm') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Jam FM', 'https://webradio.jam.fm/live?rpSt=Jam+FM&rpSrp=1.0#');
      }
      if (args[1] === 'kissfm') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Kiss FM', 'http://stream.kissfm.de/kissfm/mp3-128/internetradio/');
      }
      if (args[1] === 'mdrjump') {
        radio.playRadio(msg.member.voiceChannel, msg, 'MDR Jump', 'http://mdr-284320-0.cast.mdr.de/mdr/284320/0/mp3/high/stream.mp3');
      }
      if (args[1] === 'njoy') {
        radio.playRadio(msg.member.voiceChannel, msg, 'N-JOY', 'http://ndr-njoy-live.cast.addradio.de/ndr/njoy/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'ndr2') {
        radio.playRadio(msg.member.voiceChannel, msg, 'NDR 2', 'http://ndr-ndr2-niedersachsen.cast.addradio.de/ndr/ndr2/niedersachsen/mp3/128/stream.mp3');
      }
      if (args[1] === 'oldie95') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Oldie 95', 'http://webradio.hamburg-zwei.de/');
      }
      if (args[1] === 'oldies') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Oldies', 'https://www.rt1.de/rt1-radioplayer/188?rpSt=Oldies&rpSrp=4.0');
      }
      if (args[1] === 'ostseewelle') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Ostseewelle Hit-Radio', 'http://mp3.ostseewelle.c.nmdn.net/ostseewellelive/livestream.mp3');
      }
      if (args[1] === 'planetradio') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Planet Radio', 'http://mp3.planetradio.de/planetradio/hqlivestream.mp3');
      }
      if (args[1] === 'rsh') {
        radio.playRadio(msg.member.voiceChannel, msg, 'R.SH', 'http://streams.rsh.de/100/mp3-192/streams.rsh.de/');
      }
      if (args[1] === 'radio7') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Radio 7', 'http://stream.radio7.de/stream1/livestream.mp3');
      }
      if (args[1] === 'radiobrocken') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Radio Brocken', 'https://www.radiobrocken.de/programm/radio-hoeren-die-radio-brocken-webradios-id10679.html');
      }
      if (args[1] === 'radiogong96') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Radio Gong 96,3', 'http://mp3.radiogong963.c.nmdn.net/ps-radiogong963/livestream.mp3');
      }
      if (args[1] === 'radiohamburg') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Radio Hamburg', 'http://stream.radiohamburg.de/rhh-live/mp3-192/linkradiohamburgde/');
      }
      if (args[1] === 'radiopaloma') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Radio Paloma', 'http://pool.radiopaloma.de/RADIOPALOMA.mp3');
      }
      if (args[1] === 'radioeins') {
        radio.playRadio(msg.member.voiceChannel, msg, 'radioeins', 'http://rbb-radioeins-live.cast.addradio.de/rbb/radioeins/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'rockantenne') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Rock Antenne', 'http://mp3channels.webradio.rockantenne.de/rockantenne');
      }
      if (args[1] === 'schlager') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Schlager', 'http://schlager.stream.laut.fm/schlager?pl=m3u&t302=2018-07-27_15-18-07&uuid=4c44a06e-f324-4ca3-8fa5-75e8dfe968a4');
      }
      if (args[1] === 'sunshinelive') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Sunshine Live', 'http://stream.sunshine-live.de/2000er/mp3-192/stream.sunshine-live.de/');
      }
      if (args[1] === 'swr1bawue') {
        radio.playRadio(msg.member.voiceChannel, msg, 'SWR1 Baden-Württemberg', 'http://swr-swr1-bw.cast.addradio.de/swr/swr1/bw/mp3/128/stream.mp3');
      }
      if (args[1] === 'swr3') {
        radio.playRadio(msg.member.voiceChannel, msg, 'SWR3', 'http://swr-swr3-live.cast.addradio.de/swr/swr3/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'technobasefm') {
        radio.playRadio(msg.member.voiceChannel, msg, 'TechnoBase.FM', 'https://www.technobase.fm/');
      }
      if (args[1] === 'top100station') {
        radio.playRadio(msg.member.voiceChannel, msg, 'Top 100 Station', 'http://streamhq.top100station.com/top100station-high.mp3');
      }
      if (args[1] === 'unserding') {
        radio.playRadio(msg.member.voiceChannel, msg, 'UnserDing', 'http://sr.audiostream.io/sr/1012/mp3/128/ud');
      }
      if (args[1] === 'wdr2') {
        radio.playRadio(msg.member.voiceChannel, msg, 'WDR 2', 'https://wdr-wdr2-rheinland.icecastssl.wdr.de/wdr/wdr2/rheinland/mp3/128/stream.mp3');
      }
      if (args[1] === 'wdr4') {
        radio.playRadio(msg.member.voiceChannel, msg, 'WDR 4', 'https://wdr-wdr4-live.icecastssl.wdr.de/wdr/wdr4/live/mp3/128/stream.mp3');
      }
      if (args[1] === 'youfm') {
        radio.playRadio(msg.member.voiceChannel, msg, 'You FM', 'http://ard.radioplayer.de/youfm');
      }
    }
  
    if (command === 'help') {
      msg.delete().catch(e => {
        // console.error(e)
        msg.channel.send('❌ **Please give me the rights to delete messages!**');
      });
      msg.author.send({
        embed: {
          color: 0xbb395f,
          title: 'Yeet Radio | Commands',
          fields: [
            {
              name: PREFIX + 'radio <radio name>',
              value: 'If you are in a voice channel i will come to you and whisper in your ear.'
            },
            {
              name: PREFIX + 'stop or ' + PREFIX + 'leave',
              value: 'Stop the Bot and/or he will leave the channel'
            },
            {
              name: PREFIX + 'invite',
              value: 'Create an invite link!'
            },
            {
              name: PREFIX + 'botinfo',
              value: 'All Info about me!'
            },
            {
              name: PREFIX + 'list oder ' + PREFIX + 'radiolist',
              value: 'Sends a list of all my Radio senders'
            }
          ],
          timestamp: new Date()
        }
      });
    }
  
    if (command === 'botinfo') {
      let mode;
  
      if (EXPERIMENTAL === '1') {
        mode = '**EXPERIMENTAL (issues can appear)**';
      } else {
        mode = 'normal';
      }
  
      msg.channel.send({ embed: {
        title: 'Bot Information',
        fields: [
          {
            name: 'Server count im playing radio for:',
            value: `${client.guilds.size}`
          },
          {
            name: 'Member count im playing radio for:',
            value: `${client.users.size}`
          },
          {
            name: 'Modus',
            value: mode
          }
        ],
        description: 'Information about me',
        color: 0xbb395f
      }});
    }
  
    if (command === 'invite') {
      msg.delete()
       .then(msg => console.log(`Message deleted ${msg.content} von ${msg.author} auf ${msg.guild.name}.`))
       .catch(e => {
         console.error(e);
         if (e.name === 'DiscordAPIError') {
           // Check if the error message is that the message is not unknown.
           // If it is, it will not send anything because this would confuse some people. This error (Unknown message)
           // appears only, when another bot deleted the message already before this bot here (this could happen if
           // both bots are using the same command and prefix).
           if (e.message !== 'Unknown Message')
             // Sending the message to the channel with the error message
             { msg.channel.send(`❌ **Cant delete this Message.** (Error: ${e.message})`); }
         } else {
           // Sending a full error message if it´s not a DiscordAPIError
           msg.channel.send(`❌ **Cant delete this Message.** (Error: ${e})`);
         }
       });
      console.log(msg.content);
      msg.author.send('Let me join your Server with this link!: https://discordapp.com/oauth2/authorize?client_id=502448511321767956&scope=bot&permissions=36711488');
    }
  
    /*let pages = [ 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten' ];
    let page = 1;

    const embed = new Discord.MessageEmbed()
      .setColor(0xbb395f)
      .setFooter(`Page ${page} of ${pages.length}`)
      .setDescription(pages[page-1]);

    if (command === 'list' || command === 'radiolist'){
    message.channel.send(embed).then(msg => {
      msg.react('⏪').then( r => {
        msg.react('⏩');

        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
        const forwardsFilter = (reaciotn, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

        const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });

        backwards.on('collect', r => {
          if (page === 1) return;
          page--;
          embed.setDescription(pages[page-1]);
          embed.setFooter(`Page ${page} of ${pages.length}`);
          msg.edit(embed);
        });

        backwards.on('collect', r => {
          if (page === pages.length) return;
          page++;
          embed.setDescription(pages[page-1]);
          embed.setFooter(`Page ${page} of ${pages.length}`);
          msg.edit(embed);
        });
      });
    });
    }*/

    // ⏪⏩

    if (command === 'list' || command === 'radiolist') {
      msg.channel.send({
        embed: {
          color: 0xbb395f,
          title: 'Yeet Radio stations | over 65 Radio stations!',
          fields: [
            {
              name: 'Radio: **I Love Radio**',
              value: `${PREFIX}radio iloveradio`
            },
            {
              name: 'Radio: **Big FM**',
              value: `${PREFIX}radio bigfm`
            },
            {
              name: 'Radio: **1Live Diggi**',
              value: `${PREFIX}radio 1livediggi`
            },
            {
              name: 'Radio: **1Live**',
              value: `${PREFIX}radio 1live`
            },
            {
              name: 'Radio: **89.0 RTL**',
              value: `${PREFIX}radio 89rtl`
            },
            {
              name: 'Radio: **Antenne 1**',
              value: `${PREFIX}radio antenne1`
            },
            {
              name: 'Radio: **Antenne 1 80er**',
              value: `${PREFIX}radio antenne180`
            },
            {
              name: 'Radio: **Antenne 1 90er**',
              value: `${PREFIX}radio antenne190`
            },
            {
              name: 'Radio: **Antenne Bayern - Chillout**',
              value: `${PREFIX}radio antennebayernchill`
            },
            {
              name: 'Radio: **Antenne Bayern 80er Kulthits**',
              value: `${PREFIX}radio antennebayern80`
            },
            {
              name: 'Radio: **Antenne Bayern**',
              value: `${PREFIX}radio antennebayern`
            },
            {
              name: 'Radio: **Antenne Bayern Top 40**',
              value: `${PREFIX}radio antennebayerntop40`
            },
            {
              name: 'Radio: **B5 Aktuell**',
              value: `${PREFIX}radio b5`
            },
            {
              name: 'Radio: **Ballermann Radio**',
              value: `${PREFIX}radio ballermann`
            },
            {
              name: 'Radio: **Bayern 1**',
              value: `${PREFIX}radio bayern1`
            },
            {
              name: 'Radio: **Bayern 3**',
              value: `${PREFIX}radio bayern3`
            },
            {
              name: 'Radio: **bigFM Rheinland-Pfalz**',
              value: `${PREFIX}radio bigfmpfalz`
            },
            {
              name: 'Radio: **Black**',
              value: `${PREFIX}radio black`
            },
            {
              name: 'Radio: **BlackBeats.FM**',
              value: `${PREFIX}radio blackbeatsfm`
            },
            {
              name: 'Radio: **BR Puls**',
              value: `${PREFIX}radio brpuls`
            },
            {
              name: 'Radio: **Bremen Eins**',
              value: `${PREFIX}radio bremen1`
            },
            {
              name: 'Radio: **Bremen Vier**',
              value: `${PREFIX}radio bremen4`
            },
            {
              name: 'Radio: **Dasding**',
              value: `${PREFIX}radio dasding`
            },
            {
              name: 'Radio: **Defjay**',
              value: `${PREFIX}radio defjay`
            },
            {
              name: 'Radio: **Delta Radio**',
              value: `${PREFIX}radio delta`
            }
          ],
          timestamp: new Date()
        }
      });
      msg.channel.send({
        embed: {
          color: 0xbb395f,
          title: 'Yeet Radio stations | over 65 Radio stations!',
          fields: [
            {
              name: 'Radio: **Deluxe Lounge Radio**',
              value: `${PREFIX}radio deluxelounge`
            },
            {
              name: 'Radio: **detektor.fm**',
              value: `${PREFIX}radio detektor`
            },
            {
              name: 'Radio: **Deutschlandfunk**',
              value: `${PREFIX}radio deutschlandfunk`
            },
            {
              name: 'Radio: **Deutschlandradio Kultur**',
              value: `${PREFIX}radio deutschlandkultur`
            },
            {
              name: 'Radio: **egoFM**',
              value: `${PREFIX}radio egofm`
            },
            {
              name: 'Radio: **Electro Radio**',
              value: `${PREFIX}radio electroradio`
            },
            {
              name: 'Radio: **Energy Berlin**',
              value: `${PREFIX}radio energyberlin`
            },
            {
              name: 'Radio: **Energy Bremen**',
              value: `${PREFIX}radio energybremen`
            },
            {
              name: 'Radio: **Energy Hamburg**',
              value: `${PREFIX}radio energyhamburg`
            },
            {
              name: 'Radio: **Energy München**',
              value: `${PREFIX}radio energymünchen`
            },
            {
              name: 'Radio: **Energy Stuttgart**',
              value: `${PREFIX}radio energystuttgart`
            },
            {
              name: 'Radio: **ffn**',
              value: `${PREFIX}radio ffn`
            },
            {
              name: 'Radio: **FM 4**',
              value: `${PREFIX}radio fm4`
            },
            {
              name: 'Radio: **Fritz**',
              value: `${PREFIX}radio fritz`
            },
            {
              name: 'Radio: **Hit Radio FFH**',
              value: `${PREFIX}radio hitradioffh`
            },
            {
              name: 'Radio: **Hit-Radio Antenne**',
              value: `${PREFIX}radio hitradioantenne`
            },
            {
              name: 'Radio: **HouseTime.FM**',
              value: `${PREFIX}radio housetime`
            },
            {
              name: 'Radio: **hr3**',
              value: `${PREFIX}radio hr3`
            },
            {
              name: 'Radio: **Jam FM**',
              value: `${PREFIX}radio jamfm`
            },
            {
              name: 'Radio: **Kiss FM**',
              value: `${PREFIX}radio kissfm`
            },
            {
              name: 'Radio: **MDR Jump**',
              value: `${PREFIX}radio mdrjump`
            },
            {
              name: 'Radio: **N-JOY**',
              value: `${PREFIX}radio njoy`
            },
            {
              name: 'Radio: **NDR 2**',
              value: `${PREFIX}radio ndr2`
            },
            {
              name: 'Radio: **Oldie 95**',
              value: `${PREFIX}radio oldie95`
            },
            {
              name: 'Radio: **Oldies**',
              value: `${PREFIX}radio oldies`
            }         
          ],
          timestamp: new Date()
        }
      });
      msg.channel.send({
        embed: {
          color: 0xbb395f,
          title: 'Yeet Radio stations | over 65 Radio stations!',
          fields: [
            {
              name: 'Radio: **Ostseewelle Hit-Radio**',
              value: `${PREFIX}radio ostseewelle`
            },
            {
              name: 'Radio: **Planet Radio**',
              value: `${PREFIX}radio planetradio`
            },
            {
              name: 'Radio: **R.SH**',
              value: `${PREFIX}radio rsh`
            },
            {
              name: 'Radio: **Radio 7**',
              value: `${PREFIX}radio radio7`
            },
            {
              name: 'Radio: **Radio Brocken**',
              value: `${PREFIX}radio radiobrocken`
            },
            {
              name: 'Radio: **Radio Gong 96,3**',
              value: `${PREFIX}radio radiogong96`
            },
            {
              name: 'Radio: **Radio Hamburg**',
              value: `${PREFIX}radio radiohamburg`
            },
            {
              name: 'Radio: **Radio Paloma**',
              value: `${PREFIX}radio radiopaloma`
            },
            {
              name: 'Radio: **radioeins**',
              value: `${PREFIX}radio radioeins`
            },
            {
              name: 'Radio: **Rock Antenne**',
              value: `${PREFIX}radio rockantenne`
            },
            {
              name: 'Radio: **Schlager**',
              value: `${PREFIX}radio schlager`
            },
            {
              name: 'Radio: **Sunshine Live**',
              value: `${PREFIX}radio sunshinelive`
            },
            {
              name: 'Radio: **SWR1 Baden-Württemberg**',
              value: `${PREFIX}radio swr1bawue`
            },
            {
              name: 'Radio: **SWR3**',
              value: `${PREFIX}radio swr3`
            },
            {
              name: 'Radio: **TechnoBase.FM**',
              value: `${PREFIX}radio technobasefm`
            },
            {
              name: 'Radio: **Top 100 Station**',
              value: `${PREFIX}radio top100station`
            },
            {
              name: 'Radio: **UnserDing**',
              value: `${PREFIX}radio unserding`
            },
            {
              name: 'Radio: **WDR 2**',
              value: `${PREFIX}radio wdr2`
            },
            {
              name: 'Radio: **WDR 4**',
              value: `${PREFIX}radio wdr4`
            },
            {
              name: 'Radio: **You FM**',
              value: `${PREFIX}radio youfm`
            }          
          ],
          timestamp: new Date()
        }
      });
    }

    if (command === 'leave' || command === 'stop') {
      const voiceChannel = msg.member.voiceChannel;
      if (voiceChannel && voiceChannel.id === msg.guild.voiceConnection.channel.id) {
        console.log('Leaving a channel and stopped playing iLoveRadio')
        msg.channel.send('I stopped and left the Voice!');
        voiceChannel.leave();
      } else {
        msg.reply('No');
      }
    }
  });
  
  client.login(TOKEN).catch(e => console.log(e));
  
  process.on('unhandledRejection', (PromiseRejection) => console.error(`Promise Error -> ${PromiseRejection}`));