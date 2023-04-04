import {Injectable} from '@nestjs/common';
import {InstanceRepository} from './instance.repository';
import {InstanceDocument} from "../../schemas/instance.schema";

@Injectable()
export class InstanceService {
  constructor(private readonly instanceRepository: InstanceRepository) {}

  async getInstancesByGroup(group: string): Promise<InstanceDocument[] | null> {
    return this.instanceRepository.findAllByGroupName(group);
  }
}
