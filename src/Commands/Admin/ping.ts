import { ChatInputCommandInteraction, Client, CommandInteraction } from 'discord.js';
import BaseCommand from '../BaseCommands';

export default class PingCommand extends BaseCommand {

  constructor() {
    super();

    this.data = {
      name: 'ping',
      description: 'teste'
    }
  }

  execute(client: Client<true>, int: ChatInputCommandInteraction) {
    
  }
}
