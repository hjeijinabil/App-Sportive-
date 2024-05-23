import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMatchComponent } from './search-match.component';

describe('SearchMatchComponent', () => {
  let component: SearchMatchComponent;
  let fixture: ComponentFixture<SearchMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchMatchComponent]
    });
    fixture = TestBed.createComponent(SearchMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
