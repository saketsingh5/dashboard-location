import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '@app/shared/shared.module';
import { ListdataComponent } from './components/listdata/listdata.component';
import { SortbyComponent } from './components/listdata/sortby/sortby.component';


@NgModule({
  declarations: [
    MainComponent,
    ListdataComponent,
    SortbyComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
