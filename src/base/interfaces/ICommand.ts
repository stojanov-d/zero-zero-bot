import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
} from "discord.js";
import ExtendedClient from "../classes/ExtendedClient";
import Category from "../enums/Category";

export default interface ICommand {
  clinet: ExtendedClient;
  name: string;
  description: string;
  category: Category;
  options: object;
  default_member_permission: bigint;
  dm_permission: boolean;
  cooldown: number;

  Execute(interaction: ChatInputCommandInteraction): void;
  AutoComplete(interaction: AutocompleteInteraction): void;
}
