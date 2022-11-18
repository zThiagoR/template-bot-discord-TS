import { 
    Client, 
    CommandInteraction,
    ApplicationCommandData
} from "discord.js";

type SlashCommand = {
    data: ApplicationCommandData;
    cooldown?: number;
    defer?: boolean;
    execute: (client: Client<true>, int: CommandInteraction) => any | Promise<any>;
}

export { SlashCommand };