import { yellow, gray } from "colors";
import { ActivityType, Client } from "discord.js";

import BaseCommands from '../Commands/BaseCommands'

export default class ReadyApplication {
  type: string;

  constructor() {
    this.type = "ready";
  };

  async execute(client: Client<true>) {

    client.user.setActivity({
      name: "🚀 | Iniciando...",
      type: ActivityType.Playing
    })

    await BaseCommands(client);

    console.log(yellow("[CLIENT]") + " Aplicação " + gray(client.user.tag) + " Iniciada com Sucesso");
  };
};