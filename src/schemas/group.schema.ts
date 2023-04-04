import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Group {
  @Prop({required: true})
  group: string;

  @Prop({required: true})
  instances: string;

  @Prop({required: true})
  createdAt: number;

  @Prop({required: true})
  lastUpdatedAt: number;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

export type GroupDocument = Group & Document;
