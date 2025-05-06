import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'githubnodejstypescriptprinciplelibrary/lib/model/book';
import { BookInmemoryService } from './book-inmemory.service';
import { BookApiService } from './book-api.service';
import { EnvironmentService } from '../../../environments/environment-service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  isInMemoryRequest = true;

  constructor(
    private bookInmemoryService: BookInmemoryService,
    private bookApiService: BookApiService,
    private environmentService: EnvironmentService
  ) {
    this.isInMemoryRequest = environmentService.IsInMemoryRequest;
  }

  public GetBooks(): Observable<Book[]> {
    if (this.isInMemoryRequest) {
      return this.bookInmemoryService.GetBooks();
    } else {
      return this.bookApiService.GetBooks();
    }
  }

  public GetBookByBookId(bookId: number): Observable<Book> {
    if (this.isInMemoryRequest) {
      return this.bookInmemoryService.GetBookByBookId(bookId);
    } else {
      return this.bookApiService.GetBookByBookId(bookId);
    }
  }

  public EditBook(book: Book, bookId: number): Observable<any> {
    if (this.isInMemoryRequest) {
      return this.bookInmemoryService.EditBook(book, bookId);
    } else {
      return this.bookApiService.EditBook(book, bookId);
    }
  }

  public AddBook(book: Book): Observable<any> {
    if (this.isInMemoryRequest) {
      return this.bookInmemoryService.AddBook(book);
    } else {
      return this.bookApiService.AddBook(book);
    }
  }

  public DeleteBook(bookId: number): Observable<any> {
    if (this.isInMemoryRequest) {
      return this.bookInmemoryService.DeleteBook(bookId);
    } else {
      return this.bookApiService.DeleteBook(bookId);
    }
  }
}
