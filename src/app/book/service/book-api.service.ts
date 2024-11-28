import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from 'githubnodejstypescriptprinciplelibrary/lib/model/book';
import { Logger } from 'githubnodejstypescriptprinciplelibrary/lib/log/logger';
import { ApiEndPoint } from '../../shared/constant/api-endpoint';


@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //private logger: Logger, 
  constructor(private http: HttpClient, private endpoints: ApiEndPoint) {
  }

  public GetBooks(): Observable<Book[]> {

    const requestUrl = this.endpoints.BookApiBaseUrl;

    return this.http.get<Book[]>(requestUrl)
      .pipe(
        map(books => books),
        //catchError()
      );
  }
  
  public GetBookByBookId(bookid: number): Observable<Book> {

    const requestUrl = this.endpoints.BookApiBaseUrl + '/' + bookid;

    return this.http.get<Book>(requestUrl)
    .pipe(
      map(book => book),
      //catchError(this.logger.HandleError<Book>('GetBookByBookId', null))
    );
  }

  public EditBook(book: Book, bookid: number): Observable<any> {

    const requestUrl = this.endpoints.BookApiBaseUrl + '/' + bookid;

    return this.http.put<Book>(requestUrl, book, this.httpOptions).pipe(
      tap(_ => {
      }),
      //catchError(this.logger.HandleError<Book>('EditBook'))
    );
  }

  public AddBook(book: Book): Observable<any> {

    const requestUrl = this.endpoints.BookApiBaseUrl;

    return this.http.post<Book>(requestUrl, book, this.httpOptions).pipe(
      tap(_ => {
      }),
      //catchError(this.logger.HandleError<Book>('EditBook'))
    );
  }

  public DeleteBook(bookid: number): Observable<any> {

    const requestUrl = this.endpoints.BookApiBaseUrl + '/' + bookid;

    return this.http.delete<Book>(requestUrl, this.httpOptions).pipe(
      tap(_ => {
      }),
      //catchError(this.logger.HandleError<Book>('EditBook'))
    );
  }
}
