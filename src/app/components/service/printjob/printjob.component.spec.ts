import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintjobComponent } from './printjob.component';

describe('PrintjobComponent', () => {
  let component: PrintjobComponent;
  let fixture: ComponentFixture<PrintjobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintjobComponent]
    });
    fixture = TestBed.createComponent(PrintjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
