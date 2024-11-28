import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Book } from 'githubnodejstypescriptprinciplelibrary/lib/model/book';
import { BookApiService } from '../service/book-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageAction } from '../../shared/constant/page-action';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BookEditComponent implements OnInit, OnDestroy {

  bookId!: number;
  selectedBook!: Book;
  bookService: BookApiService;
  private getBookByBookIdSubscription!: Subscription;
  private editBookSubscription!: Subscription;
  private addBookSubscription!: Subscription;
  private deleteBookSubscription!: Subscription;
  action!: string;
  pageError: string = '';

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    bookService: BookApiService) {
      this.bookService = bookService;
  }

  getBookByBookId(bookid: number): void {
    this.getBookByBookIdSubscription = this.bookService.GetBookByBookId(bookid)
      .subscribe({
        next: (book) =>{
          this.selectedBook = book;
          console.log(this.selectedBook)
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    });
  }

  saveBook(): void {
    if(this.validateBook()){
      if(this.action == PageAction.EditAction){
        this.editBook();
      } 
      
      if(this.action == PageAction.AddAction){
        this.addBook();
      } 
    }
  }

  addBook(): void {
    this.addBookSubscription = this.bookService.AddBook(this.selectedBook)
      .subscribe({
        next: (value) =>{
          console.log(value)
        },
        error: (e) => console.error(e),
        complete: () => {this.routeBack(PageAction.AddAction,'true');}
    });
  }

  editBook(): void {
    this.editBookSubscription = this.bookService.EditBook(this.selectedBook, this.bookId)
      .subscribe({
        next: (value) =>{
          console.log(value)
        },
        error: (e) => console.error(e),
        complete: () => {this.routeBack(PageAction.EditAction,'true');}
    });
  }

  deleteBook(): void {
    this.deleteBookSubscription = this.bookService.DeleteBook(this.bookId)
      .subscribe({
        next: (value) =>{
          console.log(value)
        },
        error: (e) => console.error(e),
        complete: () => {
          this.routeBack(PageAction.DeleteAction,'true');
        }
    });
  }

  validateBook(): boolean {
    debugger
    this.pageError = '';
    if(this.selectedBook.bookCategory === '')
    {
      this.pageError = this.pageError + 'bookCategory empty';
      return false;
    }
    if(this.selectedBook.bookName === '')
      {
        this.pageError = this.pageError + 'bookName empty';
        return false;
      }
      if(this.selectedBook.edition === '')
        {
          this.pageError = this.pageError + 'edition empty';
          return false;
        }
        if(!this.selectedBook.image)
          {
            this.pageError = this.pageError + 'image empty';
            return false;
          }
          if(!this.selectedBook.price)
            {
              this.pageError = this.pageError + 'price empty';
              return false;
            }
      return true
  }
  
  cancel(): void {
    this.routeBack(PageAction.CancelAction,'true')
  }

  routeBack(action: string, state: string): void {
    this.router.navigate(
      ['/book'],
      {
        queryParams: {
          action: action,
          state: state,
          id: this.bookId
        }
      }
    )
  }

  ngOnInit() {
    this.bookId = this.route.snapshot.params['id'];

    if(this.bookId){
      this.getBookByBookId(this.bookId);
      this.action = PageAction.EditAction;
    } else{
      this.action = PageAction.AddAction;
      this.selectedBook = {
        id: null,
        bookId: 0,
        bookCategory: '',
        bookName: '',
        edition: '',
        image: '',
        price: 0,
        personId:11,
        dateCreated: new Date(2024,11,11)
      };
    }   
  }

  ngOnDestroy() {
    this.getBookByBookIdSubscription?.unsubscribe();
    this.deleteBookSubscription?.unsubscribe();
    this.editBookSubscription?.unsubscribe();
    this.addBookSubscription?.unsubscribe();
  }
}
