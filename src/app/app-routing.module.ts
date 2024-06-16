import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/splash",
    pathMatch: "full",
  },
  {
    path: "index.html",
    redirectTo: "/splash",
    pathMatch: "full",
  },
  {
    path: "splash",
    component: SplashComponent,
  },

  {
    path: "main",
    loadChildren: () =>
      import("./components/main/main.module").then((m) => m.MainModule),

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
