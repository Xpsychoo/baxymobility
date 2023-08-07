import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbookingcodeComponent } from './searchbookingcode.component';

describe('SearchbookingcodeComponent', () => {
  let component: SearchbookingcodeComponent;
  let fixture: ComponentFixture<SearchbookingcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchbookingcodeComponent]
    });
    fixture = TestBed.createComponent(SearchbookingcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
