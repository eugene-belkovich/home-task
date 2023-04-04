import {Controller, Get, Param} from '@nestjs/common';
import {InstanceDocument} from '../../schemas/instance.schema';
import {GroupDocument} from '../../schemas/group.schema';
import {DiscoveryService} from './discovery.service';
import { GroupService } from "../group/group.service";

@Controller()
export class DiscoveryController {
  public constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly groupService: GroupService,

  ) {}

  @Get('/')
  async getAllGroups(): Promise<GroupDocument[] | null> {
    return this.groupService.getAllGroups();
  }


  @Get('/:group')
  public async getInstancesByGroup(@Param('group') group: string): Promise<InstanceDocument[] | null> {
    return null;
  }
}
