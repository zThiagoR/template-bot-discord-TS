import fs from "fs";
import path from "path";
import Discord from "discord.js";

import ApplicationConfig from "./config/ApplicationConfig";

export default class ClientApplication {
  client: Discord.Client<true>;

  constructor() {
    this.client = new Discord.Client(ApplicationConfig);
    this.client.cooldowns = new Discord.Collection();
    this.client.slashCommands = new Discord.Collection();

    this.events();
    this.client.login();
  };

  private events() {
    fs.readdirSync(path.resolve(__dirname, "events")).forEach(async file => {
      const EventFile = await import(path.resolve(__dirname, "events", file));
      const event = new EventFile.default();

      this.client.on(event.type, (...args) => event.execute(this.client, ...args));
    });

    return console.log('[CLIENT] Events on Ready');
  };
};