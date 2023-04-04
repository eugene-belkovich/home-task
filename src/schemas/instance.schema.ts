import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Instance extends Document {
  @Prop({required: true})
  id: string;

  @Prop({required: true})
  group: string;

  @Prop({required: true})
  createdAt: number;

  @Prop({required: true})
  updatedAt: number;

  @Prop({type: Object})
  meta?: Record<string, any>;
}

export const InstanceSchema = SchemaFactory.createForClass(Instance);

export type InstanceDocument = Instance & Document;
