import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHajjUserComponent } from './list-hajj-user.component';

describe('ListHajjUserComponent', () => {
  let component: ListHajjUserComponent;
  let fixture: ComponentFixture<ListHajjUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHajjUserComponent]
    });
    fixture = TestBed.createComponent(ListHajjUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
