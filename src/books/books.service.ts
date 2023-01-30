import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid"
import { UpdateBookDto } from "./dto/update-book.dto"
import { Book } from "./schemas/books.schema";
import { BooksRepository } from "./books.repository"
import { Types } from "mongoose";
@Injectable()
export class BooksService {
    constructor(private readonly booksRepository: BooksRepository) {

    }

    async getBookById(_id: any): Promise<Book> {
        return this.booksRepository.findOne({ _id })
    }

    async getBooks(): Promise<Book[]> {
        return this.booksRepository.find({})
    }

    async createBook(title: string, user: Types.ObjectId): Promise<Book> {
        return this.booksRepository.create({
            title,
            user
        })
    }

    async updateBook(_id: Types.ObjectId, bookUpdates: UpdateBookDto): Promise<Book> {
        return this.booksRepository.findByIdAndUpdate({ _id }, bookUpdates)

    }

}