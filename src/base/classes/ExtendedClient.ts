import { Client, Collection } from "discord.js";
import IExtendedClient from "../interfaces/IExtendedClient";
import "dotenv/config";
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";

export default class ExtendedClient extends Client implements IExtendedClient {
  handler: Handler;
  commands: Collection<string, Command>;
  subcommands: Collection<string, SubCommand>;
  cooldowns: Collection<string, Collection<string, number>>;

  constructor() {
    super({ intents: [] });

    this.handler = new Handler(this);
    this.commands = new Collection();
    this.subcommands = new Collection();
    this.cooldowns = new Collection();
  }

  Init(): void {
    this.LoadHandlers();

    this.login(process.env.DISCORD_TOKEN).catch((err) => console.log(err));
  }

  LoadHandlers(): void {
    this.handler.LoadEvents();
    this.handler.LoadCommands();
  }
}
