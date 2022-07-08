import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMultipleVideoComponent } from './search-multiple-video.component';

describe('SearchMultipleVideoComponent', () => {
  let component: SearchMultipleVideoComponent;
  let fixture: ComponentFixture<SearchMultipleVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMultipleVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMultipleVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
