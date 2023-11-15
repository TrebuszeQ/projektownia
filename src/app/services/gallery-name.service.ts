import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// rxjs
import { RequestHandlerService } from "./request-handler.service";

@Injectable({
  providedIn: 'root'
})
export class GalleryNameService extends RequestHandlerService {

  private readonly Source: string;

  constructor(http: HttpClient) {
    super(http);
    //not implemented
    this.Source = "";
  }

  public async getGalleryNames() {
     return (await this.getSubscription(this.Source)).subscribe(value => value.body);
  }
}
