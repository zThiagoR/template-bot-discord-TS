import { ApplicationCommandDataResolvable, ApplicationCommandOptionType, Client, CommandInteraction } from 'discord.js';

export default class PingCommand {
  data: ApplicationCommandDataResolvable;
  cooldown?: number;
  ephemeral?: boolean;
  defer: boolean;

  constructor() {
    this.data = {
      name: 'ping',
      description: 'teste'
    }
  }

  execute(client: Client<true>, int: CommandInteraction) {
    
  }
}
