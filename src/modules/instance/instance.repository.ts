import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Instance, InstanceDocument} from '../../schemas/instance.schema';
import {transform} from '../../utils/mongoose-transform';

@Injectable()
export class InstanceRepository {
  constructor(@InjectModel(Instance.name) private instanceModel: Model<InstanceDocument>) {}

  async findAllByGroupName(group: string): Promise<InstanceDocument[] | null> {
    const instances = await this.instanceModel.find({group});
    const resultInstances = instances?.map((instance) => {
      return instance.toObject({getters: true, versionKey: false, transform});
    });

    return resultInstances;
  }
}
