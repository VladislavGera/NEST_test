import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema()
export class News {
  @Prop()
  id: string;
  @Prop()
  likes: number;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  date: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
