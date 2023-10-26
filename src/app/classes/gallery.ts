// classes, interfaces
import {GalleryImage} from "./gallery-image";

export class ImageGallery
{
  private Name: symbol;
  private Collection: Map<string, GalleryImage> = new Map();
  public constructor(name: symbol, size: number)
  {
    this.Name = name;
  }

  public SetCollection(size: number)
  {
    let collection: Map<string, GalleryImage> = new Map();
    for(let i = 0; i < size; i++)
    {
      collection.set(`placeholderImg${i}`, new GalleryImage(
        "src/assets/images/gallery/placeholder/gian-paolo-aliatis-Blo_g1hnp3A-unsplash.jpg",
        "Gallery image placeholder.",
        1920,
        1080
      ));
    }
    return collection;
  }

}
