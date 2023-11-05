import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { GalleriesComponent } from './galleries/galleries.component';
import { GalleryComponent } from './gallery/gallery.component';



@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    SliderComponent,
    HomeComponent,
    AboutComponent,
    GalleriesComponent,
    GalleryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
