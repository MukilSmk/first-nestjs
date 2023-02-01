import { Injectable } from "@nestjs/common";
import {v4 as uuidv4} from "uuid"
import {UpdateUserDto} from "./dto/update-user.dto"
import { User } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository"
import { hash_password } from "../common/hash/hash";

@Injectable()
export class UsersService{
    constructor(private readonly usersRepository:UsersRepository ){

    }

    async getUserById(userId: string): Promise<User>{
        return this.usersRepository.findOne({userId})
    }
    async getUserByUserName(userName: string): Promise<User>{
        return this.usersRepository.findOne({userName})
    }

    async getUsers(): Promise<User[]>{
        return this.usersRepository.find({})
    }

    async createUser(email: string, age: number, userName: string, password:string): Promise<User>{
        const hashed_password = await hash_password(password)
        return this.usersRepository.create({
            userId: uuidv4(),
            userName,
            email,
            age,
            password: hashed_password
        })
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User>{
        const hashed_password = await hash_password(userUpdates.password)
        userUpdates.password = hashed_password
        return this.usersRepository.findOneAndUpdate({userId}, userUpdates)

    }

    async deleteUser(userId: string): Promise<User>{
        return this.usersRepository.deleteOne(userId)

    }

    async searchUser(userName: any): Promise<User[]>{
        return this.usersRepository.find({
            "$or": [{
                userName: {
                    $regex: new RegExp(userName, "i")
                }
            }]
        })
    }
    
}