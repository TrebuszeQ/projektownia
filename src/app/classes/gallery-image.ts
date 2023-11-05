export class GalleryImage {
  
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
    
    public getElement() {
      let element: HTMLImageElement = new HTMLImageElement();
      element.id = this.Id;
      element.title = this.Title;
      element.src = this.Src;
      element.alt = this.Alt;
    
      return element;
    }
  }