import { Collection, CommandInteraction } from "discord.js";

import { SlashCommand } from "../TypeCommands";

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>;
        normalCommands: Collection<string, Command>;
        cooldownsNormal:  Collection<string, Collection<string, number>>;
        cooldownsSlash: Collection<string, number>;
    };
};