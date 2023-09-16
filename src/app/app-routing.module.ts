import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { UiComponent } from './ui/ui.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "ui", component: UiComponent },
  { path: "wrapper", component: AppComponent },
  { path: "home", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
