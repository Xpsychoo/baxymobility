import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewjobComponent } from './createnewjob.component';

describe('CreatenewjobComponent', () => {
  let component: CreatenewjobComponent;
  let fixture: ComponentFixture<CreatenewjobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatenewjobComponent]
    });
    fixture = TestBed.createComponent(CreatenewjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
