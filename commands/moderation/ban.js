const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Select a member and ban them (but not really).')
    .addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason to ban').setRequired(false)),
  async execute(interaction) {
    const member = interaction.options.getMember('target');
    if (interaction.member.roles.cache.some(role => role.name === 'admin')) {
      return interaction.reply({
        content: `You wanted to ban: ${member.user.username}\nReason: ${interaction.options.getString('reason')}`,
        ephemeral: true
      });
    }
    else {
      return interaction.reply({
        content: `You dont have the permissions to ban users`,
        ephermal: true
      });
    }

  },
};