import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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
  timestamps: true,
})
export class Playlist extends Document {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  coverUrl: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Song' }] })
  songs: Types.ObjectId[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);