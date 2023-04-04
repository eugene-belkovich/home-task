import {Controller, Get, Param} from '@nestjs/common';
import {InstanceDocument} from '../../schemas/instance.schema';
import {GroupDocument} from '../../schemas/group.schema';
import {DiscoveryService} from './discovery.service';

@Controller()
export class DiscoveryController {
  constructor(
    private readonly discoveryService: DiscoveryService,
  ) {}

  @Get('/')
  async getAllGroups(): Promise<GroupDocument[] | null> {
    return null
  }

  @Get('/:group')
  async getInstancesByGroup(@Param('group') group: string): Promise<InstanceDocument[] | null> {
    return null
  }
}
