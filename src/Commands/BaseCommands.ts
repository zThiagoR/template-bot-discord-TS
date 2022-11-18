import { Client, ApplicationCommandDataResolvable } from "discord.js";
import { readdirSync } from "fs";
import { resolve } from 'path';

import { SlashCommand } from "../@types/TypeCommands";

export default async (client: Client<true>) => {
  const guild = client.guilds.cache.get('960355993798193163');

  const SlashFolder = readdirSync('./src/Commands').filter((file) => file !== 'BaseCommands.ts');
  for (const SlashDir of SlashFolder) {

    const SlashFile = readdirSync(resolve('./src/Commands', SlashDir));
    for (const SlashCommand of SlashFile) {

      const CommandFile = await import(resolve('./src/Commands', SlashDir, SlashCommand));
      const Command: SlashCommand = new CommandFile.default();

      client.slashCommands.set(Command.data.name, Command);
    }
  }
  
  const Data = client.slashCommands.map(({ data }) => data);
  await guild.commands.set(Data);

  return console.log('[CLIENT] Commands on ready!');
}