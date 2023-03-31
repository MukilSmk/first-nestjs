import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local"
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/users/schemas/user.schema";
import { Model } from "mongoose";
import { hash_password } from "src/common/hash/hash";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){
        super()
    }

    async validate(userName: string, password: string): Promise<any>{
        // validate user from db
        const hashed_password = await hash_password(password)
        const user = await this.userModel.findOne({userName,hashed_password})
        if(user){
            return user
        }
        else{
             throw new UnauthorizedException();

        }
        
    }


}