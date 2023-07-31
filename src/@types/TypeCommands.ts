import { 
    ApplicationCommandData,
    ChatInputCommandInteraction,
    Client
} from "discord.js";

type SlashCommand = {
    data: ApplicationCommandData;
    cooldown?: number;
    defer?: boolean;
    execute: (client: Client<true>, int: ChatInputCommandInteraction) => any | Promise<any>;
}

export { SlashCommand };