import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpdailyvisitreporttableComponent } from './empdailyvisitreporttable.component';

describe('EmpdailyvisitreporttableComponent', () => {
  let component: EmpdailyvisitreporttableComponent;
  let fixture: ComponentFixture<EmpdailyvisitreporttableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpdailyvisitreporttableComponent]
    });
    fixture = TestBed.createComponent(EmpdailyvisitreporttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
