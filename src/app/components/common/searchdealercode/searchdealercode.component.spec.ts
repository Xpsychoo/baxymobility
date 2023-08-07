import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdealercodeComponent } from './searchdealercode.component';

describe('SearchdealercodeComponent', () => {
  let component: SearchdealercodeComponent;
  let fixture: ComponentFixture<SearchdealercodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchdealercodeComponent]
    });
    fixture = TestBed.createComponent(SearchdealercodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
