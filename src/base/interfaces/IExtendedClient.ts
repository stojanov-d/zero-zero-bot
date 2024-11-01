import { Collection } from "discord.js";
import Command from "../classes/Command";
import SubCommand from "../classes/SubCommand";

export default interface IExtendedClient {
  commands: Collection<string, Command>;
  subcommands: Collection<string, SubCommand>;
  cooldowns: Collection<string, Collection<string, number>>;
  LoadHandlers(): void;
}
