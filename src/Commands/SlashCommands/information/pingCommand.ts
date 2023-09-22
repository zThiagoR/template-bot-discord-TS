import { ChatInputCommandInteraction, Client } from "discord.js";
import { BaseCommand } from "../../BaseCommands";

export default class PingCommand extends BaseCommand {
  constructor() {
    super();

    this.data = {
      name: "ping",
      description: "Comando para ver informações do BOT",
    };
  }

  execute(client: Client<true>, int: ChatInputCommandInteraction) {
  }
}