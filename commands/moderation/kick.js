const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Select a member and kick them (but not really).')
    .addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason to ban').setRequired(false)),
  async execute(interaction,client,logChannel) {
    const member = interaction.options.getMember('target');
    
    if (interaction.member.roles.cache.some(role => role.name === 'admin')) {
      //logging
      console.log(`${member.user.username} was kicked by ${interaction.user.username}`)
      logChannel.send(`${member.user.username} was kicked by ${interaction.user.username}`)
      return interaction.reply({
        content: `You wanted to kick: ${member.user.username}\nReason: ${interaction.options.getString('reason')}`,
        ephemeral: true
      });
    }
    else {
      //logging
      console.log(`${interaction.user.username} tried to kick ${member.user.username}`)
      logChannel.send(`${interaction.user.username} tried to kick ${member.user.username}`)
      return interaction.reply({
        content: `You dont have the permissions to kick users`,
        ephermal: true
      });
    }

  },
};