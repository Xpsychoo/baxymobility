import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserscreenComponent } from './newuserscreen.component';

describe('NewuserscreenComponent', () => {
  let component: NewuserscreenComponent;
  let fixture: ComponentFixture<NewuserscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewuserscreenComponent]
    });
    fixture = TestBed.createComponent(NewuserscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
