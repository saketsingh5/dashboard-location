import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "./components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [...fromComponents.sharedComponents, HeaderComponent, FooterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    ...fromComponents.sharedComponents,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
