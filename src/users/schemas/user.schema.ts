import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose'
import { Document } from 'mongoose';

export type UserDocument = User & Document


@Schema({ collection: 'users'})
export class User{
    
    @Prop()
    userId: string;
    
    @Prop({
        unique: true,
        required: [true, 'User name must not be empty']
      })
    userName:string;

    @Prop({validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
      },
      required: [true, "User Email must not be empty"]})
    email: string;

    @Prop()
    age: number;
}

export const UserSchema = SchemaFactory.createForClass(User)