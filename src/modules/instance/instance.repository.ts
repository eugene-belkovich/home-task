import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Instance, InstanceDocument} from '../../schemas/instance.schema';
import {transform} from '../../utils/mongoose-transform';
import {GroupDocument} from '../../schemas/group.schema';

@Injectable()
export class InstanceRepository {
  public constructor(@InjectModel(Instance.name) private InstanceModel: Model<InstanceDocument>) {}

  public async create(id: string, group: string, meta?: Record<string, any>): Promise<InstanceDocument | null> {
    try {
      const createdInstance = new this.InstanceModel({
        id,
        group,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        meta,
      });
      const instance = await createdInstance.save();
      return instance.toObject({getters: true, versionKey: false, transform});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async update(id: string, meta?: Record<string, any>): Promise<InstanceDocument | null> {
    try {
      const existingInstance = await this.findById(id);
      if (!existingInstance) {
        throw new Error(`Instance with ID ${id} does not exist`);
      }
      existingInstance.updatedAt = new Date().getTime();
      existingInstance.meta = meta;
      const instance = await existingInstance.save();
      return instance.toObject({getters: true, versionKey: false, transform});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public findById(id: string): Promise<InstanceDocument | null> {
    try {
      return this.InstanceModel.findOne({id});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async findAll(): Promise<InstanceDocument[] | null> {
    try {
      const instances = await this.InstanceModel.find();
      const resultInstances = instances?.map((instance) => {
        return instance.toObject({getters: true, versionKey: false, transform});
      });

      return resultInstances;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async findByGroupAndId(group: string, id: string): Promise<InstanceDocument | null> {
    try {
      const instance = await this.InstanceModel.findOne({group, id});
      if (!instance) {
        return null;
      }
      return instance.toObject({getters: true, versionKey: false, transform});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async findAllByGroupName(group: string): Promise<InstanceDocument[] | null> {
    try {
      const instances = await this.InstanceModel.find({group});
      const resultInstances = instances?.map((instance) => {
        return instance.toObject({getters: true, versionKey: false, transform});
      });

      return resultInstances;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async findMostRecentInstance(): Promise<InstanceDocument | null> {
    try {
      const recentInstance = await this.InstanceModel.findOne().sort({updatedAt: -1});
      if (!recentInstance) {
        return null;
      }
      return recentInstance.toObject({getters: true, versionKey: false, transform});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async deleteByGroupAndId(group: string, id: string): Promise<void> {
    await this.InstanceModel.deleteOne({group, id});
  }

  public async deleteById(id: string): Promise<void> {
    await this.InstanceModel.deleteOne({id});
  }
}
