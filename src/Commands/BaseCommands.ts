import { Client, ApplicationCommandDataResolvable } from 'discord.js';
import { readdirSync } from 'fs';
import { resolve } from 'path';

import { Command, SlashCommand } from '../@types/TypeCommands';

export class BaseCommand {
  protected data: ApplicationCommandDataResolvable;
  protected cooldown?: number;
  protected defer?: boolean;
}

export default async function BaseCommands(client: Client<true>) {
  await PushSlashCommand(client);
  await PushNormalcommands(client);

  const data: ApplicationCommandDataResolvable[] = [];

  client.slashCommands.map((cmd) => data.push(cmd.data));
  
  client.guilds.cache.forEach((Guild) => Guild.commands.set(data));
}

async function PushSlashCommand(client: Client<true>) {
  const SlashFolder = readdirSync(resolve(__dirname, "SlashCommands"));
  
  for (const dirs of SlashFolder) {
    const SlashCommand = readdirSync(resolve(__dirname, "SlashCommands", dirs))
      .filter((file) => file.endsWith('.ts'));

    for (const file of SlashCommand) {
      const CommandFile = await import(resolve(__dirname, "SlashCommands", dirs, file));
      const command: SlashCommand = new CommandFile.default();

      client.slashCommands.set(command.data.name, command);
      console.log(`[CLIENT] Comando ${command.data.name} adicionado com Sucesso`);
    }
  }
}

async function PushNormalcommands(client: Client<true>) {
  readdirSync(resolve(__dirname, "NormalCommands")).forEach(async dirs => {
    const commandFiles = readdirSync(resolve(__dirname, "NormalCommands", dirs));

    for (const file of commandFiles) {
      const CommandFile = await import(resolve(__dirname, "NormalCommands", dirs, file));

      if (CommandFile.default.name) {
        const command: Command = new CommandFile.default();

        if(!command) continue;
        client.normalCommands.set(command.name, command);

        console.log(`[CLIENT] Comando ${command.name} adicionado com Sucesso`);
      }
    }
  })
}