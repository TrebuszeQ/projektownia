import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
// misc
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// components
import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
import { SliderComponent } from './slider/slider.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NgOptimizedImage } from "@angular/common";
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryMenuComponent } from './gallery-menu/gallery-menu.component';



@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    SliderComponent,
    HomeComponent,
    AboutComponent,
    GalleryComponent,
    GalleryMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgOptimizedImage,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
