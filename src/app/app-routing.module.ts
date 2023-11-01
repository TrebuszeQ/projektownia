import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { UiComponent } from './ui/ui.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import {AboutComponent} from "./about/about.component";
import {GalleriesComponent} from "./galleries/galleries.component";

const routes: Routes = [
  {path: "", redirectTo: "glowna", pathMatch: "full" },
  { path: "home", component: HomeComponent, title: "Home", data: {lang: "en"} },
  { path: "strona_glowna", component: HomeComponent, title: "Strona główna", data: {lang: "pl"} },
  { path: "ui", component: UiComponent, title: "ui", data: {lang: "pl"} },
  { path: "wrapper", component: AppComponent, title: "Wrapper", data: {lang: "pl"} },
  { path: "slider", component: SliderComponent, title: "Slider", data: {lang: "pl"} },
  { path: "author", component: AboutComponent, title: "Author", data: {lang: "en"} },
  { path: "autor", component: AboutComponent, title: "Autor", data: {lang: "pl" } },
  { path: "about", component: AboutComponent, title:"About", data: {lang: "en"} },
  { path: "o_mnie", component: AboutComponent, title:"O mnie", data: {lang: "pl"} },
  { path: "galeria", component: GalleriesComponent, title: "Galeria", data: {lang: "pl"} },
  { path: "gallery", component: GalleriesComponent, title: "Gallery", data: {lang: "en"} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
