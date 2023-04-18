const { SlashCommandBuilder } = require('discord.js');



module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Select a member and ban them (but not really).')
    .addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason to ban').setRequired(false)),
  async execute(interaction,client,logChannel) {
    const member = interaction.options.getMember('target');
    if (interaction.member.roles.cache.some(role => role.name === 'admin')) {
      //logging
      console.log(`${member.user.username} was banned by ${interaction.user.username}`)
      logChannel.send(`${member.user.username} was banned by ${interaction.user.username}`)
      
      return interaction.reply({
        content: `You wanted to ban: ${member.user.username}\nReason: ${interaction.options.getString('reason')}`,
        ephemeral: true
      });
      
    }
    else {
      //logging
      console.log(`${interaction.user.username} tried to ban ${member.user.username}`)
      logChannel.send(`${interaction.user.username} tried to ban ${member.user.username}`)
      return interaction.reply({
        content: `You dont have the permissions to ban users`,
        ephermal: true
      });
    }

  },
};