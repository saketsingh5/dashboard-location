import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
