import { Collection, CommandInteraction } from "discord.js";

import { SlashCommand } from "../TypeCommands";

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>;
        cooldowns: Collection<string, Collection<string, number>>;
    };
};