import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOneVideoComponent } from './search-one-video.component';

describe('SearchOneVideoComponent', () => {
  let component: SearchOneVideoComponent;
  let fixture: ComponentFixture<SearchOneVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOneVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOneVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
