import { Injectable } from '@angular/core';
//import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiEndPoint
{
    public BookApiBaseUrl : string;
    public PersonApiBaseUrl : string;

    constructor()
    {
      this.BookApiBaseUrl = 'http://localhost:6102/api/book';
      this.PersonApiBaseUrl = 'http://localhost:6102/api/person';
    }
}