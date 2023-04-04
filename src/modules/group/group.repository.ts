import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Group, GroupDocument} from '../../schemas/group.schema';
import {transform} from '../../utils/mongoose-transform';

@Injectable()
export class GroupRepository {
  constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>) {}
  async findAll(): Promise<GroupDocument[] | null> {
    const groups = await this.groupModel.find();
    const resultGroups = groups?.map((group) => {
      return group.toObject({getters: true, versionKey: false, transform});
    });

    return resultGroups;
  }
}
