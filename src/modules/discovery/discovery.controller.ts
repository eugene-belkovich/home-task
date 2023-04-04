import {Body, Controller, Delete, Get, HttpCode, Param, Post} from '@nestjs/common';
import {Instance, InstanceDocument} from '../../schemas/instance.schema';
import {GroupDocument} from '../../schemas/group.schema';
import {DiscoveryService} from './discovery.service';
import {GroupService} from '../group/group.service';
import {InstanceService} from '../instance/instance.service';
import {ApiTags} from '@nestjs/swagger';

@Controller()
@ApiTags('Discovery')
export class DiscoveryController {
  public constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly groupService: GroupService,
    private readonly instanceService: InstanceService,
  ) {}

  @Get('/')
  @HttpCode(200)
  public getAllGroups(): Promise<GroupDocument[] | null> {
    return this.groupService.getAllGroups();
  }

  @Get('/:group')
  @HttpCode(200)
  public getInstancesByGroup(@Param('group') group: string): Promise<InstanceDocument[] | null> {
    return this.instanceService.getInstancesByGroup(group);
  }

  @Post(':group/:id')
  @HttpCode(201)
  public registerInstance(
    @Param('group') group: string,
    @Param('id') id: string,
    @Body() meta?: Record<string, any>,
  ): Promise<Instance | null> {
    return this.discoveryService.registerInstance(group, id, meta);
  }

  @Delete(':group/:id')
  @HttpCode(200)
  public async unregisterInstance(@Param('group') group: string, @Param('id') id: string): Promise<void> {
    await this.discoveryService.unregisterInstance(group, id);
  }
}
