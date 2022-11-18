import { ApplicationCommandDataResolvable, ApplicationCommandOptionType, Client, CommandInteraction } from 'discord.js';

export default class PingCommand {
  data: ApplicationCommandDataResolvable;
  cooldown?: number;
  ephemeral?: boolean;
  defer: boolean;

  constructor() {
    this.data = {
      name: 'lojinha',
      description: 'Ver os produtos disponiveis na lojinha da STAFF',
      options: [
        {
          name: 'produto',
          type: ApplicationCommandOptionType.String,
          description: 'Escolher um produto pra comprar',
          choices: [
            {
              name: 'Cubos',
              value: 'cubos'
            },
            {
              name: 'Gift Card',
              value: 'giftcard'
            },
            {
              name: 'Discord Nitro',
              value: 'nitro'
            },
            {
              name: 'IFood',
              value: 'ifood'
            },
            {
              name: 'Especial',
              value: 'especial'
            },
            {
              name: 'Staff Cubeiro',
              value: 'staffcubeiro'
            },
            {
              name: 'Medalha Maratona',
              value: 'maratona'
            },
            {
              name: 'TAG Craftlandiano',
              value: 'craftlandiano'
            }, 
            {
              name: 'TAG Ostentador',
              value: 'ostentador'
            }
          ]
        }
      ]
    }
  }

  execute(client: Client<true>, int: CommandInteraction) {
    
  }
}