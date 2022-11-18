import { yellow, gray } from "colors";
import { ActivityType, Client } from "discord.js";

import deployCommand from '../Commands/BaseCommands'

export default class ReadyApplication {
  type: string;

  constructor() {
    this.type = "ready";
  };

  async execute(client: Client<true>) {

    client.user.setActivity({
      name: "💰 | /daily",
      type: ActivityType.Playing
    })

    await deployCommand(client);

    console.log(yellow("[CLIENT]") + " Aplicação " + gray(client.user.tag) + " Iniciada com Sucesso");
  };
};