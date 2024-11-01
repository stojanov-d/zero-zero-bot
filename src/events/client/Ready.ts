import { Collection, Events, REST, Routes } from "discord.js";
import Event from "../../base/classes/Event";
import ExtendedClient from "../../base/classes/ExtendedClient";
import Command from "../../base/classes/Command";

export default class Ready extends Event {
  constructor(client: ExtendedClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Ready event",
      once: true,
    });
  }

  public async Execeute() {
    console.log(`${this.client.user?.tag} is ready!`);

    const commands: object[] = this.GetJson(this.client.commands);

    const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

    const setCommands: any = await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID as string,
        process.env.GUILD_ID as string
      ),
      {
        body: commands,
      }
    );

    console.log(`Successfully set commands: ${setCommands.length} commands`);
  }

  private GetJson(commands: Collection<string, Command>): object[] {
    const data: object[] = [];
    commands.forEach((command) => {
      data.push({
        name: command.name,
        description: command.description,
        options: command.options,
        default_member_permission: command.default_member_permission.toString(),
        dm_permission: command.dm_permission,
      });
    });
    return data;
  }
}
