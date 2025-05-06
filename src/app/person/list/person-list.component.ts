import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from 'githubnodejstypescriptprinciplelibrary/lib/model/person';
import { PersonService } from '../service/person-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss',
})
export class PersonListComponent implements OnInit, OnDestroy {
  public persons: Person[] = [];
  private getPersonSubscription!: Subscription;
  private message: string = '';
  constructor(private personService: PersonService) {}

  searchRequestHandle(message: string) {
    this.message = message;
  }

  getPersons(): void {
    debugger
    this.getPersonSubscription = this.personService.GetPersons().subscribe({
      next: (persons) => {
        this.persons = persons;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  ngOnInit() {
    this.getPersons();
  }

  ngOnDestroy() {
    this.getPersonSubscription?.unsubscribe();
  }
}
