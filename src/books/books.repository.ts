import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Book, BookDocument } from "./schemas/books.schema";

@Injectable()
export class BooksRepository{
    constructor(@InjectModel(Book.name) private bookModel:Model<BookDocument>){}

    async findOne(bookFilterQuery: FilterQuery<Book>): Promise<Book>{
        return this.bookModel.findOne(bookFilterQuery);
    }

    async find(bookFilterQuery: FilterQuery<Book>): Promise<Book[]>{
        return this.bookModel.find(bookFilterQuery).populate('user')
    }

    async create(book: Book): Promise<Book>{
        const newbook = new this.bookModel(book);
        return newbook.save();
    }

    async findByIdAndUpdate(bookFilterQuery: FilterQuery<Book>,book:Partial<Book> ): Promise<Book>{
        return this.bookModel.findByIdAndUpdate(bookFilterQuery, book);
    }
}