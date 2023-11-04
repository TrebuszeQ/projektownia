import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// FA
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// components
import { UiComponent } from './ui/ui.component';
import { SliderComponent } from './slider/slider.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NgOptimizedImage } from "@angular/common";
import { GalleriesComponent } from './galleries/galleries.component';
import { GalleryImageComponent } from './gallery-image/gallery-image.component'
import { GalleryComponent } from './gallery/gallery.component';
// template
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { Home2Component } from './home2/home2.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    Home2Component,
    CounterComponent,
    FetchDataComponent,
    UiComponent,
    SliderComponent,
    HomeComponent,
    AboutComponent,
    GalleriesComponent,
    GalleryImageComponent,
    GalleryComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgOptimizedImage,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: "home2", component: Home2Component },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: "home", component: HomeComponent, title: "Home", data: { lang: "en" } },
      { path: "strona_glowna", component: HomeComponent, title: "Strona główna", data: { lang: "pl" } },
      { path: "ui", component: UiComponent, title: "ui", data: { lang: "pl" } },
      { path: "wrapper", component: AppComponent, title: "Wrapper", data: { lang: "pl" } },
      { path: "slider", component: SliderComponent, title: "Slider", data: { lang: "pl" } },
      { path: "author", component: AboutComponent, title: "Author", data: { lang: "en" } },
      { path: "autor", component: AboutComponent, title: "Autor", data: { lang: "pl" } },
      { path: "about", component: AboutComponent, title: "About", data: { lang: "en" } },
      { path: "o_mnie", component: AboutComponent, title: "O mnie", data: { lang: "pl" } },
      { path: "galeria", component: GalleriesComponent, title: "Galeria", data: { lang: "pl" } },
      { path: "gallery", component: GalleriesComponent, title: "Gallery", data: { lang: "en" } }
    ]),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
