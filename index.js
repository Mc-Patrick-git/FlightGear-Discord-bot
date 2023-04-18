const Discord = require('discord.js');
const Telnet = require('telnet-client');

// Create a new Discord client
const client = new Discord.Client();

// Set up an event listener for when the Discord client is ready
client.once('ready', () => {
  console.log('Discord bot is ready!');
});

// Set up an event listener for receiving messages in Discord
client.on('message', (message) => {
  // Process the received message here
  console.log(`Received message: ${message.content}`);
});

// Telnet configuration
const connection = new Telnet();
const params = {
  host: 'mpserver01.flightgear.org',
  port: 5001,
  shellPrompt: '',
  timeout: 1500,
  negotiationMandatory: false,
};

// Connect to the FlightGear multiplayer server
connection.connect(params)
.then(() => {
  console.log('Connected to FlightGear multiplayer server.');
  return connection.send(`AUTH ${token}\n`);
})
.then(() => {
  return connection.send('PLIST\n');
})
.then(data => {
  // Format the Telnet output
  const lines = data.split('\n');
  for (const line of lines) {
    const fields = line.split('@');
    if (fields.length >= 2) {
      const callsign = fields[0].trim();
      const model = fields[1].trim().split(' ')[10].split('/').pop().split('.xml')[0];
      console.log(`Callsign: ${callsign}, Model: ${model}`);
    }
  }
  // Close the Telnet connection
  return connection.end();
})
.catch(err => {
  console.error(`Error fetching pilot list: ${err}`);
});

// Log in the Discord bot with the token
client.login(
