import { Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list';
import { PersonDetailComponent } from './components/person-detail/person-detail';
import { PersonCreateComponent } from './components/person-create/person-create';
import { DutyCreateComponent } from './components/duty-create/duty-create';

export const routes: Routes = [
  { path: '', component: PersonListComponent },
  { path: 'person/create', component: PersonCreateComponent },
  { path: 'person/:name', component: PersonDetailComponent },
  { path: 'duty/create/:name', component: DutyCreateComponent },
];
