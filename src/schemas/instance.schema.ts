import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Instance extends Document {
  @Prop({required: true})
  public id: string;

  @Prop({required: true})
  public group: string;

  @Prop({required: true})
  public createdAt: number;

  @Prop({required: true})
  public updatedAt: number;

  @Prop({type: Object})
  public meta?: Record<string, any>;

  public constructor(id: string, group: string, createdAt: number, updatedAt: number, meta?: Record<string, any>) {
    super();
    this.id = id;
    this.group = group;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.meta = meta;
  }
}

export const InstanceSchema = SchemaFactory.createForClass(Instance);

export type InstanceDocument = Instance & Document;
