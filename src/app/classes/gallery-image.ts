export class GalleryImage
{
  private Src: string;
  private Alt: string;
  private WidthStr: string;
  private HeightStr: string;
  private Description?: string | null;
  private Tags?: string[] | null;
  public constructor(src: string, alt: string, width: number, height: number, description?: string | null, tags?: string[] | null)
  {
    this.Src = src;
    this.Alt = alt;
    this.WidthStr = `${width}px`;
    this.HeightStr = `${height}px`;
    if(description != null) this.Description = description;
    if(tags != null) this.Tags = tags;
  }

  public alterSrc(newSrc: string)
  {
    this.Src = newSrc;
    return this.Src;
  }

  public alterDescription(newDes: string)
  {
    this.Description = newDes;
    return this.Description;
  }

  public getDescription()
  {
    return this.Description;
  }

  public getTags()
  {
    return this.Tags;
  }

  public removeTag(rmTag: string)
  {
    if(this.Tags != null)
    {
      let temp = this.Tags;
      let counter = 0;
      for (let tag of temp)
      {
        counter++;
        if(temp) // here
      }
    }
  }
}
