import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockintrasnitComponent } from './stockintrasnit.component';

describe('StockintrasnitComponent', () => {
  let component: StockintrasnitComponent;
  let fixture: ComponentFixture<StockintrasnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockintrasnitComponent]
    });
    fixture = TestBed.createComponent(StockintrasnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
