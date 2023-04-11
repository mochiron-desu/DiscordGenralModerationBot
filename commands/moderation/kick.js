const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Select a member and kick them (but not really).')
    .addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason to ban').setRequired(false)),
  async execute(interaction) {
    const member = interaction.options.getMember('target');
    if (interaction.member.roles.cache.some(role => role.name === 'admin')) {
      return interaction.reply({
        content: `You wanted to kick: ${member.user.username}\nReason: ${interaction.options.getString('reason')}`,
        ephemeral: true
      });
    }
    else {
      return interaction.reply({
        content: `You dont have the permissions to kick users`,
        ephermal: true
      });
    }

  },
};