import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { UiComponent } from './ui/ui.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "glowna", component: HomeComponent, title: "Strona główna" },
  { path: "ui", component: UiComponent, title: "ui", data: {lang: "pl"} },
  { path: "wrapper", component: AppComponent, title: "Wrapper" },
  { path: "slider", component: SliderComponent, title: "Slider" },
  { path: "author", component: AboutComponent, title: "Author", data: {lang: "en"} },
  { path: "autor", component: AboutComponent, title: "Autor", data: {lang: "pl" } },
  { path: "about", component: AboutComponent, title:"About", data: {lang: "en"} },
  { path: "omnie", component: AboutComponent, title:"O mnie", data: {lang: "pl"} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
