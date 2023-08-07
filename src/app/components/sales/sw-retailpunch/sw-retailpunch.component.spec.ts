import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwRetailpunchComponent } from './sw-retailpunch.component';

describe('SwRetailpunchComponent', () => {
  let component: SwRetailpunchComponent;
  let fixture: ComponentFixture<SwRetailpunchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwRetailpunchComponent]
    });
    fixture = TestBed.createComponent(SwRetailpunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
