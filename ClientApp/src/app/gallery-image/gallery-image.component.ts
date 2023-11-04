import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery-image',
  templateUrl: 'gallery-image.component.html',
  styleUrls: ['./gallery-image.component.css']
})

export class GalleryImageComponent
{
  readonly Src: string;
  readonly Alt: string;
  Description?: string | null;
  Tags?: string[] | null;
  readonly Id: string;
  readonly Title: string;
  public constructor(id: string, title: string, src: string, alt: string, description?: string | null, tags?: string[] | null)
  {
    this.Id = id;
    this.Title = title;
    this.Src = src;
    this.Alt = alt;
    if(description != null) this.Description = description;
    if(tags != null) this.Tags = tags;

  }
  public alterDescription(newDes: string)
  {
    this.Description = newDes;
    return this.Description;
  }

  public getDescription()
  {
    return this.Description != null ? this.Description : "";
  }

  public getTags()
  {
    return this.Tags != null ? this.Tags : [];
  }

  public removeTag(rmTag: string)
  {
    try
    {
      let index = Object.keys(this.Tags!).findIndex(key => key == rmTag);
      this.Tags = this.Tags!.slice(0, index).concat(this.Tags!.slice(index));
    }
    catch (e)
    {
      return false;
    }
    return true;
  }
  private getValueMap() {
    let map: WeakMap<String,String> = new WeakMap();
    map.set("id", this.Id);
    map.set("title", this.Title);
    map.set("src", this.Src);
    map.set("alt", this.Alt);
    map.set("loading", "eager");

    return map;
  }
  public getElement(id: string, title: string, cssClass: string) {
    let element: HTMLImageElement = new HTMLImageElement();
    let map = this.getValueMap();
    let c = 0;
    for(let indice in map) {
      element.setAttribute(indice.toString(), Object.values(map)[c]);
      c++;
    }
    return
  }
}
