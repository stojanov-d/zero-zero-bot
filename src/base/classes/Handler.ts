import { glob } from "glob";
import IHandler from "../interfaces/IHandler";
import path from "path";
import ExtendedClient from "./ExtendedClient";
import Event from "./Event";
import { ClientEvents } from "discord.js";
import Command from "./Command";
import SubCommand from "./SubCommand";
export default class Handler implements IHandler {
  client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public async LoadEvents() {
    const files = (await glob(`build/events/**/*.js`)).map((filePath: string) =>
      path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const event: Event = new (await import(file)).default(this.client);

      if (!event.name) {
        delete require.cache[require.resolve(file)];
        return console.log(
          `[ERROR] Event ${file.split("/").pop()} is missing a name property`
        );
      }

      const execute = (...args: any) => event.Execeute(...args);

      //@ts-ignore
      if (event.once) {
        this.client.once(event.name as keyof ClientEvents, execute);
      } else {
        this.client.on(event.name as keyof ClientEvents, execute);
      }

      return delete require.cache[require.resolve(file)];
    });
  }

  public async LoadCommands() {
    const files = (await glob(`build/commands/**/*.js`)).map(
      (filePath: string) => path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const command: Command | SubCommand = new (await import(file)).default(
        this.client
      );

      if (!command.name) {
        delete require.cache[require.resolve(file)];
        return console.log(
          `[ERROR] Command ${file.split("/").pop()} is missing a name property`
        );
      }

      if (command instanceof SubCommand) {
        this.client.subcommands.set(command.name, command);
      } else {
        this.client.commands.set(command.name, command as Command);
      }

      return delete require.cache[require.resolve(file)];
    });
  }
}
