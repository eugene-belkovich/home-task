import {Injectable} from '@nestjs/common';
import {InstanceRepository} from './instance.repository';
import {InstanceDocument} from '../../schemas/instance.schema';

@Injectable()
export class InstanceService {
  public constructor(private readonly instanceRepository: InstanceRepository) {}

  public async createOrUpdate(group: string, id: string, meta?: Record<string, any>): Promise<InstanceDocument | null> {
    const existingInstance = await this.instanceRepository.findByGroupAndId(group, id);
    if (existingInstance) {
      const updatedInstance = await this.instanceRepository.update(id, meta);
      return updatedInstance;
    }
    const newInstance = await this.instanceRepository.create(id, group, meta);
    return newInstance;
  }

  public getInstancesByGroup(group: string): Promise<InstanceDocument[] | null> {
    return this.instanceRepository.findAllByGroupName(group);
  }

  async deleteByGroupAndId(group: string, id: string): Promise<void> {
    await this.instanceRepository.deleteByGroupAndId(group, id);
  }
}
