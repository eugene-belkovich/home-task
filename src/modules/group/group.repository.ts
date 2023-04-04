import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Group, GroupDocument} from '../../schemas/group.schema';
import {transform} from '../../utils/mongoose-transform';

@Injectable()
export class GroupRepository {
  public constructor(@InjectModel(Group.name) private GroupModel: Model<GroupDocument>) {}

  public async createGroup(group: string): Promise<GroupDocument | null> {
    try {
      const createdGroup = new this.GroupModel({
        group,
        instances: '0',
        createdAt: new Date().getTime(),
        lastUpdatedAt: new Date().getTime(),
      });
      const resultGroup = await createdGroup.save();
      return resultGroup.toObject({getters: true, versionKey: false, transform});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async updateInstanceCount(group: string, instances: number): Promise<void> {
    try {
      const existingGroup = await this.GroupModel.findOne({group});
      if (!existingGroup) {
        throw new Error(`Instance with group name "${group}" does not exist`);
      }
      existingGroup.instances = String(instances);
      const resultGroup = await existingGroup.save();
      return resultGroup.toObject({getters: true, versionKey: false, transform});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async findAll(): Promise<GroupDocument[] | null> {
    try {
      const groups = await this.GroupModel.find();
      const resultGroups = groups?.map((group) => {
        return group.toObject({getters: true, versionKey: false, transform});
      });

      return resultGroups;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async findByName(group: string): Promise<GroupDocument | null> {
    try {
      const foundGroup = await this.GroupModel.findOne({group});

      if (!foundGroup) {
        return null;
      }

      return foundGroup.toObject({getters: true, versionKey: false, transform});
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
