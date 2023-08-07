import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachempcodeComponent } from './serachempcode.component';

describe('SerachempcodeComponent', () => {
  let component: SerachempcodeComponent;
  let fixture: ComponentFixture<SerachempcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SerachempcodeComponent]
    });
    fixture = TestBed.createComponent(SerachempcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
