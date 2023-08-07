import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadformtwotwoComponent } from './uploadformtwotwo.component';

describe('UploadformtwotwoComponent', () => {
  let component: UploadformtwotwoComponent;
  let fixture: ComponentFixture<UploadformtwotwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadformtwotwoComponent]
    });
    fixture = TestBed.createComponent(UploadformtwotwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
