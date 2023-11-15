import { TestBed } from '@angular/core/testing';

import { GalleryNameService } from './gallery-name.service';

describe('GalleryNameService', () => {
  let service: GalleryNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
