import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHotelsUserComponent } from './list-hotels-user.component';

describe('ListHotelsUserComponent', () => {
  let component: ListHotelsUserComponent;
  let fixture: ComponentFixture<ListHotelsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHotelsUserComponent]
    });
    fixture = TestBed.createComponent(ListHotelsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
