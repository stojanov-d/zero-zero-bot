import { ChatInputCommandInteraction, Collection, Events } from "discord.js";
import Event from "../../base/classes/Event";
import ExtendedClient from "../../base/classes/ExtendedClient";
import Command from "../../base/classes/Command";

export default class CommandHandler extends Event {
  constructor(client: ExtendedClient) {
    super(client, {
      name: Events.InteractionCreate,
      description: "Handles all commands",
      once: false,
    });
  }

  Execeute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const command: Command = this.client.commands.get(interaction.commandName)!;

    if (!command) {
      interaction.reply({
        content: "Command not found",
        ephemeral: true,
      });
      this.client.commands.delete(interaction.commandName);
      return;
    }

    const { cooldowns } = this.client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (
      timestamps?.has(interaction.user.id) &&
      now < (timestamps.get(interaction.user.id) || 0) + cooldownAmount
    ) {
      const timeLeft =
        (timestamps.get(interaction.user.id) || 0) + cooldownAmount - now;
      return interaction.reply({
        content: `Please wait ${timeLeft / 1000} seconds before reusing the \`${
          command.name
        }\` command.`,
        ephemeral: true,
      });
    }

    timestamps?.set(interaction.user.id, now);
    setTimeout(() => timestamps?.delete(interaction.user.id), cooldownAmount);

    try {
      const subCommandGroup = interaction.options.getSubcommandGroup(false);
      const subCommand = `${interaction.commandName}${
        subCommandGroup ? `.${subCommandGroup}` : ""
      }.${interaction.options.getSubcommand(false) || ""}`;

      return (
        this.client.subcommands.get(subCommand)?.Execute(interaction) ||
        command.Execute(interaction)
      );
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
}
