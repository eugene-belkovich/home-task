import {Injectable} from '@nestjs/common';
import {InstanceDocument} from '../../schemas/instance.schema';
import {GroupService} from '../group/group.service';
import {InstanceService} from '../instance/instance.service';

@Injectable()
export class DiscoveryService {
  public constructor(private readonly groupService: GroupService, private readonly instanceService: InstanceService) {}

  public async registerInstance(
    group: string,
    id: string,
    meta?: Record<string, any>,
  ): Promise<InstanceDocument | null> {
    const resultGroup = await this.groupService.getOrCreate(group);
    if (!resultGroup) {
      throw new Error('Group not found');
    }
    const existingInstance = await this.instanceService.createOrUpdate(resultGroup.group, id, meta);
    const instances = await this.instanceService.getInstancesByGroup(resultGroup.group);
    if (!instances) {
      throw new Error('Instances not found');
    }
    await this.groupService.updateInstanceCount(resultGroup.group, instances?.length || 0);

    return existingInstance;
  }

  async unregisterInstance(group: string, id: string): Promise<void> {
    await this.instanceService.deleteByGroupAndId(group, id);
    const instances = await this.instanceService.getInstancesByGroup(group);
    await this.groupService.updateInstanceCount(group, instances?.length || 0);
  }
}
