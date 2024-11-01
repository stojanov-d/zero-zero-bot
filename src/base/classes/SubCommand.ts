import { ChatInputCommandInteraction } from "discord.js";
import ISubCommand from "../interfaces/ISubCommand";
import ISubCommandOptions from "../interfaces/ISubCommandOptions";
import ExtendedClient from "./ExtendedClient";

export default class SubCommand implements ISubCommand {
  public client: ExtendedClient;
  public name: string;

  constructor(client: ExtendedClient, options: ISubCommandOptions) {
    this.client = client;
    this.name = options.name;
  }

  public Execute(interaction: ChatInputCommandInteraction): void {
    throw new Error("Method not implemented.");
  }
}
