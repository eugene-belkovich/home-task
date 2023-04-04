import {Injectable} from '@nestjs/common';
import {GroupDocument} from '../../schemas/group.schema';
import {GroupRepository} from './group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async getAllGroups(): Promise<GroupDocument[] | null> {
    return this.groupRepository.findAll();
  }
}
