import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose'
import mongoose, { Schema as MongooseSchema } from 'mongoose';

import { Document, Types } from 'mongoose';

export type BookDocument = Book & Document


@Schema({ collection: 'books' })
export class Book {
    @Prop()
    title: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

}

export const BookSchema = SchemaFactory.createForClass(Book)
