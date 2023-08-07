import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockreceivingComponent } from './stockreceiving.component';

describe('StockreceivingComponent', () => {
  let component: StockreceivingComponent;
  let fixture: ComponentFixture<StockreceivingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockreceivingComponent]
    });
    fixture = TestBed.createComponent(StockreceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
