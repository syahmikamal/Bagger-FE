import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListPostComponent } from './view-list-post.component';

describe('ViewListPostComponent', () => {
  let component: ViewListPostComponent;
  let fixture: ComponentFixture<ViewListPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewListPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
