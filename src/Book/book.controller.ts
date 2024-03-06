import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/createbook.entity';
import { storage } from './middleware/saveImages.middleware';
import { FileInterceptor } from '@nestjs/platform-express';
import { Book } from './entities/book.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Auth/guard/auth.guard';

@Controller('book')
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiTags('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('getBooks')
  async getBooks() {
    return await this.bookService.getBooks();
  }

  @Get('getBook/:id')
  async getBook(@Param('id') id: string) {
    return await this.bookService.getBook(id);
  }

  @Post('createBook')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async createBook(
    @Body() newBook: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      console.log('Archivo subido con nombre: ' + file.filename);
      const book: Book = {
        isbn: newBook.isbn,
        title: newBook.title,
        editorial: newBook.editorial,
        anioPublicacion: newBook.anio,
        price: newBook.price,
        author: newBook.author,
        pathImage: file.filename,
      };
      return await this.bookService.createBook(book);
    } catch (error) {
      return new BadRequestException('Book not created');
    }
  }
}
