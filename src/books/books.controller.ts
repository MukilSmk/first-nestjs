import { Body, Controller, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/books.schema';
import { BooksService } from './books.service';
import { FormatResponseInterceptor } from "../common/interceptors/format-response.interceptor"


@Controller('books')
@UseInterceptors(FormatResponseInterceptor)
// If required we can add the message param to pass to the interceptor
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get(':_id')
    async getBook(@Param('_id') _id: any): Promise<Book> {
        return this.booksService.getBookById(_id);
    }
    @Get()
    async getBooks(): Promise<Book[]> {
        return this.booksService.getBooks();
    }

    @Post()
    async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.createBook(createBookDto.title, createBookDto.user)
    }

    @Patch(':_id')
    async updateBook(@Param('_id') _id: any, @Body() updateUserDto: UpdateBookDto): Promise<Book> {
        return this.booksService.updateBook(_id, updateUserDto);
    }

}