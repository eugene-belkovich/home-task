import { Injectable } from "@nestjs/common";
import {InstanceDocument} from '../../schemas/instance.schema';
import { GroupDocument } from "../../schemas/group.schema";

@Injectable()
export class DiscoveryService {
  constructor() {}

  async getAllGroups(): Promise<GroupDocument[] | null> {
    return null
  }

  async getInstancesByGroup(group: string): Promise<InstanceDocument[] | null> {
    return null
  }
}
