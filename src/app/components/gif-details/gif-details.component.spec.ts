import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifDetailsComponent } from './gif-details.component';

describe('GifDetailsComponent', () => {
  let component: GifDetailsComponent;
  let fixture: ComponentFixture<GifDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GifDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
