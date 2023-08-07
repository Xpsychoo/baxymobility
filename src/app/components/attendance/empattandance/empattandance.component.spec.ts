import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpattandanceComponent } from './empattandance.component';

describe('EmpattandanceComponent', () => {
  let component: EmpattandanceComponent;
  let fixture: ComponentFixture<EmpattandanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpattandanceComponent]
    });
    fixture = TestBed.createComponent(EmpattandanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
