import { ChannelType, Client, Collection, Message } from "discord.js";

export default class CommandExecute {
  type: string;

  constructor() {
    this.type = "messageCreate";
  };

  async execute(client: Client<true>, msg: Message) {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(process.env.PREFIX) && msg.channel.type === ChannelType.GuildText) return;

    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.normalCommands.get(commandName) || client.normalCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (!client.cooldownsNormal.has(command.name)) {
      client.cooldownsNormal.set(command.name, new Collection());
    };

    const now = Date.now();
    const timestamps = client.cooldownsNormal.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(msg.author.id)) {
      const timestamps = client.cooldownsNormal.get(command.name) || new Map<string, number>();
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        msg.delete().catch(() => null);

        return msg.channel.send({
          content: `${msg.author}`,
          embeds: [
            {
              title: "⏱️ Cooldown",
              description: `Aguarde ${timeLeft.toFixed(1)} segundos para usar o comando \`${command.name}\` novamente!`,
              color: 0xff0000,
            },
          ]
        }).then(m => setTimeout(() => m.delete(), 5000))
          .catch(() => null);
      };
    };

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    try {
      await command.execute(client, msg, args);
    } catch (error) {
      msg.delete().catch(() => null);

      return msg.channel.send({
        content: msg.author.toString(),
        embeds: [{
          color: 0xff0000,
          description: `**Error:** ${error}`
        }]
      }).then(msg => setTimeout(() => msg.delete(), 5000))
        .catch(() => null);
    };
  };
}