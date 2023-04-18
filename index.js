// Import the necessary modules
const Discord = require('discord.js');
const fetch = require('node-fetch');

// Create a new Discord client
const client = new Discord.Client();

// Define the bot's ready event
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Define the bot's message event
client.on('message', async (message) => {
  // Check if the message starts with the desired command
  if (message.content.startsWith('!pilotlist')) {
    try {
      // Fetch the pilot list information from the new endpoint
      const response = await fetch('http://mpserver13.flightgear.org:8080/jsonpilot/');

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        const pilots = data.pilots; // Extract the pilots array from the response

        // Send the pilot list information as a message
        message.channel.send(`Pilot List:\n${pilots.join('\n')}`);
      } else {
        // Send an error message if the response is not successful
        message.channel.send('Failed to fetch pilot list information.');
      }
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while fetching pilot list information.');
    }
  }
});

// Login the bot using your Discord bot token
client.login('MTA2NTg3ODE2NDk3MjI0MTAxNg.GcWBJ0.AypOnCiPfuA__zEPHlp_YRCdoRLNRiG33TVj48');
