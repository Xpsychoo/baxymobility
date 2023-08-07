import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockupdatestatusComponent } from './stockupdatestatus.component';

describe('StockupdatestatusComponent', () => {
  let component: StockupdatestatusComponent;
  let fixture: ComponentFixture<StockupdatestatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockupdatestatusComponent]
    });
    fixture = TestBed.createComponent(StockupdatestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
