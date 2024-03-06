import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async getBooks(): Promise<Book[]> {
    const arrayBooks = await this.bookRepository.find();
    if (arrayBooks.length === 0) {
      throw new BadRequestException('No books found');
    }
    return arrayBooks;
  }

  async getBook(id: string) {
    const book = await this.bookRepository.findOneOrFail({
      where: {
        isbn: id,
      },
    });
    if (book === null) {
      throw new BadRequestException('Book not found');
    }
    return book;
  }

  async createBook(newBook: Book) {
    const bookExists = await this.bookRepository.findOne({
      where: {
        isbn: newBook.isbn,
      },
    });
    if (bookExists) {
      throw new BadRequestException('Book already exists');
    }
    const book = this.bookRepository.create(newBook);
    return await this.bookRepository.save(book);
  }
}
