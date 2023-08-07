import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingreportComponent } from './bookingreport.component';

describe('BookingreportComponent', () => {
  let component: BookingreportComponent;
  let fixture: ComponentFixture<BookingreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingreportComponent]
    });
    fixture = TestBed.createComponent(BookingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
