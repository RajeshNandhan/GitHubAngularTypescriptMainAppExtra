import { Injectable } from '@angular/core';
import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  public BookApiBaseUrl: string;
  public PersonApiBaseUrl: string;
  public IsInMemoryRequest: boolean;
  public AppEnvironmentName: string;

  constructor() {
    this.BookApiBaseUrl = environment.bookApiBaseUrl;
    this.PersonApiBaseUrl = environment.personApiBaseUrl;
    this.IsInMemoryRequest = environment.isInMemoryRequest;
    this.AppEnvironmentName = environment.appEnvironmentName;
  }
}
