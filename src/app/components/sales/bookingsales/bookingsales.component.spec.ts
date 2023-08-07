import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsalesComponent } from './bookingsales.component';

describe('BookingsalesComponent', () => {
  let component: BookingsalesComponent;
  let fixture: ComponentFixture<BookingsalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsalesComponent]
    });
    fixture = TestBed.createComponent(BookingsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
