import { Events } from "discord.js";
import IEvenet from "../interfaces/IEvent";
import IEventOptions from "../interfaces/IEventOptions";
import ExtendedClient from "./ExtendedClient";

export default class Event implements IEvenet {
  public client: ExtendedClient;
  public name: Events;
  public description: string;
  public once: boolean;

  constructor(client: ExtendedClient, options: IEventOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.once = options.once;
  }

  Execeute(...args: any): void {}
}
