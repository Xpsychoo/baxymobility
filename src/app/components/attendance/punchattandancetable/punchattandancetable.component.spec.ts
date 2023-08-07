import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchattandancetableComponent } from './punchattandancetable.component';

describe('PunchattandancetableComponent', () => {
  let component: PunchattandancetableComponent;
  let fixture: ComponentFixture<PunchattandancetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PunchattandancetableComponent]
    });
    fixture = TestBed.createComponent(PunchattandancetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
