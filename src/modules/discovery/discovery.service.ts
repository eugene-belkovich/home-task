import {Get, Injectable} from '@nestjs/common';
import {InstanceDocument} from '../../schemas/instance.schema';
import {GroupDocument} from '../../schemas/group.schema';
import {GroupService} from '../group/group.service';

@Injectable()
export class DiscoveryService {
  constructor(private readonly groupService: GroupService) {}

  @Get('/')
  async getAllGroups(): Promise<GroupDocument[] | null> {
    return this.groupService.getAllGroups();
  }

  async getInstancesByGroup(group: string): Promise<InstanceDocument[] | null> {
    return null;
  }
}
