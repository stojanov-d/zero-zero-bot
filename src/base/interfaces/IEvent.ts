import { Events } from "discord.js";
import ExtendedClient from "../classes/ExtendedClient";

export default interface IEvenet {
  client: ExtendedClient;
  name: Events;
  description: string;
  once: boolean;
}
