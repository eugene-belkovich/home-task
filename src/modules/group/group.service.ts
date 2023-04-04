import {Injectable} from '@nestjs/common';
import {GroupDocument} from '../../schemas/group.schema';
import {GroupRepository} from './group.repository';

@Injectable()
export class GroupService {
  public constructor(private readonly groupRepository: GroupRepository) {}

  public async getOrCreate(group: string): Promise<GroupDocument | null> {
    let resultGroup = await this.groupRepository.findByName(group);
    if (!resultGroup) {
      resultGroup = await this.groupRepository.createGroup(group);
    }

    return resultGroup;
  }

  public async updateInstanceCount(group: string, instances: number): Promise<void> {
    await this.groupRepository.updateInstanceCount(group, instances);
  }

  public getAllGroups(): Promise<GroupDocument[] | null> {
    return this.groupRepository.findAll();
  }
}
