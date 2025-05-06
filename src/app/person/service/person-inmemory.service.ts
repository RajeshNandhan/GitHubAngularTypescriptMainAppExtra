import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from 'githubnodejstypescriptprinciplelibrary/lib/model/person';
import { Logger } from 'githubnodejstypescriptprinciplelibrary/lib/log/logger';
import { InMemeoryDataService } from 'githubnodejstypescriptprinciplelibrary/lib/data/in-memeory-data.service';

@Injectable({
  providedIn: 'root',
})
export class PersonInmemoryService {
  private inMemeoryApi: InMemeoryDataService;

  constructor() {
    this.inMemeoryApi = new InMemeoryDataService();
  }

  public GetPersons(): Observable<Person[]> {
    Logger.ConsoleLog(
      'PersonInmemoryService',
      'GetPersons',
      'RowsEffected',
      this.inMemeoryApi.persons.length
    );

    return of(this.inMemeoryApi.persons);
  }

  public GetPersonByPersonId(personId: number): Observable<Person> {
    let personindex = this.inMemeoryApi.persons.findIndex(
      (x) => x.personId == personId
    );

    Logger.ConsoleLog(
      'PersonInmemoryService',
      'GetPersonByPersonId',
      'RowsEffected',
      personindex
    );

    return of(this.inMemeoryApi.persons[personindex]);
  }

  public EditPerson(person: Person, personId: number): Observable<any> {
    let personindex = this.inMemeoryApi.persons.findIndex(
      (x) => x.personId == personId
    );

    this.inMemeoryApi.persons[personindex] = person;

    Logger.ConsoleLog(
      'PersonInmemoryService',
      'EditPerson',
      'RowsEffected',
      personindex
    );

    return of(personindex);
  }

  public AddPerson(person: Person): Observable<any> {
    this.inMemeoryApi.persons.push(person);

    Logger.ConsoleLog(
      'PersonInmemoryService',
      'AddPerson',
      'RowsEffected',
      person
    );

    return of(person);
  }

  public DeletePerson(personId: number): Observable<any> {
    let personindex = this.inMemeoryApi.persons.findIndex(
      (x) => x.personId == personId
    );
    let removedBooks = [];

    if (personindex > -1) {
      removedBooks = this.inMemeoryApi.persons.splice(personindex, 1);
    }

    Logger.ConsoleLog(
      'PersonInmemoryService',
      'DeletePerson',
      'RowsEffected',
      removedBooks.length
    );

    return of(removedBooks.length);
  }
}
