import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriesComponent } from './galleries.component';

describe('GalleryComponent', () => {
  let component: GalleriesComponent;
  let fixture: ComponentFixture<GalleriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleriesComponent]
    });
    fixture = TestBed.createComponent(GalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
