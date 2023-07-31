import { ChatInputCommandInteraction, Client } from 'discord.js';

export default class InteractionExecute {
  type: string;

  constructor() {
    this.type = 'interactionCreate';
  }

  async execute(client: Client<true>, int: ChatInputCommandInteraction) {
    if (int.isCommand()) {
      const command = client.slashCommands.get(int.commandName);
      if (!command) return;

      await int.deferReply({ ephemeral: command.defer });

      const time = (command.cooldown || 5) * 1000;
      if (client.cooldowns.has(`${command.data}-${int.user.id}`)) {
        const now = Date.now();
        const expirationTime = client.cooldowns.get(`${command.data.name}-${int.user.id}`);
        
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          
          return int.editReply({
            content: `${int.user}`,
            embeds: [{
              color: 0xf33f, author: { name: 'Calma ai!', icon_url: client.user.displayAvatarURL() },
              description: `⏱ **|** Você precisa esperar **${timeLeft.toFixed(1)} Segundo(s)** para executar o comando \`${command.data.name}\` novamente!`
            }]
          });
        }
      }

      client.cooldowns.set(`${command.data.name}-${int.user.id}`, Date.now() + time);

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
  }
}