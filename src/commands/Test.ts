import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import Command from "../base/classes/Command";
import ExtendedClient from "../base/classes/ExtendedClient";
import Category from "../base/enums/Category";

export default class Test extends Command {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "test",
      description: "A test command",
      category: Category.Utilities,
      options: [], // for subCommands
      default_member_permission: PermissionFlagsBits.UseApplicationCommands,
      dm_permission: true,
      cooldown: 3,
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: "slavce",
      ephemeral: false,
    });
  }
}
