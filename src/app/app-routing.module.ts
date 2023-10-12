import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { UiComponent } from './ui/ui.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "ui", component: UiComponent },
  { path: "wrapper", component: AppComponent },
  { path: "slider", component: SliderComponent },
  { path: "author", component: AboutComponent },
  { path: "autor", component: AboutComponent },
  { path: "about", component: AboutComponent },
  { path: "omnie", component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
