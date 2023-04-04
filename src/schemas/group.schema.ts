import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Group extends Document {
  @Prop({required: true})
  public group: string;

  @Prop({required: true})
  public instances: string;

  @Prop({required: true})
  public createdAt: number;

  @Prop({required: true})
  public lastUpdatedAt: number;

  public constructor(group: string, instances: string, createdAt: number, lastUpdatedAt: number) {
    super();
    this.group = group;
    this.instances = instances;
    this.createdAt = createdAt;
    this.lastUpdatedAt = lastUpdatedAt;
  }
}

export const GroupSchema = SchemaFactory.createForClass(Group);

export type GroupDocument = Group & Document;
