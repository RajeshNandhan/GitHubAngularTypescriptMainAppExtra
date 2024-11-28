import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from 'githubnodejstypescriptprinciplelibrary/lib/model/book';
import { BookApiService } from '../service/book-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit, OnDestroy {
  public books: Book[] = [];
  private bookService: BookApiService;
  private getBookSubscription!: Subscription;

  constructor(
    bookService: BookApiService) {
    this.bookService = bookService;
  }

  getBooks(): void {
    this.getBookSubscription = this.bookService.GetBooks()
    .subscribe({
        next: (books) =>{
          this.books = books;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    });
  }

  ngOnInit() {
    this.getBooks();
  }
  
  ngOnDestroy() {
    this.getBookSubscription?.unsubscribe();
  }
}
