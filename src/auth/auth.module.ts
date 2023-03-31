import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JWTStrategy } from "./jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { UsersRepository } from "src/users/users.repository";
import { UsersModule } from "src/users/users.module";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports: [ PassportModule, JwtModule.register({
        secret: 'test',
        signOptions: {expiresIn: 60}
    }), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [AuthService, LocalStrategy, JWTStrategy],
    exports: [AuthService]
})
export class AuthModule{

}