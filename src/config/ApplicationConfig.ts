import { GatewayIntentsString, Partials } from "discord.js";

const intents: GatewayIntentsString[] = [
  "Guilds",
  "GuildMembers",
  "GuildBans",
  "GuildEmojisAndStickers",
  "GuildIntegrations",
  "GuildWebhooks",
  "GuildInvites",
  "GuildVoiceStates",
  "GuildPresences",
  "GuildMessages",
  "GuildMessageReactions",
  "GuildMessageTyping",
  "DirectMessages",
  "DirectMessageReactions",
  "DirectMessageTyping",
  "MessageContent",
];

const partials: Partials[] = [
  Partials.User,
  Partials.Channel,
  Partials.GuildMember,
  Partials.Message,
  Partials.Reaction,
  Partials.ThreadMember
];

export default {
  intents,
  partials
}