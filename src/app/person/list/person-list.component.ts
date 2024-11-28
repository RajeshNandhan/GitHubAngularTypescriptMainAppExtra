import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from 'githubnodejstypescriptprinciplelibrary/lib/model/person';
import { PersonApiService } from '../service/person-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent implements OnInit, OnDestroy {
  public persons: Person[] = [];
  private personService: PersonApiService;
  private getPersonSubscription!: Subscription;

  constructor(
    personService: PersonApiService) {
    this.personService = personService;
  }

  getPersons(): void {
    this.getPersonSubscription = this.personService.GetPersons()
    .subscribe({
        next: (persons) =>{
          this.persons = persons;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    });
  }

  ngOnInit() {
    this.getPersons();
  }
  
  ngOnDestroy() {
    this.getPersonSubscription?.unsubscribe();
  }
}
