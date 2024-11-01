import { ChatInputCommandInteraction } from "discord.js";
import ExtendedClient from "../classes/ExtendedClient";

export default interface ISubCommand {
  client: ExtendedClient;
  name: string;

  Execute(interaction: ChatInputCommandInteraction): void;
}
