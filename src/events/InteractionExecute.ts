import { Client, Collection, Interaction } from 'discord.js';

export default class InteractionExecute {
  type: string;

  constructor() {
    this.type = 'interactionCreate';
  }

  async execute(client: Client<true>, int: Interaction) {
    if (int.isCommand()) {
      const command = client.slashCommands.get(int.commandName);
      if (!command) return;

      await int.deferReply({ ephemeral: command.defer });

      if (!client.cooldowns.has(command.data.name)) {
        client.cooldowns.set(command.data.name, new Collection());
      }

      const now = Date.now();
      const timestamps = client.cooldowns.get(command.data.name);
      const cooldownAmount = (command.cooldown || 3) * 1000;

      if (timestamps.has(int.user.id)) {
        const expirationTime = timestamps.get(int.user.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          
          return int.editReply({
            content: `${int.user}`,
            embeds: [{
              color: 0xff0000, author: { name: 'Calma ai!', icon_url: client.user.displayAvatarURL() },
              description: `⏱ **|** Você precisa esperar **${timeLeft.toFixed(1)} Segundo(s)** para executar o comando \`${command.data.name}\` novamente!`
            }]
          });
        }
      }

      try {
        command.execute(client, int);
      } catch (err) {
        const { message} = err as Error; 
        console.error(message);

        return int.editReply({
          content: `${int.user}`,
          embeds: [{
            color: 0xff0000,
            description: `Ocorreu um erro no meu sistema:\n` + '```' + message + '```'
          }]
        });
      } 
    }

    if (int.isSelectMenu()) {
    }

    if (int.isButton()) {
    }
  }
}