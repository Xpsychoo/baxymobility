import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockreceivingreportComponent } from './stockreceivingreport.component';

describe('StockreceivingreportComponent', () => {
  let component: StockreceivingreportComponent;
  let fixture: ComponentFixture<StockreceivingreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockreceivingreportComponent]
    });
    fixture = TestBed.createComponent(StockreceivingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
