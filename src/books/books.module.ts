import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, BookSchema } from "./schemas/books.schema";
import { BooksController } from "./books.controller";
import { BooksRepository } from "./books.repository";
import { BooksService } from "./books.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
    controllers: [BooksController],
    providers: [BooksService, BooksRepository]
})
export class BooksModule {}