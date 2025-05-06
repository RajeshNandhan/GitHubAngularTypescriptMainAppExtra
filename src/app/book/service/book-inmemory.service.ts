import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from 'githubnodejstypescriptprinciplelibrary/lib/model/book';
import { Logger } from 'githubnodejstypescriptprinciplelibrary/lib/log/logger';
import { InMemeoryDataService } from 'githubnodejstypescriptprinciplelibrary/lib/data/in-memeory-data.service';

@Injectable({
  providedIn: 'root',
})
export class BookInmemoryService {
  private inMemeoryApi: InMemeoryDataService;

  constructor() {
    this.inMemeoryApi = new InMemeoryDataService();
  }

  public GetBooks(): Observable<Book[]> {
    Logger.ConsoleLog(
      'BookInmemoryService',
      'GetBooks',
      'RowsEffected',
      this.inMemeoryApi.books.length
    );

    return of(this.inMemeoryApi.books);
  }

  public GetBookByBookId(bookId: number): Observable<Book> {
    let bookindex = this.inMemeoryApi.books.findIndex(
      (x) => x.bookId == bookId
    );

    Logger.ConsoleLog(
      'BookInmemoryService',
      'GetBookByBookId',
      'RowsEffected',
      bookindex
    );

    return of(this.inMemeoryApi.books[bookindex]);
  }

  public EditBook(book: Book, bookId: number): Observable<any> {
    let bookindex = this.inMemeoryApi.books.findIndex(
      (x) => x.bookId == bookId
    );

    this.inMemeoryApi.books[bookindex] = book;

    Logger.ConsoleLog(
      'BookInmemoryService',
      'EditBook',
      'RowsEffected',
      bookindex
    );

    return of(bookindex);
  }

  public AddBook(book: Book): Observable<any> {
    this.inMemeoryApi.books.push(book);

    Logger.ConsoleLog('BookInmemoryService', 'AddBook', 'RowsEffected', book);

    return of(book);
  }

  public DeleteBook(bookId: number): Observable<any> {
    let bookindex = this.inMemeoryApi.books.findIndex(
      (x) => x.bookId == bookId
    );
    let removedBooks = [];

    if (bookindex > -1) {
      removedBooks = this.inMemeoryApi.books.splice(bookindex, 1);
    }

    Logger.ConsoleLog(
      'BookInmemoryService',
      'DeleteBook',
      'RowsEffected',
      removedBooks.length
    );

    return of(removedBooks.length);
  }
}
