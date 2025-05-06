import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'githubnodejstypescriptprinciplelibrary/lib/model/person';
import { PersonInmemoryService } from './person-inmemory.service';
import { PersonApiService } from './person-api.service';
import { EnvironmentService } from '../../../environments/environment-service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  isInMemoryRequest = true;

  constructor(
    private personInmemoryService: PersonInmemoryService,
    private personApiService: PersonApiService,
    private environmentService: EnvironmentService
  ) {
    debugger
    this.isInMemoryRequest = environmentService.IsInMemoryRequest;
  }

  public GetPersons(): Observable<Person[]> {
    if (this.isInMemoryRequest) {
      return this.personInmemoryService.GetPersons();
    } else {
      return this.personApiService.GetPersons();
    }
  }

  public GetPersonByPersonId(personId: number): Observable<Person> {
    if (this.isInMemoryRequest) {
      return this.personInmemoryService.GetPersonByPersonId(personId);
    } else {
      return this.personApiService.GetPersonByPersonId(personId);
    }
  }

  public EditPerson(person: Person, personId: number): Observable<any> {
    if (this.isInMemoryRequest) {
      return this.personInmemoryService.EditPerson(person, personId);
    } else {
      return this.personApiService.EditPerson(person, personId);
    }
  }

  public AddPerson(person: Person): Observable<any> {
    if (this.isInMemoryRequest) {
      return this.personInmemoryService.AddPerson(person);
    } else {
      return this.personApiService.AddPerson(person);
    }
  }

  public DeletePerson(personId: number): Observable<any> {
    if (this.isInMemoryRequest) {
      return this.personInmemoryService.DeletePerson(personId);
    } else {
      return this.personApiService.DeletePerson(personId);
    }
  }
}
