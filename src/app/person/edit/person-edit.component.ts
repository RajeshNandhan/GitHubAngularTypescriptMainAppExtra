import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Person } from 'githubnodejstypescriptprinciplelibrary/lib/model/person';
import { PersonApiService } from '../service/person-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageAction } from '../../shared/constant/page-action';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PersonEditComponent implements OnInit, OnDestroy {

  personId!: number;
  selectedPerson!: Person;
  personService: PersonApiService;
  private getPersonByPersonIdSubscription!: Subscription;
  private editPersonSubscription!: Subscription;
  private addPersonSubscription!: Subscription;
  private deletePersonSubscription!: Subscription;
  action!: string;
  pageError: string = '';

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    personService: PersonApiService) {
      this.personService = personService;
  }

  getPersonByPersonId(personid: number): void {
    this.getPersonByPersonIdSubscription = this.personService.GetPersonByPersonId(personid)
      .subscribe({
        next: (person) =>{
          this.selectedPerson = person;
          console.log(this.selectedPerson)
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    });
  }

  savePerson(): void {
    if(this.validatePerson()){
      if(this.action == PageAction.EditAction){
        this.editPerson();
      } 
      
      if(this.action == PageAction.AddAction){
        this.addPerson();
      } 
    }
  }

  addPerson(): void {
    this.addPersonSubscription = this.personService.AddPerson(this.selectedPerson)
      .subscribe({
        next: (value) =>{
          console.log(value)
        },
        error: (e) => console.error(e),
        complete: () => {this.routeBack(PageAction.AddAction,'true');}
    });
  }

  editPerson(): void {
    this.editPersonSubscription = this.personService.EditPerson(this.selectedPerson, this.personId)
      .subscribe({
        next: (value) =>{
          console.log(value)
        },
        error: (e) => console.error(e),
        complete: () => {this.routeBack(PageAction.EditAction,'true');}
    });
  }

  deletePerson(): void {
    this.deletePersonSubscription = this.personService.DeletePerson(this.personId)
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

  validatePerson(): boolean {
    debugger
    this.pageError = '';
    if(this.selectedPerson.category === '')
    {
      this.pageError = this.pageError + 'category empty';
      return false;
    }
    if(this.selectedPerson.firstName === '')
      {
        this.pageError = this.pageError + 'firstName empty';
        return false;
      }
      if(this.selectedPerson.lastName === '')
        {
          this.pageError = this.pageError + 'lastName empty';
          return false;
        }
        if(!this.selectedPerson.rank)
          {
            this.pageError = this.pageError + 'rank empty';
            return false;
          }
      return true
  }
  
  cancel(): void {
    this.routeBack(PageAction.CancelAction,'true')
  }

  routeBack(action: string, state: string): void {
    this.router.navigate(
      ['/person'],
      {
        queryParams: {
          action: action,
          state: state,
          id: this.personId
        }
      }
    )
  }

  ngOnInit() {
    this.personId = this.route.snapshot.params['id'];

    if(this.personId){
      this.getPersonByPersonId(this.personId);
      this.action = PageAction.EditAction;
    } else{
      this.action = PageAction.AddAction;
      this.selectedPerson = {
        id: null,
        personId: 0,
        firstName: '',
        lastName: '',
        rank: 0,
        category: '',
        dateOfBirth: new Date(1981,3,11),
        isPlayCricket: false,
        dateCreated: new Date(2024,11,11)
      };
    }   
  }

  ngOnDestroy() {
    this.getPersonByPersonIdSubscription?.unsubscribe();
    this.deletePersonSubscription?.unsubscribe();
    this.editPersonSubscription?.unsubscribe();
    this.addPersonSubscription?.unsubscribe();
  }
}
