import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadercardComponent } from './loadercard.component';

describe('LoadercardComponent', () => {
  let component: LoadercardComponent;
  let fixture: ComponentFixture<LoadercardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadercardComponent]
    });
    fixture = TestBed.createComponent(LoadercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
