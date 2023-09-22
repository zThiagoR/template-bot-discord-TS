import { 
    ApplicationCommandData,
    AutocompleteInteraction,
    CacheType,
    Client, 
    CommandInteraction,
    Message,
    PermissionsString,
    UserContextMenuCommandInteraction,
} from "discord.js";

type SlashCommand = {
    data: ApplicationCommandData;
    cooldown?: number;
    defer?: boolean;
    execute: (client: Client<true>, int: CommandInteraction) => any | Promise<any>;
    autocomplete?: (client: Client<true>, int: AutocompleteInteraction) => any | Promise<any>;
}

type MenuCommand = {
    data: ApplicationCommandData;
    cooldown?: number;
    defer?: boolean;
    execute: (client: Client<true>, int: UserContextMenuCommandInteraction) => any | Promise<any>;
}

type Command = {
    name: string;
    aliases?: string[];
    description: string;
    member_perm?: PermissionsString[];
    client_perm?: PermissionsString[];
    is_developer?: boolean;
    cooldown?: number;
    sub_cmd: string[];
    execute: (client: Client, message: Message, args: string[]) => any | Promise<any>; 
  };

export { SlashCommand, MenuCommand, Command };