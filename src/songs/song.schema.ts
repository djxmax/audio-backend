import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Song extends Document {
id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop()
  album: string;

  @Prop()
  duration: number;   

  @Prop()
  url: string;

  @Prop()
  coverUrl: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);